# 246 N 3rd St Property Portal - Deployment & Sharing Guide

## 🚀 Quick Deployment to Vercel (Recommended)

### Option 1: One-Click Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import this Git repository or upload the project folder
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy" - your site will be live in ~2 minutes
6. You'll get a URL like: `https://246-n-3rd-property-portal.vercel.app`

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project directory
cd /Users/homebase/Desktop/1.CONDO

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

## 🔗 Sharing the Portal

### Access Information
- **Portal URL**: `https://your-deployed-url.vercel.app`
- **Password**: `246n3rd`
- **Users**: Stephen Boerner, Melissa Bemer, and Realtor

### What Others Will See
1. **Password Protection**: Secure single-field entry
2. **Property Overview**: Complete financial and market summary
3. **Market Analysis**: Philadelphia condo comparables and trends
4. **Financial Tools**: Break-even calculators and cost analysis
5. **Document Management**: Upload/organize PECO bills, HOA payments, legal docs
6. **Intelligent Features**: Auto-renaming of uploaded documents

## 📱 Local Development (For Updates)

### Start Development Server
```bash
cd /Users/homebase/Desktop/1.CONDO
npm run dev
```
- Local URL: `http://localhost:3000`
- Auto-reloads on file changes

### Build for Production
```bash
npm run build
npm start
```

## 🌐 Alternative Deployment Options

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Auto-deploys on push

### DigitalOcean App Platform
1. Go to [digitalocean.com/products/app-platform](https://digitalocean.com/products/app-platform)
2. Connect repository
3. Configure as Node.js app

## 🔒 Security Features

- **Password Protection**: Single field entry prevents unauthorized access
- **Session-based Authentication**: Secure browser session management
- **No External Dependencies**: All data stored locally in browser
- **HTTPS**: Automatic SSL certificates on Vercel

## 📊 Portal Features Overview

### Dashboard Sections
1. **Overview**: Property summary and quick actions
2. **Market Analysis**: Comparable properties and market trends
3. **Financial Tools**: Break-even analysis and calculators
4. **Documents**: Upload, organize, and manage property documents
5. **HOA Tracking**: Payment history and delinquency monitoring
6. **Financial Separation**: Divorce-related financial tracking
7. **AI Assistant**: Perplexity-powered Q&A system

### Key Capabilities
- **Intelligent Document Renaming**: Auto-standardizes file names
- **Financial Calculations**: Break-even analysis with real costs
- **Market Data**: Philadelphia condo market insights
- **Document Organization**: Categorized by type (PECO, HOA, Legal, etc.)
- **Payment Tracking**: Due dates, amounts, and status monitoring

## 🎯 Sharing Instructions for Recipients

### For Stephen, Melissa & Realtor:
1. **Access the Portal**: Visit the provided URL
2. **Enter Password**: Type `246n3rd` and click "Access Portal"
3. **Navigate Sections**: Use the top navigation tabs
4. **Upload Documents**: Drag & drop files in the Documents section
5. **View Analysis**: Check Market Analysis for comparable properties
6. **Use Calculators**: Financial Tools section for break-even analysis

### Mobile Access
- Fully responsive design works on phones and tablets
- Same URL and password work across all devices
- Touch-friendly interface for mobile users

## 🔧 Customization Options

### Update Property Information
Edit `app/components/Dashboard.tsx` to modify:
- Property address and details
- Owner names
- Financial figures
- Market data

### Change Password
Edit `app/page.tsx` line with password check:
```javascript
if (password === '246n3rd') // Change this password
```

### Modify Styling
Edit `app/globals.css` and `tailwind.config.js` for:
- Color scheme changes
- Layout modifications
- Typography updates

## 📞 Support

For technical issues or updates:
- Check deployment logs in Vercel dashboard
- Redeploy if needed via Vercel interface
- Contact developer for major modifications

---

**Ready to Share**: Once deployed, simply share the URL and password `246n3rd` with Stephen, Melissa, and the realtor for immediate access to the comprehensive property collaboration portal.