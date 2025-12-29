# 🚀 Deployment Guide - SV Travels

This guide will walk you through deploying your SV Travels application:
- **Backend**: Render
- **Frontend**: GitHub Pages
- **Database**: MongoDB Atlas

---

## 📋 Prerequisites

- Git installed and configured
- GitHub account
- Render account (free tier available at https://render.com)
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

---

## 1️⃣ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in
2. Click **"Build a Database"**
3. Choose **FREE** tier (M0 Sandbox)
4. Select your preferred cloud provider and region
5. Name your cluster (e.g., `sv-travels-cluster`)
6. Click **"Create"**

### Step 2: Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Set username and password (save these!)
5. Set privileges to **"Read and write to any database"**
6. Click **"Add User"**

### Step 3: Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for deployment)
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add database name: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/sv-travels`

---

## 2️⃣ Backend Deployment on Render

### Step 1: Prepare Backend

1. Make sure your backend code is pushed to GitHub
2. Ensure `package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Step 2: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository containing your project
5. Configure the service:
   - **Name**: `sv-travels-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables

In Render service settings, go to **"Environment"** and add:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/sv-travels
JWT_SECRET=your_very_secure_random_secret_key_min_32_characters_long
JWT_EXPIRE=30d
FRONTEND_URL=https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME
CLOUDINARY_CLOUD_NAME=your_cloud_name (if using Cloudinary)
CLOUDINARY_API_KEY=your_api_key (if using Cloudinary)
CLOUDINARY_API_SECRET=your_api_secret (if using Cloudinary)
CONTACT_PHONE=+91-7780720178
WHATSAPP_NUMBER=917780720178
CONTACT_EMAIL=info@svtravels.com
OFFICE_ADDRESS=Your office address
```

**Important**: 
- Replace MongoDB URI with your actual Atlas connection string
- Generate a strong JWT_SECRET (min 32 characters)
- Update FRONTEND_URL after frontend deployment

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (usually 2-5 minutes)
3. Your backend will be available at: `https://your-app-name.onrender.com`

### Step 5: Test Backend

Visit `https://your-app-name.onrender.com/api/health` to verify it's working.

---

## 3️⃣ Frontend Deployment on GitHub Pages

### Step 1: Update Frontend Configuration

1. Open `frontend/package.json`
2. Update the `homepage` field with your GitHub username and repository name:
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME"
   ```

### Step 2: Update Environment Variables

1. Edit `frontend/.env.production`:
   ```
   REACT_APP_API_URL=https://your-app-name.onrender.com/api
   ```
   Replace with your actual Render backend URL

### Step 3: Install Dependencies

```bash
cd frontend
npm install
```

### Step 4: Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:
1. Build your React app
2. Create a `gh-pages` branch
3. Push the build to GitHub Pages

### Step 5: Configure GitHub Repository

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 6: Wait for Deployment

- GitHub Pages deployment usually takes 1-5 minutes
- Your site will be available at: `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME`

---

## 4️⃣ Update Backend CORS Settings

After frontend deployment, update Render environment variables:

1. Go to your Render service dashboard
2. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://YOUR_GITHUB_USERNAME.github.io
   ```
3. Save and wait for automatic redeployment

---

## 5️⃣ Testing & Verification

### Test Backend
- Health check: `https://your-app-name.onrender.com/api/health`
- Should return: `{"status":"OK","message":"SV Travels API is running"}`

### Test Frontend
1. Visit your GitHub Pages URL
2. Navigate through all pages
3. Test admin login (default credentials from createDefaultAdmin.js)
4. Test vehicle management
5. Test enquiry forms

### Test Database
1. Login to MongoDB Atlas
2. Go to **Collections**
3. Verify data is being saved

---

## 6️⃣ Post-Deployment Tasks

### Update Admin Credentials
```bash
cd backend
node updateAdmin.js
```

### Monitor Application
- **Render**: Check logs in Render dashboard
- **MongoDB**: Monitor in Atlas dashboard
- **Frontend**: Check browser console for errors

### Enable HTTPS (Already enabled on both platforms)
- Render automatically provides SSL
- GitHub Pages automatically provides SSL

---

## 🔧 Common Issues & Solutions

### Issue: CORS Error
**Solution**: Verify `FRONTEND_URL` in Render matches your GitHub Pages URL exactly

### Issue: API calls failing
**Solution**: 
- Check `.env.production` has correct backend URL
- Rebuild and redeploy frontend: `npm run deploy`

### Issue: MongoDB connection error
**Solution**: 
- Verify connection string in Render environment variables
- Check MongoDB Atlas network access allows all IPs
- Verify database user credentials

### Issue: GitHub Pages shows blank page
**Solution**: 
- Check `homepage` in `package.json` is correct
- Ensure `BrowserRouter` has `basename` prop (if needed):
  ```jsx
  <BrowserRouter basename="/YOUR_REPO_NAME">
  ```

### Issue: Render service sleeping (free tier)
**Solution**: Free tier sleeps after inactivity. First request may take 30-60 seconds.

---

## 📝 Environment Variables Summary

### Backend (.env on Render)
```
PORT=5000
MONGODB_URI=<your-atlas-connection-string>
JWT_SECRET=<secure-random-string>
JWT_EXPIRE=30d
FRONTEND_URL=<your-github-pages-url>
```

### Frontend (.env.production)
```
REACT_APP_API_URL=<your-render-backend-url>/api
```

---

## 🚀 Redeployment

### Backend (Render)
- Automatic: Push to GitHub branch (if auto-deploy enabled)
- Manual: Click "Deploy Latest Commit" in Render dashboard

### Frontend (GitHub Pages)
```bash
cd frontend
npm run deploy
```

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [React Deployment Documentation](https://create-react-app.dev/docs/deployment/)

---

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed to Render
- [ ] Backend environment variables configured
- [ ] Backend health check returns success
- [ ] Frontend package.json updated with homepage
- [ ] Frontend .env.production configured
- [ ] Frontend deployed to GitHub Pages
- [ ] Frontend can communicate with backend
- [ ] Admin login works
- [ ] Vehicle management works
- [ ] Enquiry forms work
- [ ] Images upload correctly (if using Cloudinary)

---

**🎉 Congratulations! Your SV Travels application is now live!**

For support or issues, check the logs:
- **Backend logs**: Render dashboard → Your service → Logs
- **Frontend errors**: Browser Developer Console (F12)
- **Database**: MongoDB Atlas → Collections

