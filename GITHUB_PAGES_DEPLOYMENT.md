# GitHub Pages Deployment Guide

**Important**: Your portfolio currently uses a full-stack architecture (React frontend + Express.js backend + PostgreSQL database). GitHub Pages only serves static files, so we need to adapt the deployment strategy.

## Option 1: Static-Only GitHub Pages (Recommended for GitHub Pages)

### What Changes:
- **Forms**: Contact and BJJ booking forms will use external service (Formspree/Netlify Forms)
- **Database**: No backend database (social media content becomes static)
- **Email**: Handled by form service instead of SendGrid directly

### Setup Steps:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Earl Hickson Jr. Portfolio"
   git remote add origin https://github.com/yourusername/ehicksonjr-portfolio.git
   git push -u origin main
   ```

2. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"

3. **GitHub Actions will automatically**:
   - Build the React frontend
   - Deploy to GitHub Pages
   - Available at `https://yourusername.github.io/ehicksonjr-portfolio`

4. **Custom Domain Setup**:
   - In repository Settings → Pages → Custom domain
   - Enter: `ehicksonjr.com`
   - Configure DNS with your registrar:
     ```
     Type: CNAME
     Name: @
     Value: yourusername.github.io
     ```

5. **Form Service Setup** (Required for contact forms):
   - Sign up at [Formspree.io](https://formspree.io)
   - Create two forms: "Contact" and "BJJ Booking"
   - Update `client/src/lib/api.ts` with your Formspree endpoints

## Option 2: Full-Stack with Different Hosting

If you want to keep the full backend functionality (database, direct email, social media APIs):

### Better Platforms for Full-Stack:
- **Replit Deployments**: Full-stack support, custom domains, automatic HTTPS
- **Vercel**: Full-stack support, serverless functions, great for React
- **Netlify**: Full-stack with functions, form handling built-in
- **Railway**: Full database support, automatic deployments

### Why These Are Better:
- Support Express.js backend
- PostgreSQL database hosting
- Environment variable management
- Automatic HTTPS/SSL certificates

## Recommendation

**For ehicksonjr.com domain**: Use **Replit Deployments** or **Vercel**
- Keep all current functionality (forms, database, social media)
- Professional custom domain
- No need to modify existing code

**For GitHub Pages**: Use the static version
- Simple deployment
- Free hosting
- Requires form service setup
- Limited to frontend-only functionality

## Current Project Status

Your portfolio is **production-ready** for full-stack deployment with:
- ✅ Working contact and BJJ booking forms
- ✅ Database integration
- ✅ Email notifications via SendGrid
- ✅ Social media API integration
- ✅ Custom domain configuration

Choose the deployment method that best fits your needs!