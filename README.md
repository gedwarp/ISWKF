<p align="center"><img src="https://raw.githubusercontent.com/daolab/daily-motivation-extension/master/.github/logo.png" alt="logo" height="150px"></p>
<h1 align="center">Daily Motivation Extension</h1>

## 🚀 Transform Your New Tab Experience

A Chrome extension that displays inspirational quotes with rich metadata (book, author, collector, likes, date) every time you open a new tab. Features multiple interactive themes including Matrix and Glitch effects for a unique browsing experience.

## Development

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn
- Google Chrome browser

### Setup
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to transpile ES6 JavaScript to browser-compatible JS
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select this project folder

### Available Commands
- `npm install` - Install dependencies
- `npm run build` - Transpile ES6 JavaScript to vendor directory
- `npm run watch` - Watch for changes and auto-rebuild
- `npm run minify` - Minify source files to lib directory
- `npm run clean` - Clean build directories
- `npm run dev` - Build and show development instructions

### Testing
- Open `test.html` in your browser to test individual components
- Use the test buttons to verify quote loading, theme system, and localStorage functionality
- Check the browser console for any errors during development

### Project Structure
- `src/js/` - ES6 JavaScript modules (transpiled to vendor/)
- `src/css/` - Stylesheets
- `src/data/` - Static data (quotes.json)
- `src/imgs/` - Theme-specific icons and images
- `vendor/` - Build output directory
- `test.html` - Local testing page

### Reference
- https://sentence-stash-julywinds.replit.app/
- https://github.com/AtaGowani/daily-motivation/
- https://github.com/jvisualschool/404_matrix/
- https://github.com/metaory/glitcher-app