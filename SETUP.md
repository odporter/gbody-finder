# G-Body Finder - Setup Instructions

## eBay API Setup (for real listings with images)

1. **Go to https://developer.ebay.com/**
2. **Sign in** with your eBay account (create one if needed)
3. **Create an Application:**
   - Click "Application Keys" in the left menu
   - Click "Create an Application"
   - Name it "G-Body Finder" or similar
4. **Get your App ID:**
   - After creating, you'll see "App ID (Client ID)"
   - Copy that value
5. **Add to your environment:**
   - Create `.env.local` file in the project root:
   ```
   EBAY_APP_ID=your-app-id-here
   ```
   - Or add to Vercel Environment Variables:
   - Go to your project → Settings → Environment Variables
   - Add: `EBAY_APP_ID` = `your-app-id-here`

## How it works

- **With eBay App ID:** Real listings with images, prices, conditions pulled from eBay Motors
- **Without eBay App ID:** Links to search results on each platform

## Deploy to Vercel

1. Push to GitHub (done)
2. Import in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Add Domain

1. In Vercel, go to Settings → Domains
2. Add `gbodyfinder.com`
3. In GoDaddy DNS:
   - A record @ → 76.76.21.21
   - CNAME www → cname.vercel-dns.com