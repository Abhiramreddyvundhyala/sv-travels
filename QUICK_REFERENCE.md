# 🚀 QUICK DEPLOYMENT REFERENCE
## SV Travels - Fast Track to Production
## ✅ Works on BOTH Custom Domain & GitHub Pages

**Your App URLs:**
- 🌐 **Custom Domain:** https://svtravels.online (Primary)
- 🌐 **GitHub Pages:** https://Abhiramreddyvundhyala.github.io/sv-travels (Backup)

**Both work automatically - no configuration needed!**

---

## ⚡ QUICK START (5 Steps)

### 1️⃣ Deploy Backend to Render.com (10 minutes)

**URL:** https://render.com

**Steps:**
1. New Web Service → Connect GitHub → Select `sv-travels`
2. Settings:
   - Name: `sv-travels-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Add Environment Variables (copy-paste):
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
4. Click "Create Web Service"
5. **Copy Backend URL** (e.g., https://sv-travels-backend.onrender.com)

---

### 2️⃣ Update Frontend Environment (2 minutes)

Edit `frontend/.env.production`:
```env
REACT_APP_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
REACT_APP_EMAILJS_SERVICE_ID=service_mxg6tps
REACT_APP_EMAILJS_TEMPLATE_ID=template_3j6k3dv
REACT_APP_EMAILJS_PUBLIC_KEY=cIn5E9re4ZhZL5omx
```

---

### 3️⃣ Deploy Frontend to GitHub Pages (3 minutes)

```bash
cd frontend
npm install
npm run deploy
```

Wait 2-3 minutes for deployment.

---

### 4️⃣ Configure Custom Domain in Hostinger (5 minutes)

**Hostinger → Domains → svtravels.online → DNS Zone**

Add these records:
```
A     @     185.199.108.153     3600
A     @     185.199.109.153     3600
A     @     185.199.110.153     3600
A     @     185.199.111.153     3600
CNAME www   Abhiramreddyvundhyala.github.io   3600
```

**GitHub → Settings → Pages**
- Custom domain: `svtravels.online`
- Enforce HTTPS: ✅

---

### 5️⃣ Verify & Secure (5 minutes)

**Test:**
```bash
# Backend
curl https://YOUR-BACKEND.onrender.com/api/health

# Frontend
# Visit: https://svtravels.online
```

**CRITICAL - Change Password:**
1. Go to: https://svtravels.online/admin/login
2. Login: `svtravelsonline@gmail.com` / `admin123`
3. Go to Settings → Change Password
4. Use strong password (20+ characters)

---

## 🔑 CREDENTIALS REFERENCE

### Admin Login (Default - CHANGE IMMEDIATELY)
```
URL: https://svtravels.online/admin/login
Email: svtravelsonline@gmail.com
Password: admin123  ⚠️ CHANGE THIS!
```

### Backend Environment Variables
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://svtravelsadmin:PASSWORD@cluster.mongodb.net/sv-travels
JWT_SECRET=sv_travels_super_secret_key_2024_production_environment
FRONTEND_URL=https://svtravels.online
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Environment Variables
```bash
REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com/api
REACT_APP_EMAILJS_SERVICE_ID=service_mxg6tps
REACT_APP_EMAILJS_TEMPLATE_ID=template_3j6k3dv
REACT_APP_EMAILJS_PUBLIC_KEY=cIn5E9re4ZhZL5omx
```

---

## 🐛 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Backend not responding | Check Render.com logs, verify environment variables |
| Frontend can't connect | Check REACT_APP_API_URL in .env.production |
| Custom domain not working | Wait 24-48 hours for DNS propagation |
| Admin login fails | Check backend logs, verify MongoDB connection |
| HTTPS not working | Wait 24 hours, ensure "Enforce HTTPS" is checked |

---

## 📋 POST-DEPLOYMENT CHECKLIST

- [ ] Backend deployed and responding
- [ ] Frontend deployed and loading
- [ ] Custom domain working (may take 24-48 hours)
- [ ] Admin login working
- [ ] **Admin password changed** ⚠️
- [ ] Booking form working
- [ ] WhatsApp integration working
- [ ] EmailJS notifications working
- [ ] Vehicle images loading
- [ ] All admin features working

---

## 🔒 SECURITY REMINDERS

1. **Change admin password** (First thing!)
2. Never commit `.env` files
3. Monitor Render.com logs regularly
4. Keep dependencies updated
5. Set up uptime monitoring

---

## 📞 QUICK LINKS

- **Website:** https://svtravels.online
- **Admin:** https://svtravels.online/admin/login
- **Render Dashboard:** https://dashboard.render.com
- **GitHub Pages:** https://github.com/Abhiramreddyvundhyala/sv-travels/settings/pages
- **Hostinger DNS:** https://hpanel.hostinger.com/domains

---

## 🎯 DEPLOYMENT COMMANDS

```bash
# Backend (Update code)
git push origin main  # Auto-deploys on Render

# Frontend (Deploy/Update)
cd frontend
npm run deploy

# Check backend health
curl https://YOUR-BACKEND.onrender.com/api/health
```

---

**⏱️ Total Deployment Time: ~30 minutes**  
**🎉 Status: READY TO GO!**

---

**Need detailed guide?** See `PRODUCTION_DEPLOYMENT.md`  
**Security info?** See `SECURITY_IMPROVEMENTS.md`  
**Full summary?** See `PRODUCTION_READY_SUMMARY.md`
