#!/usr/bin/env node

/**
 * Build script for GitHub Pages deployment
 * Creates a static build optimized for GitHub Pages hosting
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building for GitHub Pages...');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('docs')) {
    fs.rmSync('docs', { recursive: true, force: true });
  }

  // Build the client
  console.log('📦 Building client application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create docs directory for GitHub Pages
  console.log('📁 Setting up GitHub Pages structure...');
  fs.mkdirSync('docs', { recursive: true });

  // Copy dist contents to docs
  const distPath = path.join(process.cwd(), 'dist');
  const docsPath = path.join(process.cwd(), 'docs');

  function copyRecursiveSync(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  copyRecursiveSync(distPath, docsPath);

  // Create .nojekyll file to prevent Jekyll processing
  fs.writeFileSync(path.join(docsPath, '.nojekyll'), '');

  // Create CNAME file for custom domain
  fs.writeFileSync(path.join(docsPath, 'CNAME'), 'ehicksonjr.com\n');

  console.log('✅ GitHub Pages build complete!');
  console.log('📂 Static files ready in /docs directory');
  console.log('🌐 Configure GitHub Pages to serve from /docs folder');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}