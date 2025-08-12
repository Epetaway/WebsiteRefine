#!/usr/bin/env node
/**
 * Generate package-lock.json for GitHub Actions compatibility
 */

const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Create a minimal package-lock.json for GitHub Actions
const packageLock = {
  "name": packageJson.name,
  "version": packageJson.version,
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": packageJson.name,
      "version": packageJson.version,
      "license": packageJson.license,
      "dependencies": packageJson.dependencies,
      "devDependencies": packageJson.devDependencies || {}
    }
  }
};

fs.writeFileSync('package-lock.json', JSON.stringify(packageLock, null, 2));
console.log('✅ Generated package-lock.json for GitHub Actions compatibility');