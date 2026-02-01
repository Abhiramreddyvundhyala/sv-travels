# 🌐 DUAL DOMAIN CONFIGURATION
## Works on Both GitHub Pages & Custom Domain

---

## ✅ **YOUR APP NOW WORKS ON BOTH DOMAINS**

### **Domain 1: Custom Domain (Primary)**
```
https://svtravels.online
https://www.svtravels.online
```

### **Domain 2: GitHub Pages (Fallback)**
```
https://Abhiramreddyvundhyala.github.io/sv-travels
```

---

## 🔧 **WHAT WAS CONFIGURED**

### **1. Smart Routing (Automatic Detection)**

**File:** `frontend/src/App.js`

```javascript
// Automatically detects which domain and sets correct base path
const basename = window.location.hostname.includes('github.io') 
  ? '/sv-travels'  // GitHub Pages: uses /sv-travels path
  : '/';           // Custom Domain: uses root path
```

**How it works:**
- ✅ **Custom Domain** (svtravels.online) → Routes work at root `/`
- ✅ **GitHub Pages** (.github.io/sv-travels) → Routes work at `/sv-travels/`

---

### **2. Flexible Homepage (Works Everywhere)**

**File:** `frontend/package.json`

```json
"homepage": "."
```

**Why "." instead of full URL?**
- ✅ Works on custom domain
- ✅ Works on GitHub Pages subdirectory
- ✅ Works in development (localhost)
- ✅ Relative paths adapt automatically

---

### **3. Backend CORS (Allows Both Domains)**

**File:** `backend/server.js`

```javascript
const allowedOrigins = [
  'http://localhost:3000',                      // Development
  'https://abhiramreddyvundhyala.github.io',   // GitHub Pages ✅
  'https://svtravels.online',                   // Custom Domain ✅
  'https://www.svtravels.online',               // WWW subdomain ✅
  process.env.FRONTEND_URL
];
```

**All domains are whitelisted!**

---

### **4. CNAME File (Prioritizes Custom Domain)**

**File:** `frontend/public/CNAME`

```
svtravels.online
```

**Effect:**
- GitHub automatically redirects `.github.io` to custom domain
- But both URLs remain accessible if needed
- Custom domain gets priority

---

## 🚀 **DEPLOYMENT - BOTH DOMAINS WORK**

### **Option 1: Deploy Once, Both Work (Recommended)**

```bash
cd frontend
npm run build
npm run deploy
```

**Result:**
- ✅ https://svtravels.online (via CNAME redirect)
- ✅ https://Abhiramreddyvundhyala.github.io/sv-travels (direct access)

### **Option 2: Test GitHub Pages URL Before DNS**

If your custom domain DNS isn't set up yet:

```bash
# Temporarily remove CNAME to test GitHub Pages URL
rm frontend/public/CNAME

# Deploy
cd frontend
npm run deploy

# Access via: https://Abhiramreddyvundhyala.github.io/sv-travels

# When ready for custom domain, restore CNAME
echo "svtravels.online" > frontend/public/CNAME
npm run deploy
```

---

## 🌍 **HOW ROUTING WORKS ON BOTH DOMAINS**

### **Custom Domain (svtravels.online)**

| URL | Loads |
|-----|-------|
| https://svtravels.online | Home page |
| https://svtravels.online/about | About page |
| https://svtravels.online/fleet | Fleet page |
| https://svtravels.online/booking | Booking page |
| https://svtravels.online/admin/login | Admin login |

**Base Path:** `/` (root)

---

### **GitHub Pages (.github.io/sv-travels)**

| URL | Loads |
|-----|-------|
| https://Abhiramreddyvundhyala.github.io/sv-travels | Home page |
| https://Abhiramreddyvundhyala.github.io/sv-travels/about | About page |
| https://Abhiramreddyvundhyala.github.io/sv-travels/fleet | Fleet page |
| https://Abhiramreddyvundhyala.github.io/sv-travels/booking | Booking page |
| https://Abhiramreddyvundhyala.github.io/sv-travels/admin/login | Admin login |

**Base Path:** `/sv-travels/`

**🎯 Same app, different paths - automatically handled!**

---

## ✅ **TESTING BOTH DOMAINS**

### **Test Custom Domain:**
```bash
# Open in browser
https://svtravels.online
https://svtravels.online/fleet
https://svtravels.online/admin/login
```

### **Test GitHub Pages:**
```bash
# Open in browser  
https://Abhiramreddyvundhyala.github.io/sv-travels
https://Abhiramreddyvundhyala.github.io/sv-travels/fleet
https://Abhiramreddyvundhyala.github.io/sv-travels/admin/login
```

### **Both should work identically!**

---

## 🔧 **ENVIRONMENT VARIABLES (Same for Both)**

### **Frontend (.env.production)**

```env
# Backend API (same for both domains)
REACT_APP_API_URL=https://sv-travels-backend.onrender.com/api

# EmailJS (same for both domains)
REACT_APP_EMAILJS_SERVICE_ID=service_mxg6tps
REACT_APP_EMAILJS_TEMPLATE_ID=template_3j6k3dv
REACT_APP_EMAILJS_PUBLIC_KEY=cIn5E9re4ZhZL5omx
```

**No changes needed - works on both domains!**

---

## 🐛 **TROUBLESHOOTING**

### **Issue: Routes don't work on GitHub Pages**

**Cause:** basename not detected correctly

**Solution:**
Check `frontend/src/App.js`:
```javascript
const basename = window.location.hostname.includes('github.io') 
  ? '/sv-travels' 
  : '/';
```

---

### **Issue: Custom domain redirects to GitHub Pages**

**Cause:** DNS not configured or CNAME missing

**Solution:**
1. Check `frontend/public/CNAME` exists with `svtravels.online`
2. Verify DNS settings in Hostinger
3. Wait 24-48 hours for DNS propagation

---

### **Issue: GitHub Pages shows 404 for routes**

**Cause:** Missing 404.html for client-side routing

**Solution:**
Already handled! We have:
- `frontend/public/404.html` - redirects to index.html
- React Router handles the routing

---

### **Issue: Both domains show different content**

**Cause:** Old build cached

**Solution:**
```bash
cd frontend
rm -rf build
npm run build
npm run deploy
```

---

## 📋 **DEPLOYMENT CHECKLIST**

### **For Both Domains to Work:**

- [x] `homepage: "."` in package.json
- [x] Smart basename detection in App.js
- [x] CNAME file with custom domain
- [x] 404.html for client-side routing
- [x] Backend CORS allows both origins
- [x] .env.production configured

### **DNS Configuration (For Custom Domain):**

- [ ] A records pointing to GitHub IPs
- [ ] CNAME record for www subdomain
- [ ] GitHub Pages custom domain set
- [ ] Enforce HTTPS enabled

---

## 🎯 **WHICH DOMAIN TO USE?**

### **Primary (Recommended): Custom Domain**
```
✅ https://svtravels.online
```
**Advantages:**
- Professional appearance
- Better branding
- Easier to remember
- SEO benefits

### **Secondary (Fallback): GitHub Pages**
```
✅ https://Abhiramreddyvundhyala.github.io/sv-travels
```
**Advantages:**
- Works immediately (no DNS wait)
- Backup if custom domain has issues
- Free hosting

---

## 🚀 **QUICK DEPLOY COMMAND**

```bash
# Build and deploy (works for both domains)
cd frontend
npm run build
npm run deploy

# After deployment, both URLs work:
# 1. https://svtravels.online
# 2. https://Abhiramreddyvundhyala.github.io/sv-travels
```

---

## 📊 **URL EXAMPLES**

### **Both domains handle the same routes:**

| Page | Custom Domain | GitHub Pages |
|------|---------------|--------------|
| Home | svtravels.online | Abhiramreddyvundhyala.github.io/sv-travels |
| About | svtravels.online/about | Abhiramreddyvundhyala.github.io/sv-travels/about |
| Fleet | svtravels.online/fleet | Abhiramreddyvundhyala.github.io/sv-travels/fleet |
| Booking | svtravels.online/booking | Abhiramreddyvundhyala.github.io/sv-travels/booking |
| Contact | svtravels.online/contact | Abhiramreddyvundhyala.github.io/sv-travels/contact |
| Admin | svtravels.online/admin/login | Abhiramreddyvundhyala.github.io/sv-travels/admin/login |

---

## ✨ **SUMMARY**

Your application now intelligently works on **BOTH domains**:

1. **Custom Domain** (svtravels.online) - Professional, primary URL
2. **GitHub Pages** (.github.io/sv-travels) - Backup, always accessible

**No manual switching needed** - the app auto-detects and adapts!

**Deploy once → Works everywhere!** 🎉

---

**Status:** ✅ Dual Domain Support Enabled  
**Configuration:** ✅ Complete  
**Testing Required:** Test both URLs after deployment
