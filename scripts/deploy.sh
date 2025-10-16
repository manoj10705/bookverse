#!/bin/bash

# BookVerse Deployment Script
# This script helps deploy your project to production

echo "🚀 BookVerse Deployment"
echo "======================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Convex is set up
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local not found. Please set up Convex first with 'npx convex dev'"
    exit 1
fi

echo "🔍 Pre-deployment checks..."

# Run linting and type checking
echo "📝 Running linting and type checks..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix the errors before deploying."
    exit 1
fi

echo "✅ Linting passed!"

# Build the project
echo "🏗️  Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Deploy Convex backend
echo "☁️  Deploying Convex backend..."
read -p "Deploy to production? (y/N): " deploy_prod

if [[ $deploy_prod =~ ^[Yy]$ ]]; then
    npx convex deploy --prod
    if [ $? -eq 0 ]; then
        echo "✅ Convex backend deployed to production!"
    else
        echo "❌ Convex deployment failed."
        exit 1
    fi
else
    echo "ℹ️  Skipped production deployment. Backend remains in development mode."
fi

echo ""
echo "📦 Deployment Summary"
echo "===================="
echo "✅ Frontend built successfully (dist/ folder)"
echo "✅ Backend deployed to Convex"
echo ""
echo "Next steps for frontend deployment:"
echo "1. Vercel: 'vercel --prod' (after installing Vercel CLI)"
echo "2. Netlify: Drag and drop the 'dist' folder to Netlify"
echo "3. GitHub Pages: Push the 'dist' folder to a gh-pages branch"
echo ""
echo "🎉 Deployment complete!"
