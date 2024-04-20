const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Create a proxy for '/signup' requests
app.use('/signup', createProxyMiddleware({ target: 'http://streamstudio.vercel.app', changeOrigin: true }));

// Start the server
const PORT = 3000; // Choose any available port
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
