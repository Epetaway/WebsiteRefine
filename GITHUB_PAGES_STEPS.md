# GitHub Pages Setup Steps for ehicksonjr.com

## Step-by-Step GitHub Pages Configuration

### 1. Repository Setup
1. Extract the zip file to your local machine
2. Open terminal/command prompt in the extracted folder
3. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Earl Hickson Jr. Portfolio"
   ```

### 2. Push to GitHub
1. Create new repository on GitHub named `ehicksonjr-portfolio`
2. Connect local repository to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ehicksonjr-portfolio.git
   git branch -M main
   git push -u origin main
   ```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub.com
2. Click **Settings** tab (top menu)
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

### 4. Configure Custom Domain
1. Still in Pages settings, find **Custom domain** section
2. Enter: `ehicksonjr.com`
3. Click **Save**
4. Check **Enforce HTTPS** (wait for it to become available)

### 5. DNS Configuration at Your Domain Registrar
Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add:

**Option A - CNAME Record (Recommended)**:
```
Type: CNAME
Name: @ (or leave empty for root domain)
Value: YOUR_USERNAME.github.io
```

**Option B - A Records** (if CNAME doesn't work):
```
Type: A
Name: @ (or leave empty)
Value: 185.199.108.153

Type: A  
Name: @ (or leave empty)
Value: 185.199.109.153

Type: A
Name: @ (or leave empty)
Value: 185.199.110.153

Type: A
Name: @ (or leave empty)
Value: 185.199.111.153
```

### 6. Set Up Forms (Required for Contact/BJJ Booking)
Since GitHub Pages is static-only, forms need external service:

1. Go to [Formspree.io](https://formspree.io)
2. Sign up for free account
3. Create two forms:
   - **Contact Form**: Name it "Portfolio Contact"
   - **BJJ Booking Form**: Name it "BJJ Lesson Booking"
4. Copy the form endpoints (they look like: `https://formspree.io/f/xvgpkjbl`)
5. Update `client/src/lib/api.ts` with your endpoints:
   ```typescript
   export const CONTACT_FORM_ACTION = 'https://formspree.io/f/YOUR_CONTACT_ID';
   export const BJJ_BOOKING_ACTION = 'https://formspree.io/f/YOUR_BJJ_ID';
   ```

### 7. Verification Steps
1. **Wait for DNS propagation** (5-60 minutes)
2. **Check GitHub Pages status**:
   - Go to repository Settings → Pages
   - Should show green checkmark and "Your site is published at https://ehicksonjr.com"
3. **Test your site**:
   - Visit `https://ehicksonjr.com`
   - Navigate through all pages
   - Test contact and BJJ booking forms
   - Verify resume download works

### 8. Optional: Google Analytics
If you want analytics, add to repository secrets:
1. Go to repository Settings → Secrets and variables → Actions
2. Add: `VITE_GA_MEASUREMENT_ID` with your Google Analytics ID

## Files Added for GitHub Pages

The zip file now includes:
- `.github/workflows/deploy.yml` - Automatic deployment workflow
- `docs/CNAME` - Custom domain configuration
- `docs/.nojekyll` - Prevents Jekyll processing
- `GITHUB_PAGES_DEPLOYMENT.md` - Detailed technical info
- `client/src/lib/api.ts` - Form service integration
- This step-by-step guide

## Troubleshooting

**Site not loading?**
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Verify GitHub Pages is enabled in repository settings

**Forms not working?**
- Update form endpoints in `client/src/lib/api.ts`
- Check Formspree dashboard for submissions

**HTTPS not working?**
- Wait for GitHub to provision SSL certificate (can take up to 24 hours)
- Ensure "Enforce HTTPS" is checked in Pages settings

**Domain not connecting?**
- Double-check DNS records at your registrar
- Try using A records instead of CNAME if issues persist

Your site will be live at `https://ehicksonjr.com` once DNS propagates!