# Daily Motivation Extension - Setup Guide

## Quick Start

### 1. Install Dependencies (Optional)
If you want to modify the JavaScript code, install dependencies:
```bash
npm install
```

### 2. Build the Extension (Optional)
If you made changes to the source code:
```bash
npm run build
```

### 3. Load Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select this project folder
6. The extension should now appear in your extensions list

### 4. Test the Extension

1. Open a new tab in Chrome
2. You should see the Daily Motivation extension with:
   - A motivational quote with metadata (book, author, collector, likes, date)
   - Interactive background (depending on theme)
   - Settings panel (gear icon)

### Available Themes
- **Clear Dark** (default) - Dark minimal design
- **Connected Dark** - Dark animated dots canvas
- **Matrix** - Matrix-style digital rain effect
- **Glitch** - Cyberpunk glitch effects with RGB separation
- **Snow** - Snowflakes falling with white colors on black background

### 5. Test Components Locally

1. Open `test.html` in your browser
2. Use the test buttons to verify:
   - Quote loading functionality
   - Theme system
   - LocalStorage operations

## Development Commands

```bash
# Install dependencies
npm install

# Build ES6 to browser-compatible JS
npm run build

# Watch for changes and auto-rebuild
npm run watch

# Minify for production
npm run minify

# Clean build directories
npm run clean

# Development build with instructions
npm run dev
```

## Project Structure

```
ISWKF/
├── src/
│   ├── js/          # ES6 source files
│   ├── css/         # Stylesheets
│   ├── data/        # quotes.json
│   └── imgs/        # Theme images
├── vendor/          # Built JavaScript files
├── test.html        # Local testing page
├── manifest.json    # Chrome extension config
├── index.html       # New tab page
└── background.js    # Service worker
```

## Troubleshooting

### Extension Not Loading
- Make sure Developer mode is enabled
- Check that all required files are present
- Verify manifest.json is valid

### Quotes Not Loading
- Check browser console for errors
- Verify quotes.json file is accessible
- Test with test.html page

### Theme Issues
- Clear browser cache
- Check localStorage in DevTools
- Verify theme files exist in vendor/js/

### Build Issues
- Run `npm run clean` then `npm run build`
- Check .babelrc configuration
- Verify all dependencies are installed

## Testing Checklist

- [ ] Extension loads without errors
- [ ] New tab shows motivational quote
- [ ] Theme switching works
- [ ] Settings panel opens/closes
- [ ] LocalStorage saves theme preference
- [ ] All 6 themes display correctly
- [ ] Interactive backgrounds work
- [ ] Quote changes on refresh

## Browser Compatibility

- Chrome 88+ (Manifest V3)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers 