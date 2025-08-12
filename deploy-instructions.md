# Portfolio Deployment Instructions

## What's Included
This package contains Earl Hickson Jr.'s complete portfolio with:
- ✅ Professional "Front-End Engineer" branding throughout
- ✅ BJJ booking page at /earldkaiju with full functionality
- ✅ Modern React/TypeScript architecture
- ✅ Working contact and BJJ booking forms
- ✅ Database integration for full-stack deployment
- ✅ GitHub Pages ready configuration

## Quick Setup

### For GitHub Pages (Static Hosting)
1. **Upload to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Earl Hickson Jr. Portfolio"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Configure GitHub Pages**:
   - Repository Settings → Pages
   - Source: "GitHub Actions" 
   - The workflow will automatically build and deploy
   - Your site: `https://yourusername.github.io/portfolio`

3. **Manual Build (if needed)**:
   ```bash
   npm install
   npx vite build --outDir client/dist
   ```

### For Full-Stack Hosting (Recommended)
**Best platforms**: Replit Deployments, Vercel, or Netlify

1. **Upload project files**
2. **Set environment variables**:
   - `DATABASE_URL` (PostgreSQL connection)
   - `SENDGRID_API_KEY` (email service)
3. **Deploy** - platform handles the rest

## Key Features
- **BJJ Booking**: Complete lesson booking system with pricing
- **Professional Portfolio**: Case studies, contact forms, resume download
- **Responsive Design**: Works on all devices
- **SEO Optimized**: Proper meta tags and semantic HTML

## Forms Configuration
- **Full-stack**: Uses database and SendGrid email
- **GitHub Pages**: Configure Formspree endpoints in `client/src/lib/api.ts`

Your portfolio is production-ready! 🚀