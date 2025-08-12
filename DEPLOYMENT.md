# Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### 2. Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway login
railway link
railway up
```

### 3. Render
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

## Environment Variables Required
```
DATABASE_URL=postgresql://...
SENDGRID_API_KEY=SG...
YOUTUBE_API_KEY=AIza...
YOUTUBE_CHANNEL_ID=UC...
VITE_GA_MEASUREMENT_ID=G-...
```

## Build Commands
- Development: `npm run dev`
- Production Build: `npm run build`
- Production Start: `npm start`
- Database Push: `npm run db:push`

## GitHub Actions (Optional)
Create `.github/workflows/deploy.yml` for automated deployments.

## Performance
- Uses Vite for optimized builds
- Server-side rendering ready
- Database connection pooling
- Static asset optimization