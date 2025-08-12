# Deployment Guide

## Automated Deployment with GitHub Actions

This project includes comprehensive GitHub Actions workflows for automated deployment and quality assurance.

### GitHub Secrets Required

Add these secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions`):

#### Required for All Deployments:
```
DATABASE_URL=postgresql://...
SENDGRID_API_KEY=SG...
YOUTUBE_API_KEY=AIza...
YOUTUBE_CHANNEL_ID=UC...
VITE_GA_MEASUREMENT_ID=G-...
```

#### For Vercel Deployment:
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### For Railway Deployment:
```
RAILWAY_TOKEN=your_railway_token
RAILWAY_SERVICE=your_service_name
```

#### For Testing:
```
TEST_DATABASE_URL=postgresql://test_db_url
```

### Workflow Features

1. **Automated Build & Test** (`.github/workflows/deploy.yml`)
   - Tests on Node.js 18.x and 20.x
   - Type checking with TypeScript
   - Build verification
   - Security scanning
   - Automatic deployment on main branch

2. **Performance Monitoring** (`.github/workflows/lighthouse.yml`)
   - Lighthouse performance audits
   - Accessibility compliance checks
   - SEO optimization verification
   - Performance benchmarking

3. **Quality Gates**
   - Performance score > 80%
   - Accessibility score > 95%
   - Best practices score > 90%
   - SEO score > 90%

## Manual Deployment Options

### 1. Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### 2. Railway
```bash
npm i -g @railway/cli
railway login
railway link
railway up
```

### 3. Render
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

## Build Commands
- Development: `npm run dev`
- Production Build: `npm run build`
- Production Start: `npm start`
- Database Push: `npm run db:push`
- Type Check: `npm run type-check`

## Workflow Triggers
- **Push to main/master**: Full deployment pipeline
- **Pull requests**: Build and test only
- **Manual trigger**: Available through GitHub Actions tab

## Performance Optimization
- Vite for optimized builds
- Database connection pooling
- Static asset optimization
- Automatic performance monitoring