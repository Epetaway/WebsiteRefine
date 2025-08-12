const serverless = require('serverless-http');
const express = require('express');
const path = require('path');

// Import your existing Express app
const { registerRoutes } = require('../../dist/index.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup routes
registerRoutes(app);

// Serve static files
app.use(express.static(path.join(__dirname, '../../dist/public')));

// Catch all handler for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/public/index.html'));
});

module.exports.handler = serverless(app);