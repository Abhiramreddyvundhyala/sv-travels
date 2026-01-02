# Quick Deployment Script for SV Travels

Write-Host "🚀 SV Travels - Frontend Deployment to GitHub Pages" -ForegroundColor Cyan
Write-Host ""

# Check if in frontend directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the frontend directory" -ForegroundColor Red
    Write-Host "Run: cd frontend" -ForegroundColor Yellow
    exit 1
}

# Check if gh-pages is installed
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Set environment variables for production build
Write-Host ""
Write-Host "🔧 Setting production environment variables..." -ForegroundColor Yellow
$env:REACT_APP_API_URL="https://sv-travels-backend.onrender.com/api"
$env:REACT_APP_EMAILJS_SERVICE_ID="service_mxg6tps"
$env:REACT_APP_EMAILJS_TEMPLATE_ID="template_3j6k3dv"
$env:REACT_APP_EMAILJS_PUBLIC_KEY="cIn5E9re4ZhZL5omx"

# Build and deploy
Write-Host ""
Write-Host "🏗️  Building and deploying to GitHub Pages..." -ForegroundColor Yellow
npm run deploy

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "Your site will be available at the URL specified in package.json homepage" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: It may take 1-5 minutes for GitHub Pages to update" -ForegroundColor Yellow
