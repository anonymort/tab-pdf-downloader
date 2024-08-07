# Tab PDF Downloader

## Version 1.0

Tab PDF Downloader is a browser extension that allows you to download all open PDF tabs with a single click. It's designed to be lightweight, fast, and easy to use.

[![Buy me a coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=mattkneale&button_colour=FFDD00&font_colour=000000&font_family=Bree&outline_colour=000000&coffee_colour=ffffff)](https://www.buymeacoffee.com/mattkneale)

## Features

- Download all open PDF tabs simultaneously
- Simple and intuitive user interface
- Lightweight and fast
- Compatible with multiple browsers (Chrome, Firefox, and more)
- Automatic file naming based on tab titles

## Dependencies

This project relies on the following npm packages:

- `fs` and `fs.promises`: For file system operations
- `path`: For working with file and directory paths
- `archiver`: For creating ZIP archives of the builds
- `crypto`: For generating SHA256 hashes of the builds
- `yargs`: For parsing command-line arguments in the build script

To install these dependencies, run:

```
npm install archiver yargs
```

Note: `fs`, `path`, and `crypto` are built-in Node.js modules and don't need to be installed separately.

## Installation

### For Users

1. Visit the extension store for your browser (Chrome Web Store, Firefox Add-ons, etc.)
2. Search for "Tab PDF Downloader"
3. Click "Add to [Browser Name]" to install

### For Developers

1. Clone this repository:
   ```
   git clone https://github.com/anonymort/tab-pdf-downloader.git
   ```
2. Navigate to the project directory:
   ```
   cd tab-pdf-downloader
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Build the extension:
   ```
   node build-script.js
   ```
5. Load the extension in your browser:
   - Open your browser's extension management page
   - Enable "Developer mode"
   - Click "Load unpacked" and select the appropriate build directory in `dist/`

## Usage

1. Click on the Tab PDF Downloader icon in your browser toolbar
2. Press the "Download All PDF Tabs" button
3. All open PDF tabs will be downloaded to your default download location

## Building the Extension

The project includes a build script (`build-script.js`) that generates builds for different browser groups. To use it:

1. Ensure you have Node.js installed
2. Run `npm install` to install dependencies
3. Execute the build script:
   ```
   node build-script.js [options]
   ```

### Build Script Options

- `--clean` or `-c`: Clean old builds (default: true)
- `--keep` or `-k`: Number of old builds to keep (default: 5)
- `--help` or `-h`: Show help

The script will:
- Generate builds for different browser groups (as defined in `build-config.json`)
- Create a ZIP file for each build
- Generate SHA256 hashes for each ZIP file
- Create a build log
- Optionally clean up old builds

## Project Structure

- `src/`: Source files for the extension
- `dist/`: Build output directory
- `build-script.js`: Main build script
- `build-config.json`: Configuration for browser groups
- `base-manifest.json`: Base manifest file for the extension
- `firefox-config.json`: Firefox-specific configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [Matt Kneale](https://www.twitter.com/drmattuk)

