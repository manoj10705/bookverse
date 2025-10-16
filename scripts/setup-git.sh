#!/bin/bash

# BookVerse Git Setup Script
# This script helps you set up the project with Git

echo "🚀 BookVerse Git Setup"
echo "======================"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're already in a git repository
if [ -d ".git" ]; then
    echo "✅ Git repository already exists."
    echo "Current remote:"
    git remote -v
else
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized."
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit."
else
    echo "💾 Committing initial files..."
    git commit -m "Initial commit: BookVerse project setup

- Complete book review platform
- React frontend with TypeScript
- Convex backend with real-time updates
- User authentication and profiles
- Book management and reviews
- Search and filtering functionality"
    echo "✅ Initial commit created."
fi

# Ask for GitHub repository URL
echo ""
echo "🔗 GitHub Repository Setup"
echo "=========================="
echo "Please create a new repository on GitHub first, then enter the URL below."
echo "Example: https://github.com/yourusername/bookverse.git"
echo ""
read -p "Enter your GitHub repository URL (or press Enter to skip): " repo_url

if [ -n "$repo_url" ]; then
    # Check if remote already exists
    if git remote get-url origin &> /dev/null; then
        echo "🔄 Updating existing remote..."
        git remote set-url origin "$repo_url"
    else
        echo "🔗 Adding remote repository..."
        git remote add origin "$repo_url"
    fi
    
    echo "📤 Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 Your repository: $repo_url"
    else
        echo "❌ Failed to push to GitHub. Please check your repository URL and permissions."
    fi
else
    echo "⏭️  Skipped GitHub setup. You can add a remote later with:"
    echo "   git remote add origin <your-repo-url>"
    echo "   git push -u origin main"
fi

echo ""
echo "🎉 Git setup complete!"
echo ""
echo "Next steps:"
echo "1. Follow the SETUP.md guide to set up Convex"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm run dev' to start development"
echo ""
echo "Happy coding! 📚✨"
