# SV Travels - Quick Start Guide

## 🎯 Before You Deploy - Important Configuration

### 1. Update Frontend Package.json Homepage
Open `frontend/package.json` and replace:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME"
```

Example: If your GitHub username is `john` and repo is `sv-travels`:
```json
"homepage": "https://john.github.io/sv-travels"
```

### 2. Create MongoDB Atlas Database
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- See DEPLOYMENT_GUIDE.md for detailed steps

### 3. Deploy Backend to Render
- Sign up at https://render.com
- Create new Web Service
- Connect your GitHub repository
- Set root directory to `backend`
- Add environment variables (see DEPLOYMENT_GUIDE.md)

### 4. Update Frontend API URL
Edit `frontend/.env.production`:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

### 5. Deploy Frontend to GitHub Pages
```bash
cd frontend
npm install
npm run deploy
```

Or use the deployment script:
```bash
# Windows PowerShell
cd frontend
.\deploy.ps1

# Linux/Mac
cd frontend
chmod +x deploy.sh
./deploy.sh
```

---

## 📁 Project Structure

```
SV/
├── frontend/          # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env.production
│   └── .env.example
├── backend/           # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── DEPLOYMENT_GUIDE.md
└── README.md
```

---

## 🔑 Default Admin Credentials

After deployment, login with:
- **Email**: svtravelsonline@gmail.com
- **Password**: admin123

⚠️ **IMPORTANT**: Change these credentials immediately after first login!

Use the update script:
```bash
cd backend
node updateAdmin.js
```

---

## 📚 Documentation

- **DEPLOYMENT_GUIDE.md** - Complete deployment walkthrough
- **ADMIN_FEATURES.md** - Admin panel documentation
- **EMAILJS_SETUP.md** - Email configuration guide
- **README.md** - Project overview

---

## 🆘 Need Help?

Check the **Common Issues & Solutions** section in DEPLOYMENT_GUIDE.md

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render with environment variables
- [ ] Frontend `package.json` homepage updated
- [ ] Frontend `.env.production` updated with backend URL
- [ ] Frontend deployed to GitHub Pages
- [ ] Admin credentials changed
- [ ] Test all features (login, vehicles, enquiries)

---

**Happy Deploying! 🚀**
