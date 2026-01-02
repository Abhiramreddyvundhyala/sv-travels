# Cloudinary Integration Guide for SV Travels

## Overview
Your application now uses Cloudinary for image storage instead of local file storage. This solves the file persistence issue on Render's free tier.

## What Changed

### Backend Changes
1. ✅ Installed `cloudinary` and `multer-storage-cloudinary` packages
2. ✅ Created `/backend/config/cloudinary.js` configuration
3. ✅ Updated `/backend/middleware/upload.js` to use Cloudinary
4. ✅ Modified `/backend/routes/vehicleRoutes.js` to:
   - Store Cloudinary URLs instead of local paths
   - Delete images from Cloudinary when vehicles are deleted
5. ✅ Added Cloudinary credentials to `.env` file

### Frontend Changes
1. ✅ Updated `/frontend/src/pages/public/Fleet.js` to handle Cloudinary URLs
2. ✅ Updated `/frontend/src/pages/admin/VehicleManagement.js` for Cloudinary URLs

## Setup Instructions

### Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Click "Sign Up for Free"
3. Create your account (free tier includes 25GB storage & 25GB bandwidth/month)
4. Verify your email

### Step 2: Get Cloudinary Credentials

1. Log into Cloudinary Dashboard
2. You'll see your credentials on the main dashboard:
   - **Cloud Name**: e.g., `dxxxxxx`
   - **API Key**: e.g., `123456789012345`
   - **API Secret**: e.g., `abcdefghijklmnopqrstuvwxyz`

### Step 3: Update Backend Environment Variables

#### For Local Development
Edit `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

#### For Render Deployment
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add these environment variables:
   ```
   CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
   CLOUDINARY_API_KEY=your_actual_api_key
   CLOUDINARY_API_SECRET=your_actual_api_secret
   ```
5. Click "Save Changes"
6. Render will automatically redeploy

### Step 4: Test Locally

1. **Start Backend** (with updated .env):
   ```powershell
   cd backend
   npm start
   ```

2. **Start Frontend**:
   ```powershell
   cd frontend
   npm start
   ```

3. **Test Image Upload**:
   - Go to `http://localhost:3000/admin`
   - Login with admin credentials
   - Go to Vehicle Management
   - Add a new vehicle with images
   - Images should upload to Cloudinary

4. **Verify on Cloudinary**:
   - Go to Cloudinary Dashboard → Media Library
   - You should see your uploaded images in `sv-travels/vehicles` folder

### Step 5: Deploy to Production

#### Deploy Backend to Render
```bash
git add .
git commit -m "Integrated Cloudinary for image storage"
git push origin main
```
Render will automatically deploy with the new environment variables.

#### Deploy Frontend to GitHub Pages
```powershell
cd frontend
.\deploy.ps1
```

## How It Works

### Image Upload Flow
```
User uploads image → Multer processes → Cloudinary Storage → 
Image saved to cloud → Cloudinary URL returned → URL saved in MongoDB
```

### Image URLs
Old (Local): `/uploads/vehicles/vehicle-1234567890.jpg`
New (Cloudinary): `https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sv-travels/vehicles/abc123.jpg`

### Frontend URL Handling
The `getImageUrl()` function in Fleet.js now:
1. Checks if URL starts with `http` (Cloudinary URL)
2. If yes, returns URL as-is
3. If no, constructs local path (for backward compatibility)

## Benefits

✅ **Persistent Storage**: Images survive server restarts
✅ **CDN Delivery**: Fast image loading worldwide
✅ **Automatic Optimization**: Cloudinary optimizes images
✅ **Transformations**: Resize/crop images on-the-fly
✅ **25GB Free**: Generous free tier

## Image Transformations

Cloudinary automatically applies these transformations (configured in `cloudinary.js`):
- Max width: 1200px
- Max height: 900px
- Quality: Auto-optimized
- Format: Original (jpg, png, webp)

## Troubleshooting

### Issue: "Invalid Cloudinary credentials"
**Solution**: Double-check your credentials in `.env` and Render environment variables

### Issue: "Cannot find module 'cloudinary'"
**Solution**: Run `npm install` in backend directory

### Issue: Images not uploading
**Solution**: 
1. Check Cloudinary dashboard for upload quota
2. Verify credentials are correct
3. Check browser console for errors
4. Check backend logs

### Issue: Old images still showing local paths
**Solution**: This is normal. Old vehicles will have local paths. New uploads will use Cloudinary. You can:
- Re-upload images for old vehicles via admin panel
- Or keep both systems working (the code supports both)

## Cloudinary Dashboard

Access your images at:
- Dashboard: https://cloudinary.com/console
- Media Library: https://cloudinary.com/console/media_library

### Folder Structure
```
sv-travels/
  └── vehicles/
      ├── image1.jpg
      ├── image2.jpg
      └── ...
```

## Managing Images

### View Images
Go to Cloudinary Dashboard → Media Library → sv-travels/vehicles

### Delete Images
Images are automatically deleted when:
- A vehicle is deleted
- An individual image is removed from a vehicle

### Manual Cleanup
If needed, you can manually delete images from Cloudinary dashboard.

## Cost Considerations

### Free Tier Limits (per month):
- 25 GB Storage
- 25 GB Bandwidth
- 25,000 Transformations

### Usage Estimate for SV Travels:
- ~50 vehicles × 3 images × 500KB = ~75MB storage
- Well within free tier limits!

## Environment Variables Reference

### Development (.env)
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Production (Render)
Add same variables in Render dashboard under "Environment" tab.

## Next Steps

1. ✅ Sign up for Cloudinary (if not done)
2. ✅ Get your credentials
3. ✅ Update `backend/.env` file
4. ✅ Update Render environment variables
5. ✅ Test locally
6. ✅ Commit and push changes
7. ✅ Verify production deployment

## Support

- Cloudinary Docs: https://cloudinary.com/documentation
- Cloudinary Support: https://support.cloudinary.com
- Your implementation: See `backend/config/cloudinary.js`

---

**Status**: ✅ Cloudinary integration complete! Update your credentials to start using it.
