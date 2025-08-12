import serverless from 'serverless-http';
import express from 'express';
import { registerRoutes } from '../../server/routes.js';

// Create app and handler asynchronously
const createHandler = async () => {
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

  return serverless(app);
};

let handler;

// Export the handler as a function that initializes once
export const handler = async (event, context) => {
  if (!handler) {
    handler = await createHandler();
  }
  return handler(event, context);
};