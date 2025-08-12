#!/bin/bash
echo "Building Earl Hickson Jr. Portfolio..."
npm ci
npm run build

# Copy serverless function
echo "Setting up Netlify functions..."
mkdir -p netlify/functions
cp netlify/functions/server.js netlify/functions/server.js 2>/dev/null || echo "Serverless function already in place"

echo "Build completed successfully!"