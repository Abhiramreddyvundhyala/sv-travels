# Quick Deployment Checklist for svtravels.online

## ✅ Pre-Deployment Checklist

### Files Already Configured ✓
- [x] `frontend/public/CNAME` - Created with `svtravels.online`
- [x] `frontend/package.json` - Homepage set to `https://svtravels.online`
- [x] `frontend/.env.production` - API URL and EmailJS configured
- [x] `backend/server.js` - CORS configured for multiple origins including custom domain
- [x] Backend models and settings updated with correct contact info
- [x] EmailJS credentials configured

## 🚀 Deployment Steps

### Step 1: Deploy Frontend to GitHub Pages

```bash
cd frontend
npm install
npm run deploy
```

This will:
- Build the React app
- Deploy to `gh-pages` branch
- Include the CNAME file automatically

### Step 2: Configure GitHub Pages

1. Go to your GitHub repository: `https://github.com/Abhiramreddyvundhyala/sv-travels`
2. Click **Settings** → **Pages**
3. Under **Source**, select branch: `gh-pages`, folder: `/ (root)`
4. Click **Save**

### Step 3: Add Custom Domain in GitHub

1. Still in GitHub Pages settings
2. Under **Custom domain**, enter: `svtravels.online`
3. Click **Save**
4. Wait a moment, then check **Enforce HTTPS**

### Step 4: Configure DNS at Domain Registrar

Log in to where you bought `svtravels.online` and add these DNS records:

#### A Records (for root domain)
```
Type: A,    Name: @,    Value: 185.199.108.153
Type: A,    Name: @,    Value: 185.199.109.153
Type: A,    Name: @,    Value: 185.199.110.153
Type: A,    Name: @,    Value: 185.199.111.153
```

#### CNAME Record (for www subdomain)
```
Type: CNAME,    Name: www,    Value: abhiramreddyvundhyala.github.io
```

### Step 5: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `sv-travels-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Root Directory**: `backend`

5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=sv_travels_super_secret_key_2024_production_environment
   JWT_EXPIRE=30d
   FRONTEND_URL=https://svtravels.online
   NODE_ENV=production
   ```

6. Click **Create Web Service**

### Step 6: Update Frontend with Backend URL

After backend is deployed, you'll get a URL like:
`https://sv-travels-backend.onrender.com`

Update `frontend/.env.production`:
```env
REACT_APP_API_URL=https://sv-travels-backend.onrender.com/api
```

Then redeploy frontend:
```bash
cd frontend
npm run deploy
```

### Step 7: Initialize Database

After backend is deployed, run these scripts once:

**Option A: Using Render Web Shell**
1. Go to your backend service on Render
2. Click **Shell** tab
3. Run:
   ```bash
   node updateAdmin.js
   node updateSettings.js
   ```

**Option B: Run Locally Pointing to Production DB**
1. Update `backend/.env` temporarily with production MONGODB_URI
2. Run:
   ```bash
   cd backend
   node updateAdmin.js
   node updateSettings.js
   ```
3. Revert `backend/.env` to localhost

## 🎯 Post-Deployment Verification

### Immediate Checks (After Step 3)
- [ ] GitHub Pages builds successfully
- [ ] Site accessible at GitHub Pages URL
- [ ] CNAME file present in deployed site

### After DNS Propagation (24-48 hours)
- [ ] `https://svtravels.online` loads correctly
- [ ] `https://www.svtravels.online` redirects to main domain
- [ ] SSL certificate is active (🔒 in browser)
- [ ] All pages load without errors

### Functionality Tests
- [ ] Frontend loads at `https://svtravels.online`
- [ ] API calls work (check browser console)
- [ ] Admin login works: `https://svtravels.online/admin/login`
  - Email: `svtravelsonline@gmail.com`
  - Password: `admin123`
- [ ] Contact form submits successfully
- [ ] Vehicle images display correctly
- [ ] WhatsApp button works
- [ ] Google Maps shows correct location

## 🔧 Troubleshooting

### DNS Not Resolving
- Wait 24-48 hours for full propagation
- Check DNS: `nslookup svtravels.online`
- Verify DNS records in domain registrar

### CNAME File Missing
- Check `frontend/public/CNAME` exists
- Redeploy: `npm run deploy`
- CNAME should be in build output

### CORS Errors
- Verify backend FRONTEND_URL is set to `https://svtravels.online`
- Check backend logs on Render
- Ensure backend server.js has all origins listed

### SSL Not Working
- Wait up to 24 hours after DNS propagation
- Remove and re-add custom domain in GitHub settings
- Ensure "Enforce HTTPS" is checked

### API Not Connecting
- Check backend URL in `frontend/.env.production`
- Verify backend is running on Render
- Check browser console for error messages
- Test API directly: `https://your-backend.onrender.com/api/health`

## 📱 Update Mobile App Links (Future)

Once deployed, update any marketing materials with:
- Website: `https://svtravels.online`
- Admin: `https://svtravels.online/admin/login`
- Email: `svtravelsonline@gmail.com`
- Phone: `+91-99631 07531`
- WhatsApp: `919963107531`

## 🔄 Future Deployments

### Update Frontend Only
```bash
cd frontend
# Make your changes
npm run deploy
```

### Update Backend Only
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys on push
```

### Update Both
```bash
git add .
git commit -m "Update application"
git push origin main
cd frontend
npm run deploy
```

## 📚 Additional Resources

- [CUSTOM_DOMAIN_SETUP.md](CUSTOM_DOMAIN_SETUP.md) - Detailed custom domain guide
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Full deployment guide
- [README.md](README.md) - Project documentation

## 🎉 You're Done!

Your application should now be live at:
- **Primary**: https://svtravels.online
- **Fallback**: https://abhiramreddyvundhyala.github.io/sv-travels
- **Admin**: https://svtravels.online/admin/login

**Note**: DNS propagation takes time. Don't panic if it doesn't work immediately!
