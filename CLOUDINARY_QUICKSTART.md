# Quick Start: Cloudinary Integration

## 🚀 Get Your Credentials (5 minutes)

1. Go to: https://cloudinary.com/users/register_free
2. Sign up (free account)
3. Copy from dashboard:
   - Cloud Name
   - API Key  
   - API Secret

## 📝 Update Configuration

### Local Development
Edit `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=paste_here
CLOUDINARY_API_KEY=paste_here
CLOUDINARY_API_SECRET=paste_here
```

### Render (Production)
1. Go to: https://dashboard.render.com
2. Click your backend service
3. Go to "Environment" tab
4. Add these 3 variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Save (auto-redeploys)

## ✅ Test It

```powershell
# Start backend
cd backend
npm start

# Start frontend (new terminal)
cd frontend
npm start

# Go to admin panel
# Upload a vehicle with images
# Check Cloudinary dashboard → Media Library
```

## 📦 Deploy

```bash
# Commit changes
git add .
git commit -m "Add Cloudinary integration"
git push origin main

# Deploy frontend
cd frontend
.\deploy.ps1
```

## 🎯 What You Get

- ✅ Images persist after server restarts
- ✅ Fast CDN delivery worldwide
- ✅ 25GB storage free
- ✅ Auto image optimization
- ✅ No more "images disappearing" issue!

## 📖 Full Guide

See [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) for complete documentation.
