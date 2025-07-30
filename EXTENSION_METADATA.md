# Chrome Extension Metadata

## 📋 Extension Information

### Basic Info
- **Name**: Daily Motivation - Inspirational Quotes
- **Version**: 2.5.0
- **Manifest Version**: 3
- **Author**: DAO Lab
- **Homepage**: https://daolab.us

### Description
Transform your new tab into a source of daily inspiration with motivational quotes, beautiful themes, and metadata display. Features multiple interactive themes including Matrix and Glitch effects.

## 🎯 Features

### Core Functionality
- **Quote Display**: Shows inspirational quotes with rich metadata
- **Metadata Display**: Book, author, collector, likes, and collection date
- **Theme System**: 4 interactive themes with unique visual effects
- **Local Storage**: Saves theme preferences and settings

### Available Themes
1. **Clear Dark** (Default) - Minimal dark design
2. **Connected Dark** - Animated dots with connections
3. **Matrix** - Digital rain effect with Korean characters
4. **Glitch** - Cyberpunk glitch effects with RGB separation

## 🔧 Technical Specifications

### Permissions
- `storage` - For saving theme preferences and settings

### Content Security Policy
```json
{
  "extension_pages": "script-src 'self'; object-src 'self'"
}
```

### Web Accessible Resources
- `src/data/quotes.json` - Quote data with metadata

### Browser Compatibility
- **Minimum Chrome Version**: 88
- **Manifest V3**: Full compatibility
- **Offline Enabled**: Yes
- **Incognito Mode**: Split (separate instance)

## 📁 File Structure

```
ISWKF/
├── manifest.json              # Extension configuration
├── background.js              # Service worker
├── index.html                 # New tab page
├── src/
│   ├── js/                   # JavaScript modules
│   │   ├── app.js           # Main application logic
│   │   ├── clear.js         # Clear theme
│   │   ├── connectedCanvas.js # Connected theme
│   │   ├── matrixTheme.js   # Matrix theme
│   │   ├── glitchTheme.js   # Glitch theme
│   │   └── settingsBar.js   # Settings panel
│   ├── css/
│   │   └── style.css        # Stylesheets
│   ├── data/
│   │   └── quotes.json      # Quote data with metadata
│   └── imgs/                # Theme images and icons
│       ├── icon.svg         # Extension icon
│       ├── matrix.svg       # Matrix theme preview
│       └── glitch.svg       # Glitch theme preview
├── vendor/                  # Built JavaScript files
├── test.html               # Local testing page
└── dev-server.js           # Development server
```

## 🚀 Installation

### For Users
1. Download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder
5. Open a new tab to see the extension

### For Developers
```bash
# Install dependencies
npm install

# Build the extension
npm run build

# Start development server
npm run serve
```

## 📊 Data Structure

### Quote Format
```json
{
  "quote": "Inspirational quote text",
  "book": "Book title",
  "author": "Author name",
  "org": "Organization",
  "collector": "Collector name",
  "like": 5,
  "collectDate": "2025-07-30"
}
```

## 🎨 Theme Details

### Clear Dark
- **Type**: Minimal design
- **Colors**: White text on black background
- **Features**: Clean, distraction-free interface

### Connected Dark
- **Type**: Interactive animation
- **Colors**: White dots and lines on black background
- **Features**: Animated dots that connect on mouse hover

### Matrix
- **Type**: Digital rain effect
- **Colors**: Green characters on black background
- **Features**: Korean characters falling like Matrix digital rain

### Glitch
- **Type**: Cyberpunk effects
- **Colors**: RGB separation, neon colors
- **Features**: Random glitch effects, scanlines, noise

## 🔄 Version History

### v2.5.0 (Current)
- Added Matrix theme with Korean digital rain
- Added Glitch theme with cyberpunk effects
- Enhanced metadata display (book, author, collector, likes, date)
- Improved theme switching and cleanup
- Updated to Manifest V3
- Added DAO Lab branding

### v2.4.15 (Previous)
- Basic quote display
- Simple theme system
- Minimal metadata

## 📝 License

MIT License - See LICENSE file for details.

## 🤝 Contributing

This extension is maintained by DAO Lab. For issues and contributions, please visit our repository.

## 🌐 Links

- **Homepage**: https://daolab.us
- **Repository**: https://github.com/daolab/daily-motivation-extension
- **Issues**: https://github.com/daolab/daily-motivation-extension/issues 