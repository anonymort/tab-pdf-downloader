# Tab PDF Downloader
## Version 1.1

Tab PDF Downloader is a browser extension that allows you to download all open PDF tabs with a single click. It's designed to be lightweight, fast, and easy to use across multiple browsers.

[![Buy me a coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=mattkneale&button_colour=FFDD00&font_colour=000000&font_family=Bree&outline_colour=000000&coffee_colour=ffffff)](https://www.buymeacoffee.com/mattkneale)

## Features

- Download all open PDF tabs simultaneously
- Simple and intuitive user interface
- Lightweight and fast
- Compatible with multiple browsers (Chrome, Firefox, Edge, and more)
- Automatic file naming based on tab titles
- Improved error handling and user feedback

## Supported Browsers

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Vivaldi
- Opera
- Brave
- Kiwi (Android)
- Yandex Browser
- UC Browser
- Samsung Internet
- Tor Browser (based on Firefox)

## Installation

### For Users

1. Visit the extension store for your browser:
   - [Chrome Web Store Link]
   - [Firefox Add-ons Link]
   - [Microsoft Edge Add-ons Link]
2. Search for "Tab PDF Downloader"
3. Click "Add to [Browser Name]" to install

For other Chromium-based browsers, you can use the Chrome Web Store link.

### For Developers (Manual Installation)

1. Download the latest release for your browser from the [Releases](https://github.com/anonymort/tab-pdf-downloader/releases) page.
2. Unzip the downloaded file.
3. In your browser, go to the extensions page:
   - Chrome/Edge/Brave: `chrome://extensions`
   - Firefox: `about:addons`
   - Opera: `opera://extensions`
4. Enable "Developer mode" (usually a toggle in the top right).
5. Click "Load unpacked" (Chrome/Edge/Brave/Opera) or "Load Temporary Add-on" (Firefox).
6. Navigate to the unzipped folder and select it.

## Usage

1. Click on the Tab PDF Downloader icon in your browser toolbar.
2. In the popup, click the "Download All PDF Tabs" button.
3. Your browser will start downloading all open PDF tabs.
4. A status message will keep you informed about the progress and results of the download process.

## Development

### Prerequisites

- Node.js (v14 or later recommended)
- npm (usually comes with Node.js)

### Dependencies

This project relies on the following npm packages:
- `fs` and `fs.promises`: For file system operations
- `path`: For working with file and directory paths
- `archiver`: For creating ZIP archives of the builds
- `crypto`: For generating SHA256 hashes of the builds
- `yargs`: For parsing command-line arguments in the build script

To install these dependencies, run:
```
npm install
```

Note: `fs`, `path`, and `crypto` are built-in Node.js modules and don't need to be installed separately.

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/anonymort/tab-pdf-downloader.git
   cd tab-pdf-downloader
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Building the Extension

To build the extension for all supported browsers:

```
npm run build
```

or

```
node build-script.js [options]
```

#### Build Script Options
- `--clean` or `-c`: Clean old builds (default: true)
- `--keep` or `-k`: Number of old builds to keep (default: 5)
- `--help` or `-h`: Show help

The script will:
- Generate builds for different browser groups (as defined in `build-config.json`)
- Create a ZIP file for each build
- Generate SHA256 hashes for each ZIP file
- Create a build log
- Optionally clean up old builds

This will create a `dist` folder with browser-specific builds.

### Testing

1. Build the extension as described above.
2. Load the appropriate version into your browser of choice using the manual installation method described in the Installation section.

## Project Structure

- `src/`: Source files for the extension
- `dist/`: Build output directory
- `build-script.js`: Main build script
- `build-config.json`: Configuration for browser groups
- `base-manifest.json`: Base manifest file for the extension
- `firefox-config.json`: Firefox-specific configuration

## Changelog

### Version 1.1
- Improved error handling for cases where no PDF tabs are found
- Added user feedback on the number of PDFs being downloaded
- Implemented tracking of successful and failed downloads
- Added a final status message indicating download results
- Improved console error logging for failed downloads

### Version 1.0
- Initial release
- Basic functionality to download all open PDF tabs
- Support for multiple browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have any suggestions, please [open an issue](https://github.com/anonymort/tab-pdf-downloader/issues) on GitHub.

## Author

Created by [Matt Kneale](https://www.twitter.com/drmattuk)

