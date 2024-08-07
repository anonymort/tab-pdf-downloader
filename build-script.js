const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const archiver = require('archiver');
const crypto = require('crypto');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('clean', {
    alias: 'c',
    description: 'Clean old builds',
    type: 'boolean',
    default: true
  })
  .option('keep', {
    alias: 'k',
    description: 'Number of old builds to keep',
    type: 'number',
    default: 5
  })
  .help()
  .alias('help', 'h')
  .argv;

const config = require('./build-config.json');
const baseManifest = require('./base-manifest.json');
const firefoxConfig = require('./firefox-config.json');

const version = baseManifest.version;
const timestamp = new Date().toISOString().replace(/[:T]/g, '-').split('.')[0];
const buildDir = path.join(__dirname, 'dist', `v${version}_${timestamp}`);

async function cleanupOldBuilds(maxBuildsToKeep) {
  const distDir = path.join(__dirname, 'dist');
  const builds = await fsp.readdir(distDir);
  const sortedBuilds = builds
    .filter(file => fsp.stat(path.join(distDir, file)).then(stat => stat.isDirectory()))
    .sort((a, b) => b.localeCompare(a));

  for (let i = maxBuildsToKeep; i < sortedBuilds.length; i++) {
    const oldBuild = sortedBuilds[i];
    await fsp.rm(path.join(distDir, oldBuild), { recursive: true, force: true });
    console.log(`Removed old build: ${oldBuild}`);
  }
}

async function compressBuild(inputDir, outputFile) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(inputDir, false);
    archive.finalize();
  });
}

async function generateSHA256(file) {
  const fileBuffer = await fsp.readFile(file);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

async function buildForBrowserGroup(browserGroup) {
  let manifestContent = { ...baseManifest };
  
  if (browserGroup.name === 'firefox') {
    manifestContent = { ...manifestContent, ...firefoxConfig };
  }
  
  const outputDir = path.join(buildDir, browserGroup.name);
  await fsp.mkdir(outputDir, { recursive: true });
  
  await fsp.writeFile(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifestContent, null, 2)
  );
  
  await fsp.cp(path.join(__dirname, 'src'), outputDir, { recursive: true });
  
  const zipFile = `${outputDir}.zip`;
  await compressBuild(outputDir, zipFile);
  
  const hash = await generateSHA256(zipFile);
  
  return { browserGroup, hash };
}

async function main() {
  let buildLog = `Build started at ${new Date().toISOString()}\n`;
  buildLog += `Version: ${version}\n`;

  try {
    await fsp.mkdir(buildDir, { recursive: true });

    const results = await Promise.all(config.browsers.map(buildForBrowserGroup));

    results.forEach(({ browserGroup, hash }) => {
      buildLog += `Generated extension for ${browserGroup.name} (SHA256: ${hash})\n`;
      buildLog += `Compatible browsers: ${browserGroup.compatibleBrowsers.join(', ')}\n\n`;
    });

    await fsp.writeFile(path.join(buildDir, 'build_log.txt'), buildLog);

    console.log(`Build complete for version ${version}!`);
    console.log(`Build directory: ${buildDir}`);

    if (argv.clean) {
      await cleanupOldBuilds(argv.keep);
    }

  } catch (error) {
    console.error('Build failed:', error);
    buildLog += `Build failed: ${error.message}\n`;
    await fsp.writeFile(path.join(__dirname, 'dist', 'error_log.txt'), buildLog);
  }
}

main();