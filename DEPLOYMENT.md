# Deployment Guide

This guide covers how to deploy the Text Case Converter to various platforms.

## Pre-Deployment Checklist

- [ ] Update Google AdSense publisher ID in `src/components/AdSenseTop.tsx`
- [ ] Update Google AdSense publisher ID in `src/components/AdSenseSidebar.tsx`
- [ ] Add Google AdSense script to `index.html`
- [ ] Test application with `npm run dev`
- [ ] Build application with `npm run build`
- [ ] Preview build with `npm run preview`
- [ ] Update favicon if desired
- [ ] Review README.md for accuracy

## Netlify Deployment

### Via GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to https://netlify.com and sign up/login
3. Click "New site from Git"
4. Connect your GitHub account and select the repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `dist` folder to Netlify

## Vercel Deployment

### Via GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com and sign up/login
3. Click "Import Project"
4. Import from Git and select your repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

### Command Line

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Docker Deployment

### Build Docker Image

```bash
docker build -t text-case-converter:latest .
```

### Run Container Locally

```bash
docker run -p 3000:3000 text-case-converter:latest
```

### Push to Docker Registry

```bash
docker tag text-case-converter:latest your-registry/text-case-converter:latest
docker push your-registry/text-case-converter:latest
```

## AWS Deployment

### Using S3 + CloudFront

1. Build the project:
   ```bash
   npm run build
   ```

2. Create S3 bucket for static hosting

3. Upload `dist` folder contents to S3

4. Create CloudFront distribution:
   - Origin: S3 bucket
   - Behavior: Forward all traffic to S3

5. Set Route 53 DNS records to CloudFront

### Using Amplify

1. Push code to GitHub/CodeCommit
2. Go to AWS Amplify Console
3. Click "New app" → "Host web app"
4. Select Git provider and repository
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Deploy

## Azure Deployment

### Using Static Web Apps

1. Push code to GitHub
2. Go to Azure Portal → Static Web Apps
3. Create new resource
4. Connect GitHub repository
5. Configure build settings:
   - App location: `/`
   - Build preset: Vite
   - App artifact location: `dist`
6. Deploy

## Environment Variables

If needed, create `.env` file:

```env
VITE_ADSENSE_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxxxxx
```

Access in code:
```typescript
const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
```

## Performance Optimization for Deployment

1. **Enable Gzip Compression** in web server
2. **Set Cache Headers**:
   - HTML: No cache
   - JS/CSS: 1 year
   - Images: 30 days

3. **CDN Setup**: Route all static assets through CDN

4. **Monitor Performance**:
   - Set up Google Analytics
   - Monitor Core Web Vitals
   - Use Lighthouse for audits

## SSL/HTTPS

All recommended platforms provide free SSL:
- Netlify: Automatic
- Vercel: Automatic
- AWS Amplify: Automatic
- Azure: Automatic

## Custom Domain

### Netlify
1. Domain settings → Custom domain
2. Follow DNS instructions

### Vercel
1. Settings → Domains
2. Add domain and follow instructions

### Azure
1. Custom domain settings
2. Update DNS records

## Monitoring & Analytics

Add Google Analytics:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 16+)
- Clear cache: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### Ads Not Displaying
- Verify AdSense publisher ID is correct
- Check AdSense script is included in HTML
- Ensure domain is approved by Google AdSense
- Wait 24-48 hours after adding domain

### Slow Performance
- Check Lighthouse score
- Enable compression on server
- Optimize images if any
- Review bundle size: `npm run build` and check dist size

## Maintenance

1. **Update Dependencies**: `npm update`
2. **Security Audits**: `npm audit`
3. **Monitor Errors**: Set up error tracking (Sentry, Rollbar)
4. **Regular Backups**: Backup source code regularly
5. **Update Content**: Keep README and documentation current
