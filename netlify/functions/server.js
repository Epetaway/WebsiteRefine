const serverless = require('serverless-http');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic API routes for portfolio
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Earl Hickson Jr Portfolio'
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Log contact form submission
  console.log('Contact form submission:', { name, email, message });
  
  // In production, you would integrate with SendGrid here
  res.json({ 
    success: true,
    message: 'Thank you for your message! I will get back to you soon.' 
  });
});

app.post('/api/bjj-booking', (req, res) => {
  const { name, email, experience, goals, preferredTime } = req.body;
  
  // Log BJJ booking submission
  console.log('BJJ booking submission:', { name, email, experience, goals, preferredTime });
  
  res.json({ 
    success: true,
    message: 'Your BJJ lesson booking request has been received! I will contact you within 24 hours to confirm your session.' 
  });
});

// Get YouTube videos endpoint (placeholder)
app.get('/api/youtube-videos', (req, res) => {
  res.json({
    videos: [],
    message: 'YouTube integration available with API key'
  });
});

// Get Instagram posts endpoint (placeholder)  
app.get('/api/instagram-posts', (req, res) => {
  res.json({
    posts: [],
    message: 'Instagram integration available with access token'
  });
});

// Health check for all APIs
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    apis: {
      contact: 'available',
      bjj_booking: 'available',
      youtube: 'requires_api_key',
      instagram: 'requires_access_token'
    },
    timestamp: new Date().toISOString()
  });
});

// Export the serverless function
module.exports.handler = serverless(app);