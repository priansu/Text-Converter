# Troubleshooting Guide

## Installation Issues

### Problem: `npm install` fails
**Solution**:
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install
```

### Problem: Wrong Node version
**Solution**:
```bash
# Check version
node --version

# Required: Node 16 or higher
# Download from: https://nodejs.org/
```

### Problem: Permission denied errors
**Solution** (Windows):
```bash
# Run as Administrator
# Or use:
npm install --no-save
```

---

## Development Issues

### Problem: Port 3000 already in use
**Solution**:
```bash
# Use different port
npm run dev -- --port 3001

# Or kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Problem: React component not rendering
**Checklist**:
- [ ] No TypeScript errors: `npm run build`
- [ ] Component exported correctly
- [ ] Import path is correct
- [ ] Check browser console for errors
- [ ] Clear cache: Ctrl+Shift+Delete

### Problem: Text transformation not working
**Checklist**:
- [ ] Check `textTransformations.ts` exists
- [ ] Verify import in `CaseConverter.tsx`
- [ ] Ensure input text is not empty
- [ ] Check console for JavaScript errors
- [ ] Reload page

---

## Build Issues

### Problem: Build fails with TypeScript errors
**Solution**:
```bash
# Check errors
npm run build

# Fix common issues
tsc --noEmit

# Type assertion if needed (temporary)
# Change: const something = value;
# To: const something = value as TypeName;
```

### Problem: `terser` not found
**Solution**:
```bash
npm install --save-dev terser
npm run build
```

### Problem: Module not found error
**Solution**:
```bash
# Verify import paths are correct
# Use relative paths: ../utils/textTransformations
# Not absolute paths

# Clear cache
rm -rf .vite
npm run build
```

### Problem: Large bundle size
**Solution**:
- Already optimized! (~48.6KB gzipped)
- Check for unnecessary dependencies
- Use code splitting if adding features
- Enable compression on server

---

## Deployment Issues

### Problem: 404 errors after deployment

**Netlify**:
- Ensure publish directory is `dist`
- Verify build command is `npm run build`

**Vercel**:
- Should auto-detect Vite
- Check deployment logs

**Traditional Hosting**:
- Ensure `dist` files uploaded correctly
- Check FTP permissions
- Verify web server configuration

### Problem: Ads not displaying (Google AdSense)

**Checklist**:
1. [ ] Approved for AdSense (wait 24-48 hours)
2. [ ] Publisher ID is correct
3. [ ] AdSense script added to `index.html`
4. [ ] Domain matches AdSense approval
5. [ ] Ads enabled in AdSense account
6. [ ] Content is 300+ words (AdSense policy)
7. [ ] Using HTTPS
8. [ ] No ad blocker blocking ads
9. [ ] Check AdSense console for errors

**Solution**:
```html
<!-- Add to index.html before </head> -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-ID"
     crossorigin="anonymous"></script>
```

### Problem: Site too slow

**Checklist**:
- [ ] Using CDN? (Netlify/Vercel provide this)
- [ ] Gzip compression enabled?
- [ ] Images optimized? (Not used in this project)
- [ ] Browser cache enabled?

**Solution**:
```bash
# Test performance
npm run build

# Check bundle size
# Should be ~48KB gzipped

# Monitor with Google PageSpeed
# https://pagespeed.web.dev/
```

### Problem: CORS errors

**Cause**: Usually from ads or analytics

**Solution**:
```html
<!-- AdSense includes CORS headers -->
<!-- Google Analytics already CORS-safe -->
<!-- Should not be an issue -->
```

---

## Performance Issues

### Problem: High CPU usage during development
**Solution**:
```bash
# Restart dev server
npm run dev

# Try different port to avoid conflicts
npm run dev -- --port 3001

# Update Vite if outdated
npm update
```

### Problem: Hot Module Reload (HMR) not working
**Solution**:
```bash
# Restart server
npm run dev

# Check firewall settings
# HMR uses WebSocket
```

---

## Browser Compatibility

### Problem: App doesn't work in old browser
**Solution**: 
- Supported: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Not supported: IE11 (use different browser)
- Update browser to latest version

### Problem: CSS not applying
**Checklist**:
- [ ] Inline CSS in components
- [ ] Browser DevTools shows CSS
- [ ] No CSS conflicts
- [ ] Clear browser cache: Ctrl+Shift+Delete

### Problem: Copy button not working
**Solution**:
- Check browser permissions
- Allow clipboard access
- Try in non-private mode
- Try different browser
- Check console for errors

---

## Analytics Issues

### Problem: Google Analytics not tracking

**Setup**:
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID');
</script>
```

**Checklist**:
- [ ] Measurement ID correct
- [ ] Script added to HTML
- [ ] Real traffic (not localhost)
- [ ] Wait 24 hours for data to appear
- [ ] Check Analytics settings

---

## SEO Issues

### Problem: Site not ranking on Google
**Solution** (takes time):
1. Submit to Google Search Console
2. Wait 1-2 weeks for indexing
3. Check for errors in GSC
4. Optimize content
5. Build backlinks
6. Monitor rankings

### Problem: Meta tags not appearing
**Solution**:
```html
<!-- Verify in index.html -->
<meta name="description" content="Your description">
<meta name="keywords" content="keywords">
```

**Check**: View page source (Ctrl+U) to verify tags present

---

## Mobile Issues

### Problem: Site doesn't work on mobile
**Checklist**:
- [ ] Viewport meta tag present
- [ ] Responsive CSS working
- [ ] Touch events working
- [ ] Buttons are large enough (44x44px)
- [ ] No horizontal scroll

**Solution**:
```html
<!-- index.html should have: -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Problem: Text input not working on mobile
**Solution**:
- Try different mobile browser
- Check for JavaScript errors
- Disable ad blocker
- Test with example text first

---

## Database/Storage Issues

**Note**: This app has NO backend or database.
- All processing happens in browser
- No user data is stored
- No server required
- No database needed

---

## Git Issues

### Problem: `.gitignore` not working
**Solution**:
```bash
# Re-track ignored files
git rm --cached .
git add .
git commit -m "Fix gitignore"
```

### Problem: Node_modules too large
**Solution**:
```bash
# Don't commit node_modules
# Add to .gitignore:
node_modules/
dist/

# Then:
git rm --cached -r node_modules/
```

---

## Docker Issues

### Problem: Docker build fails
**Solution**:
```bash
# Check Dockerfile exists
# Verify Node version in Dockerfile: 18+

# Rebuild without cache
docker build --no-cache -t text-case-converter .
```

### Problem: Docker container won't start
**Solution**:
```bash
# Check logs
docker logs <container-id>

# Ensure port 3000 not in use
docker run -p 3001:3000 text-case-converter
```

---

## Environment Variables

### Problem: Environment variables not loading
**Solution**:
```bash
# Create .env file in project root
VITE_ADSENSE_PUBLISHER_ID=ca-pub-YOUR-ID

# Access in code:
console.log(import.meta.env.VITE_ADSENSE_PUBLISHER_ID)

# Note: Must restart dev server after changing .env
```

---

## Security Issues

### Problem: Content Security Policy (CSP) errors
**Solution**:
- Currently no strict CSP set
- If adding CSP, whitelist:
  - pagead2.googlesyndication.com (AdSense)
  - googletagmanager.com (Analytics)
  - www.google-analytics.com (Analytics)

---

## Still Having Issues?

### Debug Steps:
1. Check browser console for errors (F12)
2. Look for red X marks in Network tab
3. Clear browser cache and cookies
4. Try incognito/private mode
5. Test in different browser
6. Restart dev server
7. Reinstall dependencies

### Get Help:
- Check existing documentation
- Google the error message
- Stack Overflow: stackoverflow.com
- GitHub Issues: github.com

### Report Bugs:
Provide:
- Error message (exact text)
- Steps to reproduce
- Browser/OS version
- Screenshot if possible

---

## Performance Tuning

### Optimize Build
```bash
# Check bundle
npm run build

# Production should be:
# dist/assets/index-*.js: ~155KB
# Gzipped: ~48.6KB
```

### Monitor Performance
- Use Chrome DevTools (F12)
- Check Lighthouse score
- Monitor Core Web Vitals
- Use PageSpeed Insights

---

## Checklist for Common Problems

✅ **Installation**:
- [ ] Node 16+ installed
- [ ] npm install completed
- [ ] node_modules present

✅ **Development**:
- [ ] `npm run dev` works
- [ ] Browser shows app
- [ ] No console errors

✅ **Building**:
- [ ] `npm run build` succeeds
- [ ] dist/ folder created
- [ ] No TypeScript errors

✅ **Deployment**:
- [ ] dist/ uploaded correctly
- [ ] Site loads on domain
- [ ] All features work
- [ ] Mobile responsive

✅ **AdSense** (optional):
- [ ] Publisher ID updated
- [ ] Script added to HTML
- [ ] Domain approved
- [ ] Ads displaying

---

## Quick Reference Commands

```bash
# Setup
npm install

# Development
npm run dev
npm run build
npm run preview

# Debugging
npm run build  # Check for errors
tsc --noEmit   # TypeScript check
npm audit      # Security check

# Docker
docker build -t converter .
docker run -p 3000:3000 converter

# Git
git status
git add .
git commit -m "message"
git push
```

---

## Still Stuck?

1. **Read the docs**: README.md, QUICKSTART.md
2. **Check console**: F12 → Console tab
3. **Google error**: Copy-paste exact error
4. **Try examples**: Test with provided samples
5. **Ask for help**: Include error message + steps

---

**Most common issues are resolved by**:
1. `npm cache clean --force && npm install`
2. Restarting dev server
3. Clearing browser cache
4. Checking browser console for errors

Good luck! 🚀
