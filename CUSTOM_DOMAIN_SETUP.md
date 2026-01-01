# Custom Domain Setup for svtravels.online

This guide explains how to configure your custom domain `svtravels.online` to work with your SV Travels application deployed on GitHub Pages.

## Overview

- **Frontend**: Hosted on GitHub Pages with custom domain `svtravels.online`
- **Backend**: Hosted on Render (or your preferred backend host)
- **Domain**: `svtravels.online` (purchased from domain registrar)

## Step 1: Configure GitHub Pages

### 1.1 Deploy to GitHub Pages

```bash
cd frontend
npm run deploy
```

### 1.2 Enable GitHub Pages
1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select `gh-pages` branch
4. Click **Save**

### 1.3 Add Custom Domain
1. In GitHub Pages settings, under **Custom domain**
2. Enter: `svtravels.online`
3. Click **Save**
4. ✅ Check **Enforce HTTPS** (wait a few minutes for certificate to provision)

## Step 2: Configure DNS Settings

Log in to your domain registrar (where you bought `svtravels.online`) and add these DNS records:

### For Root Domain (svtravels.online)

Add **A Records** pointing to GitHub Pages IPs:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

### For WWW Subdomain (www.svtravels.online)

Add **CNAME Record**:

```
Type: CNAME
Name: www
Value: <your-github-username>.github.io
TTL: 3600
```

Replace `<your-github-username>` with your actual GitHub username.

## Step 3: Configure Backend CORS

The backend has been configured to accept requests from:
- `https://svtravels.online`
- `https://www.svtravels.online`
- `https://<your-github-username>.github.io` (GitHub Pages default URL)
- `http://localhost:3000` (for local development)

### Update Backend Environment Variables

On your backend hosting platform (e.g., Render):

1. Go to your backend service dashboard
2. Navigate to **Environment Variables**
3. Update `FRONTEND_URL` to: `https://svtravels.online`
4. Save and redeploy if necessary

## Step 4: Verify Configuration

### Check DNS Propagation
Use online tools to verify DNS propagation:
- https://dnschecker.org
- Search for: `svtravels.online`

DNS propagation can take 24-48 hours, but usually completes within a few hours.

### Test Your Site

1. **Frontend**: Visit `https://svtravels.online`
2. **API Connection**: Check browser console for any CORS errors
3. **Admin Login**: Try logging in at `https://svtravels.online/admin/login`
4. **Contact Form**: Test the booking/enquiry form

## Step 5: SSL/HTTPS Certificate

GitHub Pages automatically provisions an SSL certificate for your custom domain.

- Initial provisioning: 10-60 minutes
- Status: Check in GitHub repository Settings → Pages
- Once ready, **Enforce HTTPS** checkbox will be available

## Troubleshooting

### CNAME File Keeps Disappearing
The `CNAME` file is in `frontend/public/CNAME`. This ensures it's included in the build and deployed to GitHub Pages.

### DNS Not Resolving
- Wait 24-48 hours for full DNS propagation
- Use `nslookup svtravels.online` to check DNS records
- Verify DNS records in your domain registrar

### CORS Errors
1. Check backend logs for CORS-related errors
2. Verify `FRONTEND_URL` environment variable on backend
3. Ensure both `svtravels.online` and `www.svtravels.online` are in allowed origins

### SSL Certificate Not Provisioning
- Verify DNS records are correct
- Wait up to 24 hours after DNS propagation
- Remove and re-add custom domain in GitHub Pages settings

## Domain Configuration Checklist

- [ ] Buy domain `svtravels.online`
- [ ] Deploy frontend to GitHub Pages (`npm run deploy`)
- [ ] Add custom domain in GitHub repository settings
- [ ] Configure A records for root domain
- [ ] Configure CNAME record for www subdomain
- [ ] Update backend FRONTEND_URL environment variable
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Enable HTTPS in GitHub Pages settings
- [ ] Test website at https://svtravels.online
- [ ] Test admin panel login
- [ ] Test contact/booking forms
- [ ] Verify API calls work (check browser console)

## Files Modified for Custom Domain

### Frontend
- `frontend/package.json` - Updated homepage URL
- `frontend/public/CNAME` - Created for GitHub Pages
- `frontend/.env.production` - Production API URL

### Backend
- `backend/server.js` - Updated CORS to allow multiple origins
- `backend/.env.example` - Updated FRONTEND_URL

## Alternative: GitHub Pages Path (Fallback)

If you want to keep GitHub Pages default URL working alongside custom domain:

The app is also accessible at:
- `https://<your-github-username>.github.io/sv-travels`

Both URLs will work, but the custom domain is recommended for production.

## Support

For issues:
- **Email**: svtravelsonline@gmail.com
- **Phone**: +91-99631 07531

---

**Note**: DNS changes can take up to 48 hours to propagate globally. Be patient!
