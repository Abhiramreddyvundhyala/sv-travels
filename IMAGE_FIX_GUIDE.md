# Image Loading Fix Guide

## Problem
Images display correctly on localhost but fail to load when deployed to GitHub Pages and Render.

## Root Cause
GitHub Pages cannot read `.env` files. Environment variables must be set during the build process, not at runtime.

## Solution Applied

### 1. Updated Deployment Scripts
Both `deploy.ps1` and `deploy.sh` have been updated to set environment variables before building:

**For Windows (deploy.ps1):**
```powershell
$env:REACT_APP_API_URL="https://sv-travels-backend.onrender.com/api"
```

**For Linux/Mac (deploy.sh):**
```bash
export REACT_APP_API_URL="https://sv-travels-backend.onrender.com/api"
```

### 2. Backend Configuration
Your backend is correctly configured to:
- Serve static files from `/uploads` directory
- Allow CORS from your GitHub Pages domain
- Store image paths as `/uploads/vehicles/filename.jpg`

### 3. Image URL Construction
The Fleet.js `getImageUrl()` function:
```javascript
const baseUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace('/api', '');
const imageUrl = `${baseUrl}${imagePath}`;
```

This constructs URLs like:
- Local: `http://localhost:5000/uploads/vehicles/image.jpg`
- Production: `https://sv-travels-backend.onrender.com/uploads/vehicles/image.jpg`

## How to Deploy with Images Working

### Step 1: Ensure Backend is Deployed
Make sure your Render backend is running at:
```
https://sv-travels-backend.onrender.com
```

Test it:
```bash
curl https://sv-travels-backend.onrender.com/api/health
```

### Step 2: Deploy Frontend to GitHub Pages
```powershell
cd frontend
.\deploy.ps1
```

Or on Linux/Mac:
```bash
cd frontend
chmod +x deploy.sh
./deploy.sh
```

### Step 3: Verify Deployment
1. Wait 1-5 minutes for GitHub Pages to update
2. Visit: `https://Abhiramreddyvundhyala.github.io/sv-travels`
3. Navigate to Fleet page
4. Open browser DevTools (F12) → Network tab
5. Check image requests

## Troubleshooting

### Images Still Not Loading?

#### Check 1: Verify Backend URL
Open browser console on your deployed site:
```javascript
console.log(process.env.REACT_APP_API_URL)
```
Should show: `https://sv-travels-backend.onrender.com/api`

#### Check 2: Verify Image URLs
In DevTools Network tab, check what URLs are being requested.
Should be: `https://sv-travels-backend.onrender.com/uploads/vehicles/[filename]`

#### Check 3: CORS Issues
If you see CORS errors, verify backend `server.js` includes:
```javascript
const allowedOrigins = [
  'https://abhiramreddyvundhyala.github.io',
  // ... other origins
];
```

#### Check 4: Verify Images Exist on Backend
1. Log into admin panel: `https://Abhiramreddyvundhyala.github.io/sv-travels/admin`
2. Go to Vehicle Management
3. Upload vehicle images
4. Verify images are saved to Render's `/uploads/vehicles/` directory

#### Check 5: Render File Persistence
⚠️ **Important**: Render's free tier doesn't persist uploaded files after restart!

**Solutions:**
- Upgrade to Render paid plan with persistent disk
- Use cloud storage (AWS S3, Cloudinary, etc.)
- Store images in MongoDB as base64 (not recommended for production)

## Quick Fix Checklist

- [ ] Backend is deployed and running on Render
- [ ] Backend URL is correct in deploy scripts
- [ ] CORS is configured for GitHub Pages domain
- [ ] Images are uploaded via admin panel
- [ ] Deploy script sets environment variables
- [ ] Build process completed successfully
- [ ] GitHub Pages updated (wait 1-5 minutes)

## Test Image Loading

### Test Backend Directly
```bash
curl https://sv-travels-backend.onrender.com/api/vehicles
```

This should return JSON with image paths like:
```json
{
  "images": ["/uploads/vehicles/1234567890.jpg"]
}
```

### Test Image Access
```bash
curl -I https://sv-travels-backend.onrender.com/uploads/vehicles/[filename].jpg
```

Should return `HTTP 200 OK` if image exists.

## Alternative: Use External Image Hosting

If Render file persistence is an issue, modify Vehicle model to accept external URLs:

1. Upload images to Cloudinary/ImgBB/etc.
2. Store full URLs in database
3. `getImageUrl()` will detect `http` and return URL directly

```javascript
const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/400x300?text=Vehicle';
  if (imagePath.startsWith('http')) return imagePath; // External URL
  // ... rest of code
};
```

## Need Help?

If images still don't load after following this guide:
1. Check browser console for errors
2. Check Network tab for failed requests  
3. Verify backend is accessible
4. Confirm images exist in backend uploads folder
