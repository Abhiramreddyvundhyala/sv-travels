# 🍃 MongoDB Atlas Setup Guide for SV Travels

## Quick Start: Deploy MongoDB in 10 Minutes

### Step 1: Create MongoDB Atlas Account (2 minutes)

1. **Sign up** at: https://www.mongodb.com/cloud/atlas/register
   - Use your email or Google account
   - Free tier - no credit card required!

2. **Answer the questionnaire** (optional):
   - I'm learning MongoDB
   - Building a new application
   - Select: Node.js

---

### Step 2: Create Your Database Cluster (3 minutes)

1. **Click "Build a Database"**

2. **Choose FREE tier (M0)**:
   - Select **Shared** (Free)
   - Provider: **AWS** or **Google Cloud**
   - Region: Choose closest to you (e.g., Mumbai for India)
   - Cluster Name: `sv-travels-cluster`

3. **Click "Create"** (wait 3-5 minutes for cluster creation)

---

### Step 3: Create Database User (1 minute)

1. **Security Quick Start** will appear automatically
   - Or go to: **Database Access** (left sidebar)

2. **Create a database user**:
   ```
   Username: svtravelsadmin
   Password: [Generate a secure password and SAVE IT!]
   ```
   
   **IMPORTANT**: Copy and save this password - you'll need it!

3. **Database User Privileges**: 
   - Select: **Read and write to any database**

4. **Click "Add User"**

---

### Step 4: Setup Network Access (1 minute)

1. Go to **Network Access** (left sidebar)

2. **Click "Add IP Address"**

3. **Choose one option**:
   - **For Render deployment**: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - **For local testing**: Click **"Add Current IP Address"**

4. **Click "Confirm"**

---

### Step 5: Get Your Connection String (2 minutes)

1. Go to **Database** (left sidebar)

2. **Click "Connect"** button on your cluster

3. Select **"Connect your application"**

4. **Driver**: Select **Node.js** and version **4.1 or later**

5. **Copy the connection string**:
   ```
   mongodb+srv://svtravelsadmin:<password>@sv-travels-cluster.xxxxx.mongodb.net/
   ```

6. **REPLACE `<password>` with your actual password**

7. **ADD database name at the end**:
   ```
   mongodb+srv://svtravelsadmin:YOUR_PASSWORD@sv-travels-cluster.xxxxx.mongodb.net/sv-travels
   ```

   **Final format should be**:
   ```
   ```

---

### Step 6: Configure Your Application (1 minute)

#### **For Local Development:**

1. Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://svtravelsadmin:YOUR_PASSWORD@sv-travels-cluster.xxxxx.mongodb.net/sv-travels
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long_random_string
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:3000
   ```

2. **Replace**:
   - `YOUR_PASSWORD` with your actual MongoDB password
   - Generate a secure JWT_SECRET (use random string generator)

#### **For Production (Render):**

Add these environment variables in Render dashboard:

```
MONGODB_URI=mongodb+srv://svtravelsadmin:YOUR_PASSWORD@sv-travels-cluster.xxxxx.mongodb.net/sv-travels
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long_random_string
JWT_EXPIRE=30d
FRONTEND_URL=https://yourusername.github.io/sv-travels
```

---

## 🧪 Test Your MongoDB Connection

### Option 1: Using Node.js Script

Create a file `backend/testConnection.js`:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🔗 Host:', mongoose.connection.host);
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

testConnection();
```

Run the test:
```bash
cd backend
node testConnection.js
```

### Option 2: Start Your Backend Server

```bash
cd backend
npm install
npm start
```

Look for: `✅ MongoDB Connected Successfully`

---

## 🔍 Verify Data in MongoDB Atlas

1. Go to **Database** → Click **"Browse Collections"**
2. You should see these collections:
   - `admins`
   - `enquiries`
   - `settings`
   - `vehicles`

3. **If you see the default admin user in `admins` collection, MongoDB is working perfectly!**

---

## 🛠️ Common Issues & Solutions

### Issue 1: "Authentication failed"
**Solution**: 
- Double-check password in connection string
- No special characters unencoded (use URL encoding if needed)
- Verify user exists in Database Access

### Issue 2: "Connection timeout"
**Solution**:
- Check Network Access allows your IP (or 0.0.0.0/0)
- Verify connection string format is correct
- Check internet connection

### Issue 3: "Database not found"
**Solution**:
- MongoDB creates database automatically on first write
- Ensure database name is in connection string: `/sv-travels`

### Issue 4: Special characters in password
**Solution**:
- Encode special characters: `@` → `%40`, `#` → `%23`, `:` → `%3A`
- Or regenerate password without special characters

---

## 📊 MongoDB Atlas Dashboard Features

### Monitor Your Database
- **Metrics**: Track connections, operations, storage
- **Performance**: Query performance insights
- **Alerts**: Set up email notifications

### Data Management
- **Browse Collections**: View/edit data directly
- **Import/Export**: Backup your data
- **Indexes**: Optimize query performance

### Security
- **Encryption**: Automatic encryption at rest
- **Backups**: Daily automatic backups (paid tiers)
- **Audit Logs**: Track database access (paid tiers)

---

## 💰 Pricing Information

### Free Tier (M0) - What You Get:
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Perfect for development/testing
- ✅ Enough for small production apps
- ✅ No credit card required
- ✅ Never expires

### When to Upgrade:
- Storage > 512 MB
- Need dedicated resources
- High traffic (>100 connections)
- Need advanced features

---

## 🚀 Next Steps After MongoDB Setup

1. ✅ **MongoDB Atlas configured**
2. ⬜ Test local connection
3. ⬜ Deploy backend to Render
4. ⬜ Add MongoDB URI to Render environment variables
5. ⬜ Verify backend deployment
6. ⬜ Deploy frontend to GitHub Pages
7. ⬜ Test full application

---

## 📝 Your MongoDB Credentials Template

**Save this information securely:**

```
MongoDB Atlas Account: [your email]
Cluster Name: sv-travels-cluster
Database Name: sv-travels
Database User: svtravelsadmin
Database Password: [your password]

Connection String:
mongodb+srv://svtravelsadmin:[password]@sv-travels-cluster.[cluster-id].mongodb.net/sv-travels

Atlas Dashboard: https://cloud.mongodb.com/
```

---

## ✅ MongoDB Setup Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created M0 Free cluster
- [ ] Created database user
- [ ] Configured network access (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Replaced password in connection string
- [ ] Added database name to connection string
- [ ] Created backend/.env with MONGODB_URI
- [ ] Tested connection locally
- [ ] Verified default admin created
- [ ] Ready to deploy to Render!

---

**🎉 MongoDB Atlas is now ready for SV Travels!**

Questions? Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
