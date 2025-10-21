# Open Graph Image Generation Instructions

## Issue
The website metadata is not showing when sharing URLs because the `og-image.png` file is missing from `/public/og-image.png`.

## Solution
1. **Use the HTML file**: Open `/public/og-image.html` in a browser
2. **Take a screenshot**: Use browser dev tools or screenshot tool to capture at 1200x630px
3. **Save as PNG**: Save the screenshot as `og-image.png` in the `/public/` directory

## Alternative Methods

### Method 1: Browser Screenshot
1. Open `http://localhost:3000/og-image.html` in Chrome
2. Right-click → Inspect → Toggle device toolbar
3. Set dimensions to 1200x630
4. Take screenshot and save as `og-image.png`

### Method 2: Online OG Image Generator
Use services like:
- https://www.canva.com/create/facebook-posts/
- https://og-image.vercel.app/
- https://www.opengraph.xyz/

### Method 3: Command Line (if you have tools installed)
```bash
# Using puppeteer (if installed)
npx puppeteer screenshot --width=1200 --height=630 file:///path/to/og-image.html og-image.png
```

## File Requirements
- **Dimensions**: 1200x630 pixels
- **Format**: PNG
- **Location**: `/public/og-image.png`
- **Content**: Should match the design in og-image.html

## After Creating the Image
1. Place the `og-image.png` file in `/public/`
2. Test the metadata using:
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Current Status
✅ Metadata configuration complete in `app/layout.tsx`
❌ Missing og-image.png file
✅ HTML template created at `/public/og-image.html`
