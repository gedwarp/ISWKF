# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

sentence-stash-background is a Chrome extension (Manifest V3) that displays motivational quotes on new tab pages. The extension features multiple interactive themes with animated backgrounds and a settings panel for theme selection.

## Development Commands

- `npm i` - Install dependencies
- `npm run build` - Transpile ES6 JavaScript to browser-compatible JS using Babel
- `npm run minify` - Minify source files to lib directory

## Architecture

### Core Structure
- **manifest.json** - Chrome extension configuration (Manifest V3)
- **index.html** - New tab page template
- **background.js** - Service worker for extension lifecycle events
- **src/js/app.js** - Main application logic handling quotes, themes, and UI interactions

### Key Components
- **Quote System**: Loads quotes from `src/data/quotes.json` via XMLHttpRequest and displays random quotes
- **Theme System**: Six themes stored in localStorage with different visual styles:
  - `connected` (default) - Animated dots canvas
  - `connectedBlue` - Blue animated dots 
  - `connectedDark` - Dark animated dots
  - `connectedDarkBlue` - Dark blue/green theme
  - `clear` - Clean minimal design
  - `clearDark` - Dark minimal design
- **Settings Panel**: Slide-out navigation for theme selection
- **Canvas Animations**: Interactive dot animations via `connectedCanvas.js`

### File Organization
- `src/js/` - JavaScript modules (ES6, transpiled via Babel)
- `src/css/` - Stylesheets
- `src/data/` - Static data (quotes.json)
- `src/imgs/` - Theme-specific icons and images
- `vendor/` - Build output directory

### Key Functions
- `newQuote()` - Fetches and displays random quote
- `setTheme(theme)` - Applies theme and saves to localStorage  
- `applyTheme()` - Loads saved theme on startup
- Theme-specific canvas functions in separate modules

The extension uses localStorage for theme persistence and tooltip state management.