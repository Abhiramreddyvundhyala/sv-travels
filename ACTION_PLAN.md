# 🎯 Your Action Plan for svtravels.online

Follow these steps in order. Check each one off as you complete it.

## Phase 1: Buy Domain (Do This First!)
- [ ] Go to a domain registrar (Namecheap, GoDaddy, Google Domains, etc.)
- [ ] Purchase domain: **svtravels.online**
- [ ] Keep your login credentials handy

## Phase 2: Deploy Frontend (5-10 minutes)
```bash
cd frontend
npm install
npm run deploy
```
- [ ] Command runs successfully
- [ ] Check your repository has a `gh-pages` branch

## Phase 3: Configure GitHub Pages (2 minutes)
1. [ ] Go to: `https://github.com/Abhiramreddyvundhyala/sv-travels/settings/pages`
2. [ ] Source: Select `gh-pages` branch, `/ (root)` folder
3. [ ] Click Save
4. [ ] Custom domain: Enter `svtravels.online`
5. [ ] Click Save
6. [ ] Wait 1 minute, then check **Enforce HTTPS**

## Phase 4: Configure DNS (5 minutes)
Log in to your domain registrar and add these exact records:

### A Records (Root Domain)
```
Type: A    Name: @    Value: 185.199.108.153    TTL: 3600
Type: A    Name: @    Value: 185.199.109.153    TTL: 3600
Type: A    Name: @    Value: 185.199.110.153    TTL: 3600
Type: A    Name: @    Value: 185.199.111.153    TTL: 3600
```

### CNAME Record (WWW)
```
Type: CNAME    Name: www    Value: abhiramreddyvundhyala.github.io    TTL: 3600
```

- [ ] All 5 DNS records added
- [ ] Saved changes

## Phase 5: Deploy Backend to Render (10 minutes)

1. [ ] Go to [Render Dashboard](https://dashboard.render.com)
2. [ ] Click **New** → **Web Service**
3. [ ] Connect GitHub repository
4. [ ] Configure:
   - Name: `sv-travels-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`

5. [ ] Add Environment Variables (click **Add Environment Variable** for each):
   ```
   MONGODB_URI = (paste your MongoDB Atlas connection string)
   JWT_SECRET = sv_travels_super_secret_key_2024_production_environment
   JWT_EXPIRE = 30d
   FRONTEND_URL = https://svtravels.online
   NODE_ENV = production
   ```

6. [ ] Click **Create Web Service**
7. [ ] Wait for deployment (5-10 minutes)
8. [ ] Copy your backend URL (e.g., `https://sv-travels-backend.onrender.com`)

## Phase 6: Update Frontend with Backend URL

1. [ ] Open `frontend/.env.production`
2. [ ] Update line 3 with your actual backend URL:
   ```env
   REACT_APP_API_URL=https://your-actual-backend.onrender.com/api
   ```
3. [ ] Save file
4. [ ] Redeploy frontend:
   ```bash
   cd frontend
   npm run deploy
   ```

## Phase 7: Initialize Database (One-time)

Go to Render → Your Backend Service → **Shell** tab, then run:
```bash
node updateAdmin.js
node updateSettings.js
```

- [ ] Both commands completed successfully
- [ ] You see "✅ Admin created" and "✅ Settings updated"

## Phase 8: Wait for DNS Propagation
⏰ **This takes 1-24 hours** (usually 2-6 hours)

Check progress:
- [ ] Go to https://dnschecker.org
- [ ] Enter: `svtravels.online`
- [ ] Wait until most locations show green checkmarks

## Phase 9: Test Everything

### Once DNS is active:
- [ ] Visit https://svtravels.online (should load your website)
- [ ] Check SSL certificate (🔒 icon in browser)
- [ ] Test all pages (Home, About, Services, Fleet, Contact, Booking)
- [ ] Test admin login at https://svtravels.online/admin/login
  - Email: `svtravelsonline@gmail.com`
  - Password: `admin123`
- [ ] Test adding a vehicle with images
- [ ] Test contact form submission
- [ ] Test WhatsApp button
- [ ] Check browser console for errors (F12)

## 🎉 You're Done!

Your website is now live at:
- **Main Site**: https://svtravels.online
- **Admin Panel**: https://svtravels.online/admin/login

## 📞 Contact Information (Now Live!)
- **Email**: svtravelsonline@gmail.com
- **Phone**: +91-99631 07531
- **WhatsApp**: 919963107531
- **Address**: Kothakotta Kurnool road vishweshwar petrol bunk beside 509381 pincode Wanaparthy district

## 🔧 If Something Goes Wrong

### DNS Not Resolving
- **Wait**: DNS can take up to 48 hours
- **Check**: Use `nslookup svtravels.online` in terminal
- **Verify**: Double-check DNS records in domain registrar

### Site Not Loading
- **GitHub Pages**: Check Settings → Pages shows green checkmark
- **CNAME**: Verify `frontend/public/CNAME` contains `svtravels.online`
- **Build**: Check gh-pages branch has recent files

### API Errors
- **Backend URL**: Verify `.env.production` has correct backend URL
- **CORS**: Check backend logs on Render for CORS errors
- **Redeploy**: Try redeploying both frontend and backend

### Need Help?
- Check [CUSTOM_DOMAIN_SETUP.md](CUSTOM_DOMAIN_SETUP.md) for detailed troubleshooting
- Check [QUICK_DEPLOYMENT.md](QUICK_DEPLOYMENT.md) for additional guidance

---

**Pro Tip**: Bookmark https://svtravels.online/admin/login for easy access!
