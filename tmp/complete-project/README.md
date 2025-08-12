# Earl Hickson Jr. - Portfolio

Professional portfolio website for Earl Hickson Jr., Senior Front-End Engineer based in Parsippany, New Jersey.

## Live Site
Visit: [ehicksonjr.com](https://ehicksonjr.com)

## Features
- Modern Next.js 13 with App Router
- Professional portfolio showcase  
- Brazilian Jiu-Jitsu lessons booking at /earldkaiju
- Responsive design with Tailwind CSS
- Custom domain deployment to ehicksonjr.com

## Quick Start

### Setup Repository
```bash
# Clone or download this repository
git clone <your-repo-url>
cd earl-hickson-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Deploy to GitHub Pages
1. Push this code to your GitHub repository
2. Go to Settings → Pages → Source: "GitHub Actions"
3. Push to main branch - automatic deployment will begin
4. Site will be live at ehicksonjr.com

## Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run export       # Export static files
npm run lint         # Run ESLint
```

## Deployment
This repository is configured for automatic deployment to GitHub Pages via GitHub Actions:

- **Trigger**: Push to main branch
- **Build**: Next.js build + export
- **Deploy**: Static files to GitHub Pages
- **Domain**: ehicksonjr.com (via CNAME)

## Project Structure
```
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utility functions
├── public/              # Static assets
├── .github/workflows/   # GitHub Actions
└── CNAME               # Custom domain configuration
```

## Git Setup
If starting fresh:
```bash
git init
git add .
git commit -m "Initial commit: Earl Hickson Jr. Portfolio"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```