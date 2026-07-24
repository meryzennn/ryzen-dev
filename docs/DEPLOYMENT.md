# Deployment Guide
## Personal Bento-Style Link Website

**Version:** 1.0  
**Date:** 2026-07-24

---

## Overview

This guide covers deployment options for your Bento-style website. The recommended approach is Vercel due to its excellent Next.js integration, but alternative platforms are also documented.

**Deployment time:** 5-10 minutes (first time)  
**Prerequisites:** Git repository, platform account

---

## 1. Vercel Deployment (Recommended)

Vercel is built by the creators of Next.js and offers the best integration and performance.

### 1.1 Initial Setup

**Step 1: Prepare Your Repository**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Bento website"

# Create GitHub repository (via GitHub CLI or web)
gh repo create personal-bento --public --source=. --remote=origin

# Push to GitHub
git push -u origin main
```

**Step 2: Create Vercel Account**

1. Visit [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

**Step 3: Import Project**

1. Click "Add New Project" on Vercel dashboard
2. Select "Import Git Repository"
3. Find your `personal-bento` repository
4. Click "Import"

**Step 4: Configure Build Settings**

Vercel auto-detects Next.js projects. Verify these settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Root Directory | `./` (leave blank) |

**Step 5: Deploy**

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a production URL: `https://personal-bento-xxx.vercel.app`

### 1.2 Environment Variables

If you need environment variables (analytics keys, etc.):

1. Go to project settings → Environment Variables
2. Add variables:
   - Key: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://your-domain.com`
   - Environment: All (Production, Preview, Development)
3. Redeploy for changes to take effect

**Public vs Private Variables:**
- `NEXT_PUBLIC_*` - Exposed to browser (use for public config)
- No prefix - Server-only (use for API keys, secrets)

### 1.3 Custom Domain Setup

**Step 1: Add Domain in Vercel**

1. Go to project settings → Domains
2. Click "Add Domain"
3. Enter your domain: `yourdomain.com`
4. Click "Add"

**Step 2: Configure DNS**

Vercel will provide DNS records. Add these to your domain provider:

**Option A: Using Nameservers (Recommended)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Using A/CNAME Records**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Step 3: Wait for DNS Propagation**

- Usually takes 5-10 minutes
- Can take up to 48 hours in rare cases
- Check status in Vercel dashboard

**Step 4: Verify SSL**

- Vercel automatically provisions SSL certificate
- HTTPS will be enabled once DNS propagates
- Force HTTPS redirect is enabled by default

### 1.4 Automatic Deployments

Every git push triggers a new deployment:

```bash
# Make changes to content.json
vim data/content.json

# Commit and push
git add data/content.json
git commit -m "Update profile bio"
git push

# Vercel automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys to production
# 4. Updates your domain
```

**Deployment Types:**
- Push to `main` → Production deployment
- Push to other branches → Preview deployment (unique URL)
- Pull Request → Preview deployment with comment

### 1.5 Vercel CLI (Optional)

Install for local deployment testing:

```bash
# Install globally
npm i -g vercel

# Login
vercel login

# Deploy from local machine
vercel

# Deploy to production
vercel --prod
```

---

## 2. Netlify Deployment

Netlify is a solid alternative with similar features.

### 2.1 Initial Setup

**Step 1: Create Netlify Account**

1. Visit [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Authorize Netlify

**Step 2: Import Project**

1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: (leave blank)

**Step 3: Deploy**

1. Click "Deploy site"
2. Wait for build to complete
3. You'll get a URL: `https://random-name-123.netlify.app`

### 2.2 Custom Domain

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. SSL is automatic

### 2.3 Build Settings

Add to `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Install Next.js plugin:
```bash
npm install -D @netlify/plugin-nextjs
```

---

## 3. Cloudflare Pages

Fast edge deployment with Cloudflare's global network.

### 3.1 Setup

1. Visit [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect to GitHub
3. Select repository
4. Configure build:
   - Build command: `npm run build`
   - Build output: `.next`
   - Framework preset: Next.js

**Important:** Some Next.js features have limited support on Cloudflare Pages. Check compatibility: [nextjs-on-cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

---

## 4. GitHub Pages

Not recommended for Next.js (requires static export), but possible.

### 4.1 Configuration

Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // GitHub Pages doesn't support image optimization
  },
  basePath: '/personal-bento', // Your repo name
}

module.exports = nextConfig
```

### 4.2 Deploy Script

Add to `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && touch out/.nojekyll && gh-pages -d out -t true"
  }
}
```

Install `gh-pages`:
```bash
npm install -D gh-pages
```

Deploy:
```bash
npm run deploy
```

**Limitations:**
- No server-side rendering
- No image optimization
- No API routes
- Manual deployment

---

## 5. Self-Hosted (VPS/Server)

Deploy to your own server (DigitalOcean, Linode, AWS EC2, etc.).

### 5.1 Server Setup

**Prerequisites:**
- Ubuntu 22.04 or similar
- Node.js 18+ installed
- Nginx or Caddy for reverse proxy
- PM2 for process management

### 5.2 Deploy Process

```bash
# On your server
cd /var/www/
git clone https://github.com/yourusername/personal-bento.git
cd personal-bento

# Install dependencies
npm install

# Build for production
npm run build

# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "bento" -- start

# Set PM2 to restart on server reboot
pm2 startup
pm2 save
```

### 5.3 Nginx Configuration

Create `/etc/nginx/sites-available/bento`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/bento /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5.4 SSL with Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5.5 Update Process

```bash
cd /var/www/personal-bento
git pull
npm install
npm run build
pm2 restart bento
```

---

## 6. Docker Deployment

Containerized deployment for any platform.

### 6.1 Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 6.2 Build and Run

```bash
# Build image
docker build -t personal-bento .

# Run container
docker run -p 3000:3000 personal-bento
```

### 6.3 Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## 7. CI/CD Setup

### 7.1 GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

Add `VERCEL_TOKEN` to GitHub repository secrets.

---

## 8. Performance Optimization

### 8.1 Pre-Deployment Checklist

- [ ] Compress all images (< 500KB each)
- [ ] Remove unused dependencies
- [ ] Run production build locally: `npm run build`
- [ ] Check Lighthouse score (target: 90+)
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check content.json validation passes

### 8.2 Image Optimization

```bash
# Use tools like:
npm install -g sharp-cli

# Optimize images
sharp-cli -i public/images/ -o public/images-optimized/ -f webp -q 85
```

### 8.3 Bundle Analysis

```bash
# Install analyzer
npm install -D @next/bundle-analyzer

# Update next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Analyze bundle
ANALYZE=true npm run build
```

---

## 9. Monitoring & Analytics

### 9.1 Vercel Analytics

Enable in project settings:
1. Go to Analytics tab
2. Enable "Vercel Analytics"
3. View metrics: pageviews, top pages, devices, locations

### 9.2 Google Analytics (Optional)

Add to `app/layout.tsx`:

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 9.3 Plausible Analytics (Privacy-Friendly)

```tsx
<Script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
/>
```

---

## 10. Troubleshooting

### Build Fails on Deployment

**Error:** "Build exceeded maximum time"

**Solution:**
- Optimize images (reduce file size)
- Remove unused dependencies
- Check for infinite loops in build scripts

**Error:** "Module not found"

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading in Production

**Solution:**
- Ensure images are in `public/images/`
- Check paths are `/images/file.jpg` (not `public/images/`)
- Verify Next.js Image component is used
- Check domain is allowed in `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: ['example.com'], // Add external image domains
  },
}
```

### Custom Domain Not Working

**Solution:**
1. Check DNS propagation: [dnschecker.org](https://dnschecker.org)
2. Verify DNS records match platform's requirements
3. Wait up to 48 hours for full propagation
4. Check domain is not already in use on another project

### Slow Build Times

**Solution:**
- Enable caching in your CI/CD pipeline
- Use Vercel's build cache (automatic)
- Optimize images before committing
- Remove large unused files from repository

---

## 11. Rollback Procedure

### On Vercel

1. Go to Deployments tab
2. Find previous successful deployment
3. Click "..." menu → "Promote to Production"

### On Other Platforms

```bash
# Revert to previous commit
git log --oneline  # Find commit hash
git revert <commit-hash>
git push

# Or force push previous commit (destructive)
git reset --hard <commit-hash>
git push --force
```

---

## 12. Security Checklist

Before deploying:

- [ ] No secrets in content.json or code
- [ ] Environment variables properly configured
- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] CSP headers configured (optional)
- [ ] Rate limiting on contact form (if added)
- [ ] Dependencies up to date: `npm audit`

---

## 13. Deployment Comparison

| Feature | Vercel | Netlify | Cloudflare | GitHub Pages |
|---------|--------|---------|------------|--------------|
| Next.js Support | Excellent | Good | Limited | Export only |
| Build Time | ~2 min | ~3 min | ~3 min | Manual |
| Image Optimization | Yes | Yes | No | No |
| Custom Domain | Yes | Yes | Yes | Yes |
| SSL | Automatic | Automatic | Automatic | Automatic |
| Edge Network | Yes | Yes | Yes | No |
| Free Tier | Generous | Generous | Generous | Unlimited |
| Best For | Next.js | Any static | Performance | Simple static |

---

## 14. Post-Deployment

### Verify Deployment

```bash
# Check site is live
curl -I https://yourdomain.com

# Test different pages
curl https://yourdomain.com
curl https://yourdomain.com/api/health  # If you have API routes

# Check meta tags
curl -s https://yourdomain.com | grep '<meta'
```

### Performance Testing

1. Run Lighthouse audit (Chrome DevTools)
2. Test on multiple devices
3. Check loading speed: [PageSpeed Insights](https://pagespeed.web.dev/)
4. Verify images are optimized: Network tab in DevTools

### Share Your Site

Add to your GitHub profile, social media, and professional networks!

---

## Summary

**Recommended deployment flow:**

1. Push code to GitHub
2. Import to Vercel
3. Add custom domain
4. Configure DNS
5. Enable analytics
6. Monitor performance

**Update workflow:**

1. Edit `data/content.json` locally
2. `git commit -m "Update content"`
3. `git push`
4. Wait 2-3 minutes
5. Changes live!

**Need help?** Check the [documentation](../README.md) or platform-specific docs.

---

**Your Bento website is now live!** 🚀
