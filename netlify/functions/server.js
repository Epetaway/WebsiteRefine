import serverless from 'serverless-http';
import express from 'express';
import sgMail from '@sendgrid/mail';

// Simple serverless handler without ES modules
const app = express();

// Add CORS middleware for Netlify
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simplified API routes for Netlify
app.get('/api/social-media', async (req, res) => {
  try {
    // Return YouTube videos data
    const videos = [
      {
        id: 1,
        platform: "youtube",
        postId: "zTlsylhQJWI",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=zTlsylhQJWI",
        thumbnailUrl: "https://i.ytimg.com/vi/zTlsylhQJWI/hqdefault.jpg",
        caption: "Earl Hickson Jr. | 1st Match No-Gi Absolute Champion – NAGA Battlegrounds NJ (FDU)",
        permalink: "https://www.youtube.com/watch?v=zTlsylhQJWI",
        timestamp: "2025-03-23T23:15:10.000Z"
      },
      {
        id: 2,
        platform: "youtube",
        postId: "cfUZfoYS3Hg",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=cfUZfoYS3Hg",
        thumbnailUrl: "https://i.ytimg.com/vi/cfUZfoYS3Hg/hqdefault.jpg",
        caption: "Ultra Heavy 2017 Boston ibjjf - Finals that I lost but still happy with my performance",
        permalink: "https://www.youtube.com/watch?v=cfUZfoYS3Hg",
        timestamp: "2017-07-29T22:33:14.000Z"
      },
      {
        id: 3,
        platform: "youtube",
        postId: "zgkMiNKqJT8",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=zgkMiNKqJT8",
        thumbnailUrl: "https://i.ytimg.com/vi/zgkMiNKqJT8/hqdefault.jpg",
        caption: "2017 Ultra Heavy ibjjf Boston - My first ever professional Brazilian Jiu-jitsu tournament",
        permalink: "https://www.youtube.com/watch?v=zgkMiNKqJT8",
        timestamp: "2017-07-29T22:17:42.000Z"
      },
      {
        id: 4,
        platform: "youtube",
        postId: "-zC8orHp8i4",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=-zC8orHp8i4",
        thumbnailUrl: "https://i.ytimg.com/vi/-zC8orHp8i4/hqdefault.jpg",
        caption: "Naga Morristown Match 2 Super Heavy weight 2017",
        permalink: "https://www.youtube.com/watch?v=-zC8orHp8i4",
        timestamp: "2017-04-22T23:59:39.000Z"
      },
      {
        id: 5,
        platform: "youtube",
        postId: "O2JsqPuQEVc",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=O2JsqPuQEVc",
        thumbnailUrl: "https://i.ytimg.com/vi/O2JsqPuQEVc/hqdefault.jpg",
        caption: "Naga Morristown 2017 Match 3 Super Heavy",
        permalink: "https://www.youtube.com/watch?v=O2JsqPuQEVc",
        timestamp: "2017-04-22T23:59:39.000Z"
      },
      {
        id: 6,
        platform: "youtube",
        postId: "vq7pT31JDpE",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=vq7pT31JDpE",
        thumbnailUrl: "https://i.ytimg.com/vi/vq7pT31JDpE/hqdefault.jpg",
        caption: "Naga Morristown Match 1",
        permalink: "https://www.youtube.com/watch?v=vq7pT31JDpE",
        timestamp: "2017-04-22T23:12:14.000Z"
      },
      {
        id: 7,
        platform: "youtube",
        postId: "HL0Dh2K-g5g",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=HL0Dh2K-g5g",
        thumbnailUrl: "https://i.ytimg.com/vi/HL0Dh2K-g5g/hqdefault.jpg",
        caption: "Earl Hickson Jr Naga Morristown NoGI Match 1 - First match of the day",
        permalink: "https://www.youtube.com/watch?v=HL0Dh2K-g5g",
        timestamp: "2017-04-22T23:07:09.000Z"
      }
    ];

    const platform = req.query.platform;
    const filteredVideos = platform ? videos.filter(v => v.platform === platform) : videos;
    
    res.json({ posts: filteredVideos });
  } catch (error) {
    console.error('Error fetching social media posts:', error);
    res.status(500).json({ message: 'Failed to fetch social media posts' });
  }
});

const contactAttempts = new Map();
const contactWindowMs = 10 * 60 * 1000;
const contactWindowLimit = 5;

function contactRequestAllowed(ip) {
  const now = Date.now();
  const current = contactAttempts.get(ip);
  if (!current || current.resetAt <= now) {
    contactAttempts.set(ip, { count: 1, resetAt: now + contactWindowMs });
    return true;
  }
  if (current.count >= contactWindowLimit) return false;
  current.count += 1;
  return true;
}

// Contact form endpoint. Delivery is only reported as successful after the
// configured notification path accepts the message.
app.post('/api/contact', async (req, res) => {
  const { name, email, message, website } = req.body || {};
  if (typeof website === 'string' && website.trim()) {
    return res.json({ message: 'Contact form submitted successfully' });
  }
  if (!contactRequestAllowed(req.ip || 'unknown')) {
    return res.status(429).json({ message: 'Too many messages. Please wait a few minutes or email directly.' });
  }
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || typeof message !== 'string' || message.trim().length < 20) {
    return res.status(400).json({ message: 'Please provide a valid name, email address, and message.' });
  }
  if (!process.env.SENDGRID_API_KEY) {
    return res.status(503).json({ message: 'Message delivery is temporarily unavailable. Please email e@ehicksonjr.com directly.' });
  }
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: 'e@ehicksonjr.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'e@ehicksonjr.com',
      replyTo: email.trim(),
      subject: `Portfolio contact from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    });
    return res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact delivery failed:', error);
    return res.status(503).json({ message: 'Message delivery is temporarily unavailable. Please email e@ehicksonjr.com directly.' });
  }
});

// BJJ booking endpoint
app.post('/api/bjj-booking', (req, res) => {
  res.json({ message: 'BJJ booking received successfully' });
});

// Preserve the former resume URL while enforcing one canonical public file.
app.get('/assets/*', (req, res) => {
  const filePath = req.params[0];
  if (filePath === 'Earl_Hickson_-_Front-End__UX_Engineer.pdf' || filePath === 'Earl_Hickson_Jr_Resume.docx') {
    res.redirect(301, '/assets/Earl-Hickson-Jr-Resume.pdf');
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

// Export the Netlify function using the repository's native ESM format.
export const handler = serverless(app);
