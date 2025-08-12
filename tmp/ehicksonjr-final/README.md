# Earl Hickson Jr. - Portfolio

Professional portfolio website for Earl Hickson Jr., Senior Front-End Engineer based in Parsippany, New Jersey.

## Live Site
Visit: [ehicksonjr.com](https://ehicksonjr.com)

## Features
- Modern Next.js 14 with App Router
- Professional portfolio showcase  
- Brazilian Jiu-Jitsu lessons booking at /earldkaiju
- Responsive design with Tailwind CSS
- Custom domain deployment to ehicksonjr.com

## Automatic Deployment
This site automatically deploys to ehicksonjr.com via GitHub Pages when you push to the main branch.

### Deployment Process
1. Push to main branch triggers GitHub Actions
2. Builds with `next build` 
3. Exports static site with `next export`
4. Deploys to GitHub Pages
5. Available at ehicksonjr.com via CNAME configuration

## Local Development
```bash
npm install
npm run dev
```

## Manual Build
```bash
npm run build
npm run export
```

Creates static export in `out/` directory.