const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Proxy setup for Discord
app.use('/proxy/discord', createProxyMiddleware({
  target: 'https://discord.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/discord': '', // Remove '/proxy/discord' prefix when forwarding
  },
}));

// Proxy setup for YouTube
app.use('/proxy/youtube', createProxyMiddleware({
  target: 'https://youtube.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/youtube': '', // Remove '/proxy/youtube' prefix when forwarding
  },
}));

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
