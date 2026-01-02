#!/bin/bash

echo "🚀 SV Travels - Frontend Deployment to GitHub Pages"
echo ""

# Check if in frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    echo "Run: cd frontend"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set environment variables for production build
echo ""
echo "🔧 Setting production environment variables..."
export REACT_APP_API_URL="https://sv-travels-backend.onrender.com/api"
export REACT_APP_EMAILJS_SERVICE_ID="service_mxg6tps"
export REACT_APP_EMAILJS_TEMPLATE_ID="template_3j6k3dv"
export REACT_APP_EMAILJS_PUBLIC_KEY="cIn5E9re4ZhZL5omx"

# Build and deploy
echo ""
echo "🏗️  Building and deploying to GitHub Pages..."
npm run deploy

echo ""
echo "✅ Deployment complete!"
echo "Your site will be available at the URL specified in package.json homepage"
echo ""
echo "Note: It may take 1-5 minutes for GitHub Pages to update"
