# BookVerse Setup Guide

This guide will walk you through setting up the BookVerse project from scratch.

## Quick Start (5 minutes)

### 1. Prerequisites Check
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

### 2. Clone and Install
```bash
# Clone your repository
git clone <your-repo-url>
cd bookverse

# Install dependencies
npm install
```

### 3. Set Up Convex Backend
```bash
# Install Convex CLI globally (if not already installed)
npm install -g convex

# Login to Convex (creates account if needed)
npx convex login

# Initialize and deploy backend
npx convex dev
```

**Important**: When you run `npx convex dev` for the first time:
- It will open your browser to create/select a Convex project
- It will automatically create a `.env.local` file with your deployment URL
- It will deploy all your backend functions

### 4. Seed Sample Data (Optional)
```bash
# Add sample books to your database
npx convex run seedData:seedBooks
```

### 5. Start Development
```bash
# Start both frontend and backend
npm run dev
```

Your app will be available at `http://localhost:5173`

## Detailed Setup Instructions

### Setting Up Git Repository

If you haven't created a Git repository yet:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: BookVerse project setup"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/bookverse.git

# Push to GitHub
git push -u origin main
```

### Convex Dashboard

After setting up Convex, you can access your dashboard at:
- Go to [dashboard.convex.dev](https://dashboard.convex.dev)
- Select your project
- Here you can:
  - View your database tables
  - Monitor function calls
  - Manage environment variables
  - View logs

### Project Configuration

The project comes pre-configured with:
- **Authentication**: Username/password login
- **Database Schema**: Books, reviews, and user profiles
- **Search**: Full-text search on book titles
- **Real-time Updates**: Automatic UI updates when data changes

## Development Workflow

### Adding New Features

1. **Backend Changes** (Convex functions):
   ```bash
   # Functions are automatically deployed when you save files
   # Check the Convex dev server output for any errors
   ```

2. **Frontend Changes** (React components):
   ```bash
   # The Vite dev server will hot-reload your changes
   # Check the browser console for any errors
   ```

### Database Management

1. **View Data**:
   - Open Convex dashboard
   - Go to "Data" tab
   - Browse your tables: books, reviews, userProfiles, users

2. **Clear Data** (if needed):
   - In the dashboard, select a table
   - Click "..." menu → "Clear Table"

3. **Add Sample Data**:
   ```bash
   npx convex run seedData:seedBooks
   ```

### Common Development Tasks

#### Adding a New Book Programmatically
```bash
npx convex run books:addBook '{
  "title": "Your Book Title",
  "author": "Author Name", 
  "genre": "Fiction",
  "description": "Book description..."
}'
```

#### Checking Function Logs
- Open Convex dashboard
- Go to "Logs" tab
- View real-time function execution logs

#### Updating Schema
1. Modify `convex/schema.ts`
2. Save the file (auto-deploys)
3. If there are conflicts with existing data, you may need to clear tables

## Troubleshooting

### Issue: "Cannot find module" errors
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Convex functions not updating
**Solution**:
```bash
# Stop the dev server (Ctrl+C)
npx convex dev
```

### Issue: Authentication not working
**Solution**:
1. Check that `convex/auth.ts` and `convex/auth.config.ts` are not modified
2. Clear browser cookies and localStorage
3. Restart the dev server

### Issue: Database schema conflicts
**Solution**:
1. Go to Convex dashboard
2. Clear the conflicting table
3. Re-run seed data if needed

### Issue: Port already in use
**Solution**:
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

## Production Deployment

### Frontend (Vercel/Netlify)
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder

### Backend (Convex)
```bash
# Deploy to production
npx convex deploy --prod
```

### Environment Variables for Production
- `VITE_CONVEX_URL`: Your production Convex URL
- Set this in your hosting platform (Vercel, Netlify, etc.)

## Next Steps

After setup, you can:
1. **Customize the UI**: Modify components in `src/components/`
2. **Add Features**: Create new Convex functions and React components
3. **Integrate APIs**: Add external book APIs for more data
4. **Add Social Features**: Implement following, book lists, etc.
5. **Improve Search**: Add more search filters and sorting options

## Getting Help

- **Convex Docs**: [docs.convex.dev](https://docs.convex.dev)
- **Convex Discord**: [convex.dev/community](https://convex.dev/community)
- **React Docs**: [react.dev](https://react.dev)
- **Tailwind Docs**: [tailwindcss.com](https://tailwindcss.com)

Happy coding! 🚀
