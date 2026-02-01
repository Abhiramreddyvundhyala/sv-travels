# 🚀 PRODUCTION DEPLOYMENT GUIDE
## SV Travels - Complete Deployment to GitHub Pages + Custom Domain

**Last Updated:** February 1, 2026  
**Status:** ✅ Production Ready

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### ✅ Backend (Already Completed)
- [x] Security middleware installed (Helmet, Rate Limiting)
- [x] Input validation enhanced
- [x] Console.logs cleaned up
- [x] Database indexes added
- [x] NoSQL injection prevention
- [x] Request size limits set
- [x] Graceful shutdown implemented
- [x] CORS properly configured
- [x] Admin registration disabled in production

### ⚠️ TO DO BEFORE DEPLOYMENT
- [ ] Install backend dependencies: `cd backend && npm install`
- [ ] Set NODE_ENV=production in backend hosting
- [ ] Deploy backend to Render/Railway/Heroku
- [ ] Update frontend .env.production with backend URL
- [ ] Build frontend: `cd frontend && npm run build`
- [ ] Deploy to GitHub Pages
- [ ] Configure custom domain DNS in Hostinger
- [ ] Test all features after deployment

---

## 🔧 STEP 1: INSTALL BACKEND DEPENDENCIES

```bash
cd backend
npm install
```

**New security packages added:**
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `express-mongo-sanitize` - NoSQL injection prevention
- `hpp` - HTTP parameter pollution prevention

---

## 🌐 STEP 2: DEPLOY BACKEND

### Option A: Deploy to Render.com (Recommended - Free Tier)

1. **Go to** https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository** `sv-travels`
5. **Configure:**
   ```
   Name: sv-travels-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

6. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://svtravelsadmin:YOUR_PASSWORD@cluster.mongodb.net/sv-travels
   JWT_SECRET=sv_travels_super_secret_key_2024_production_environment
   JWT_EXPIRE=30d
   FRONTEND_URL=https://svtravels.online
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

7. **Click "Create Web Service"**
8. **Wait 5-10 minutes** for deployment
9. **Copy your backend URL** (e.g., `https://sv-travels-backend.onrender.com`)

---

## 📱 STEP 3: UPDATE FRONTEND ENVIRONMENT

Edit `frontend/.env.production`:

```env
# Backend API URL (Use your Render.com URL from Step 2)
REACT_APP_API_URL=https://sv-travels-backend.onrender.com/api

# EmailJS Configuration (Keep these same)
REACT_APP_EMAILJS_SERVICE_ID=service_mxg6tps
REACT_APP_EMAILJS_TEMPLATE_ID=template_3j6k3dv
REACT_APP_EMAILJS_PUBLIC_KEY=cIn5E9re4ZhZL5omx
```

---

## 🏗️ STEP 4: BUILD FRONTEND

```bash
cd frontend
npm install
npm run build
```

This creates an optimized production build in `frontend/build/` directory.

---

## 📤 STEP 5: DEPLOY TO GITHUB PAGES

### Method 1: Using gh-pages (Automatic)

```bash
cd frontend
npm run deploy
```

This will automatically:
- Build the production version
- Push to `gh-pages` branch
- Deploy to GitHub Pages

### Method 2: Manual Deployment

```bash
cd frontend
npm run build
git add build/
git commit -m "Production build"
git subtree push --prefix frontend/build origin gh-pages
```

---

## 🌍 STEP 6: CONFIGURE CUSTOM DOMAIN IN HOSTINGER

### A. In Hostinger DNS Settings:

1. **Login to Hostinger** → Domains → svtravels.online → DNS Zone
2. **Add/Update A Records:**
   ```
   Type: A
   Name: @
   Points to: 185.199.108.153
   TTL: 3600

   Type: A
   Name: @
   Points to: 185.199.109.153
   TTL: 3600

   Type: A
   Name: @
   Points to: 185.199.110.153
   TTL: 3600

   Type: A
   Name: @
   Points to: 185.199.111.153
   TTL: 3600
   ```

3. **Add CNAME Record for www:**
   ```
   Type: CNAME
   Name: www
   Points to: Abhiramreddyvundhyala.github.io
   TTL: 3600
   ```

4. **Save Changes**

### B. In GitHub Repository Settings:

1. Go to your GitHub repository: `https://github.com/Abhiramreddyvundhyala/sv-travels`
2. Click **Settings** → **Pages**
3. Under "Custom domain", enter: `svtravels.online`
4. Check **"Enforce HTTPS"** (wait 24 hours for SSL certificate)
5. Click **Save**

---

## ⏳ STEP 7: WAIT FOR DNS PROPAGATION

DNS changes can take **15 minutes to 48 hours** to propagate globally.

**Check DNS propagation:**
- https://dnschecker.org/
- Enter: `svtravels.online`
- Should show GitHub IPs

---

## ✅ STEP 8: VERIFY DEPLOYMENT

### Test Backend:
```bash
curl https://sv-travels-backend.onrender.com/api/health
# Should return: {"status":"OK","message":"SV Travels API is running"}
```

### Test Frontend:
1. Visit: `https://svtravels.online`
2. Test all pages
3. Test booking form submission
4. Test admin login: `https://svtravels.online/admin/login`
   - Email: `svtravelsonline@gmail.com`
   - Password: `admin123`

---

## 🔒 POST-DEPLOYMENT SECURITY

### CRITICAL: Change Default Admin Password

1. Login to admin panel
2. Go to Settings → Change Password
3. Use a strong password (20+ characters)

### Recommended: Regenerate API Keys

**EmailJS:**
1. Go to https://emailjs.com
2. Regenerate Service ID and API keys
3. Update in backend `.env` and frontend `.env.production`
4. Rebuild and redeploy

**Cloudinary:**
1. Go to https://cloudinary.com
2. Regenerate API credentials
3. Update in backend `.env`
4. Restart backend

---

## 📊 MONITORING & MAINTENANCE

### Setup Error Monitoring (Optional but Recommended)

**Sentry.io** (Free tier available):
```bash
npm install @sentry/node @sentry/react
```

Add to `backend/server.js`:
```javascript
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
```

### Database Backups

**MongoDB Atlas** (Automatic backups):
1. Login to MongoDB Atlas
2. Clusters → Backup
3. Enable continuous backups (Paid feature)
4. Or use manual exports weekly

---

## 🐛 TROUBLESHOOTING

### Issue: "Cannot connect to backend"
**Solution:**
- Check backend is deployed and running on Render
- Verify `REACT_APP_API_URL` in frontend/.env.production
- Check CORS settings in backend/server.js

### Issue: "Custom domain not working"
**Solution:**
- Wait 24-48 hours for DNS propagation
- Verify DNS settings in Hostinger
- Check GitHub Pages settings
- Clear browser cache

### Issue: "HTTPS not working"
**Solution:**
- Wait 24 hours after adding custom domain
- Ensure "Enforce HTTPS" is checked in GitHub Pages
- Verify DNS records are correct

### Issue: "Admin login fails"
**Solution:**
- Check backend logs on Render
- Verify MongoDB connection string
- Check JWT_SECRET is set in backend environment

### Issue: "Images not loading"
**Solution:**
- Verify Cloudinary credentials
- Check image URLs in database
- Ensure CORS allows Cloudinary domain

---

## 📝 ENVIRONMENT VARIABLES REFERENCE

### Backend (.env in backend folder - NOT COMMITTED)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_minimum_32_chars
JWT_EXPIRE=30d
FRONTEND_URL=https://svtravels.online
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_EMAILJS_SERVICE_ID=service_xxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxx
```

---

## 🎯 QUICK DEPLOYMENT COMMANDS

```bash
# Backend (First time setup on Render.com via web interface)
# Then update code:
git push origin main  # Auto-deploys on Render

# Frontend
cd frontend
npm run build
npm run deploy

# Or manual:
git add .
git commit -m "Update frontend"
git push origin main
git subtree push --prefix frontend/build origin gh-pages
```

---

## 📞 SUPPORT

**Issues?** 
- Backend logs: Check Render.com dashboard → Logs
- Frontend: Check browser console (F12)
- Email: svtravelsonline@gmail.com

---

## ✨ DEPLOYMENT COMPLETE!

Your application is now:
- ✅ Deployed on GitHub Pages with custom domain
- ✅ Backend on Render.com (or your chosen platform)
- ✅ Production-ready with security hardening
- ✅ Rate-limited and protected
- ✅ Optimized for performance
- ✅ Using HTTPS (SSL)

**Live URLs:**
- **Website:** https://svtravels.online
- **Admin:** https://svtravels.online/admin/login
- **Backend API:** https://your-backend.onrender.com/api

**Next Steps:**
1. Monitor error rates and performance
2. Set up automated backups
3. Add Google Analytics (optional)
4. Add uptime monitoring (uptimerobot.com - Free)
5. Regularly update dependencies

---

**🎉 Congratulations! Your application is LIVE!**
