import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic CORS handling
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

// API routes
app.use('/api', apiRoutes);

// Serve uploaded assets
app.use('/assets', express.static(join(__dirname, '../attached_assets')));

// Temporary development homepage
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Earl Hickson Jr. - Senior Front-End Engineer</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px; background: #f8fafc; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .status { background: #10b981; color: white; padding: 8px 16px; border-radius: 6px; display: inline-block; margin-bottom: 20px; }
          .api-section { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .endpoint { font-family: monospace; background: #1e293b; color: #10b981; padding: 4px 8px; border-radius: 4px; }
          .error { color: #dc2626; background: #fef2f2; padding: 12px; border-radius: 6px; margin: 10px 0; }
          .success { color: #059669; background: #ecfdf5; padding: 12px; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="status">
            <i class="fas fa-check-circle"></i> Server Running
          </div>
          
          <h1>Earl Hickson Jr. - Senior Front-End Engineer</h1>
          <p>Brazilian Jiu-Jitsu coaching platform with modern web-based portfolio and content management system.</p>
          
          <div class="api-section">
            <h3><i class="fas fa-code"></i> API Endpoints Available</h3>
            <ul>
              <li><strong>Health Check:</strong> <span class="endpoint">GET /api/health</span></li>
              <li><strong>Contact Form:</strong> <span class="endpoint">POST /api/contact</span></li>
              <li><strong>BJJ Booking:</strong> <span class="endpoint">POST /api/bjj-booking</span></li>
              <li><strong>Social Posts:</strong> <span class="endpoint">GET /api/social-posts</span></li>
              <li><strong>Resume Download:</strong> <span class="endpoint">GET /api/resume</span></li>
            </ul>
          </div>
          
          <div class="success">
            <strong>Status:</strong> Full-stack infrastructure is running successfully! 
            API endpoints are functional and ready for frontend integration.
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
            <p><strong>Architecture:</strong> Express.js backend with PostgreSQL database, Drizzle ORM, and Zod validation</p>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
            <p><strong>Port:</strong> ${PORT}</p>
          </div>
        </div>
        
        <script>
          // Test API endpoint
          fetch('/api/health')
            .then(res => res.json())
            .then(data => console.log('API Health Check:', data))
            .catch(err => console.error('API Error:', err));
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});