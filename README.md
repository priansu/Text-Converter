# Text Case Converter - Production Ready Website

A modern, responsive web application that converts text to multiple case formats instantly. Built with React, TypeScript, and Vite for production deployment.

## Features

### Text Transformations
- **Sentence Case** - First letter uppercase, rest lowercase
- **lowercase** - All letters lowercase
- **UPPERCASE** - All letters uppercase
- **Capitalized Case** - Every word capitalized
- **Title Case** - Capitalize words, skip small words (articles, prepositions)
- **aLtErNaTiNg CaSe** - Alternate between upper and lowercase
- **InVeRsE CaSe** - Swap case of each letter
- **camelCase** - First word lowercase, then capitalized
- **snake_case** - Words separated by underscores
- **kebab-case** - Words separated by hyphens
- **dot.case** - Words separated by dots
- **Reverse** - Reverse the entire text
- **No Spaces** - Remove all spaces

### Additional Features
- Real-time text conversion
- Word and character count statistics
- One-click copy functionality with visual feedback
- Google AdSense integration (top banner and sidebar)
- Responsive design for mobile, tablet, and desktop
- Production-optimized build configuration
- Beautiful gradient UI with smooth animations

## Tech Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript 5.3
- **Build Tool**: Vite 5.0
- **Package Manager**: npm

## Project Structure

```
Project-1/
├── src/
│   ├── components/
│   │   ├── CaseConverter.tsx    # Main converter component
│   │   ├── OutputBox.tsx        # Individual output display
│   │   ├── AdSenseTop.tsx       # Top banner ads
│   │   └── AdSenseSidebar.tsx   # Sidebar ads
│   ├── utils/
│   │   └── textTransformations.ts  # Text transformation functions
│   ├── app.tsx                  # Root application component
│   └── main.tsx                 # Entry point
├── index.html                   # HTML template
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                    # This file
```

## Installation

1. Navigate to the project directory:
```bash
cd Project-1
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Building for Production

Create an optimized production build:
```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Google AdSense Integration

The application includes placeholder spaces for Google AdSense ads:

### To Enable AdSense:

1. Get your AdSense publisher ID (format: `ca-pub-xxxxxxxxxxxxxxxx`)

2. Update the publisher ID in the following files:
   - `src/components/AdSenseTop.tsx` - Replace `ca-pub-xxxxxxxxxxxxxxxx` in `data-ad-client`
   - `src/components/AdSenseSidebar.tsx` - Replace `ca-pub-xxxxxxxxxxxxxxxx` in `data-ad-client`

3. Update ad slot IDs if using specific ad slots:
   - Replace `xxxxxxxxxxxxxxxx` in `data-ad-slot` attributes

4. Add the AdSense script to `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
     crossorigin="anonymous"></script>
```

## Performance Optimizations

- **Minified Build**: Production build uses Terser for minification
- **Source Maps**: Disabled in production for smaller bundle size
- **Code Splitting**: Automatic with Vite
- **Asset Optimization**: Vite handles asset optimization automatically

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## SEO

The application includes:
- Descriptive meta tags
- Semantic HTML structure
- Optimized page title
- Keywords optimization

## Deployment

### Deploying to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Deploying to Vercel
1. Import your project from GitHub
2. Vercel auto-detects Vite configuration
3. Deploy!

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build -t text-case-converter .
docker run -p 3000:3000 text-case-converter
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## Future Enhancements

- [ ] Unicode and emoji support
- [ ] Text statistics (reading time, sentiment analysis)
- [ ] Custom case converter
- [ ] Batch processing
- [ ] API endpoint for programmatic access
- [ ] Dark mode theme
- [ ] Keyboard shortcuts
- [ ] Export functionality (PDF, CSV)

## Support

For issues or questions, please open an issue in the repository.
