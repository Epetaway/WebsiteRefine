# Deployment Guide

## GitHub Pages Deployment (Static)

**Important**: GitHub Pages only serves static files. Your portfolio currently has a full-stack backend (forms, database, email). See `GITHUB_PAGES_DEPLOYMENT.md` for detailed GitHub Pages setup.

**Quick GitHub Pages Setup**:
1. Push to GitHub repository
2. Go to repository Settings → Pages → Deploy from branch: main
3. Add custom domain: `ehicksonjr.com`
4. Configure DNS: CNAME record pointing to `yourusername.github.io`

**Note**: Forms will need external service (Formspree) for GitHub Pages.

---

## Full-Stack Deploy to GitHub + Replit (Recommended)

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Earl Hickson Jr. Portfolio"
```

2. Add your GitHub remote:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Replit

1. Go to [Replit.com](https://replit.com)
2. Click "Create Repl" > "Import from GitHub"
3. Connect your GitHub repository
4. Replit will automatically detect the project type

### Step 3: Configure Environment Variables

In Replit Secrets tab, add these variables:

**Required:**
```
DATABASE_URL=your_postgresql_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
```

**Optional (for full functionality):**
```
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=UCyour_channel_id
THREADS_APP_ID=your_threads_app_id
THREADS_APP_SECRET=your_threads_app_secret
VITE_GA_MEASUREMENT_ID=G-your_measurement_id
```

### Step 4: Deploy

1. Click the "Deploy" button in Replit
2. Your site will initially be available at `your-repl-name.your-username.replit.app`

### Step 5: Custom Domain Setup (ehicksonjr.com)

1. In your Replit deployment dashboard, go to the "Domains" section
2. Click "Add Custom Domain"
3. Enter `ehicksonjr.com` as your domain
4. Replit will provide DNS configuration instructions
5. Update your domain's DNS settings with your registrar:
   - Add CNAME record pointing to the provided Replit URL
   - Or add A records to the provided IP addresses
6. Wait for DNS propagation (usually 5-60 minutes)
7. Your site will be live at `https://ehicksonjr.com`

## Environment Variables Guide

### Database (Required)
- `DATABASE_URL`: PostgreSQL connection string
  - Get from: Neon, Supabase, PlanetScale, or any PostgreSQL provider

### Email Service (Required)
- `SENDGRID_API_KEY`: SendGrid API key for contact forms
  - Get from: [SendGrid Dashboard](https://app.sendgrid.com/settings/api_keys)

### YouTube Integration (Optional)
- `YOUTUBE_API_KEY`: YouTube Data API v3 key
  - Get from: [Google Cloud Console](https://console.cloud.google.com/)
- `YOUTUBE_CHANNEL_ID`: Your YouTube channel ID
  - Find in: YouTube Studio > Settings > Channel > Advanced settings

### Instagram Integration (Optional)  
- `THREADS_APP_ID`: Threads API application ID
- `THREADS_APP_SECRET`: Threads API application secret
  - Get from: [Meta for Developers](https://developers.facebook.com/)

### Analytics (Optional)
- `VITE_GA_MEASUREMENT_ID`: Google Analytics 4 measurement ID (starts with G-)
  - Get from: [Google Analytics](https://analytics.google.com/)

## Alternative Deployment Options

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Add environment variables in Vercel dashboard

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in site settings

### Railway
1. Connect GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on git push

## Troubleshooting

**Build Issues:**
- Ensure Node.js 18+ is used
- Check all environment variables are set
- Verify database connection

**Database Issues:**
- Run `npm run db:push` after deployment
- Check PostgreSQL connection string format
- Ensure database allows external connections

**Email Issues:**
- Verify SendGrid API key is active
- Check sender email is verified in SendGrid
- Monitor SendGrid dashboard for delivery status

**Social Media APIs:**
- YouTube: Ensure API key has YouTube Data API v3 enabled
- Instagram: Complete Threads API app review process