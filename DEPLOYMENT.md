# Netlify Deployment Guide

## Current Deployment
🚀 **Live Site**: https://bespoke-seahorse-472605.netlify.app/

## Required Environment Variables for Netlify

Add these to your Netlify dashboard → Site settings → Environment variables:

```
DATABASE_URL=
SENDGRID_API_KEY=
YOUTUBE_API_KEY=
YOUTUBE_CHANNEL_ID=
THREADS_APP_ID=
THREADS_APP_SECRET=
```

## Custom Domain Setup (ehicksonjr.com)

### Step 1: Add Domain in Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter: `ehicksonjr.com`

### Step 2: Configure DNS
In your domain registrar (GoDaddy, Namecheap, etc.), set:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: bespoke-seahorse-472605.netlify.app
```

### Step 3: SSL Certificate
Netlify will automatically provision a free SSL certificate once DNS is configured.

## Redeploy Instructions

After adding environment variables:
1. Go to Deploys tab in Netlify
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete
4. Test API endpoints: https://bespoke-seahorse-472605.netlify.app/api/social-media

## Features Included
- ✅ Complete portfolio site
- ✅ Brazilian Jiu-Jitsu coaching page (/EarldKaiju)
- ✅ YouTube integration (7 competition videos)
- ✅ Contact forms with SendGrid
- ✅ BJJ lesson booking system
- ✅ Instagram integration (ready for OAuth)
- ✅ Responsive design with dark theme