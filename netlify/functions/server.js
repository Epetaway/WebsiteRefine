import serverless from 'serverless-http';
import express from 'express';
import { registerRoutes } from '../../server/routes.js';

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

// Register API routes
await registerRoutes(app);

// Export the serverless handler
export const handler = serverless(app);