#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html for root
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <head><title>404 - File Not Found</title></head>
            <body>
              <h1>404 - File Not Found</h1>
              <p>The file ${pathname} was not found.</p>
              <p>Available files:</p>
              <ul>
                <li><a href="/index.html">index.html</a> - Main extension page</li>
                <li><a href="/test.html">test.html</a> - Test page</li>
                <li><a href="/src/data/quotes.json">quotes.json</a> - Quotes data</li>
              </ul>
            </body>
          </html>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>500 - Internal Server Error</h1><p>${err.message}</p>`);
      }
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Development server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`🔗 Available pages:`);
  console.log(`   - http://localhost:${PORT}/index.html (Main extension page)`);
  console.log(`   - http://localhost:${PORT}/test.html (Test page)`);
  console.log(`\n💡 To test the Chrome extension:`);
  console.log(`   1. Go to chrome://extensions/`);
  console.log(`   2. Enable Developer mode`);
  console.log(`   3. Click "Load unpacked" and select this folder`);
  console.log(`   4. Open a new tab to see the extension`);
  console.log(`\n⏹️  Press Ctrl+C to stop the server`);
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development server...');
  process.exit(0);
}); 