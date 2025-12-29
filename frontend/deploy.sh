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

# Build and deploy
echo ""
echo "🏗️  Building and deploying to GitHub Pages..."
npm run deploy

echo ""
echo "✅ Deployment complete!"
echo "Your site will be available at the URL specified in package.json homepage"
echo ""
echo "Note: It may take 1-5 minutes for GitHub Pages to update"
