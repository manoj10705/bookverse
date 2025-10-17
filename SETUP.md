# 🚀 BookVerse MERN Stack Setup Guide

Complete step-by-step guide to set up your BookVerse application locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - **Local MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
  - **MongoDB Atlas** (Cloud) - [Sign up here](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

## 🛠️ Installation Steps

### 1. Clone & Navigate to Project
```bash
git clone <your-repository-url>
cd bookverse
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
npm run server:install
```

### 4. Set Up Environment Variables

#### Option A: Local MongoDB
```bash
cd server
cp .env.example .env
```

Edit `server/.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/bookverse
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=5000
```

#### Option B: MongoDB Atlas (Cloud)
```bash
cd server
cp .env.example .env
```

Edit `server/.env` file:
```env
MONGODB_URI=mongodb+srv://ganymede323_db_user:<db_password>@bookverse.5kfkkyb.mongodb.net/?retryWrites=true&w=majority&appName=Bookverse
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=5000
```

**To get MongoDB Atlas URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create account & cluster
3. Go to "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<dbname>`

### 5. Start MongoDB (Local Only)
If using local MongoDB:
```bash
# On macOS (with Homebrew)
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

### 6. Seed Sample Data (Optional)
```bash
npm run server:seed
```

This adds sample books to your database for testing.

### 7. Start Development Servers
```bash
npm run dev
```

This starts both servers simultaneously:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🎯 Alternative: Start Servers Separately

If you prefer to run servers in separate terminals:

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

## 🧪 Test Your Setup

1. **Open your browser** to http://localhost:5173
2. **Register a new account** or use the sample data
3. **Try these features:**
   - Browse books on the homepage
   - Search for books
   - Register/Login
   - Add a new book (requires login)
   - Rate and review books

## 📁 Project Structure

```
bookverse/
├── src/                    # React Frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components (Home, Login, etc.)
│   ├── contexts/          # React Context (Auth)
│   └── lib/               # Utility functions
├── server/                # Express Backend
│   ├── src/
│   │   ├── models/        # MongoDB/Mongoose models
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Custom middleware (auth)
│   │   └── server.js      # Express server entry point
│   ├── .env               # Environment variables
│   └── package.json       # Backend dependencies
├── public/                # Static assets
└── package.json           # Frontend dependencies
```

## 🔧 Available Scripts

### Frontend (Root Directory)
- `npm run dev` - Start both frontend & backend
- `npm run dev:frontend` - Start only frontend (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run TypeScript linter

### Backend (Server Directory)
- `npm run server:install` - Install backend dependencies
- `npm run server:start` - Start backend in production mode
- `npm run server:seed` - Seed database with sample data
- `npm run dev:backend` - Start backend in development mode

## 🐛 Troubleshooting

### Common Issues:

**1. "Cannot connect to MongoDB"**
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings
- Verify network connectivity

**2. "Port 5000 already in use"**
- Change `PORT=5001` in `server/.env`
- Update `axios.defaults.baseURL` in `src/App.tsx`

**3. "Module not found" errors**
- Run `npm install` in root directory
- Run `npm run server:install` for backend dependencies

**4. CORS errors**
- Ensure backend is running on port 5000
- Check `axios.defaults.baseURL` in `src/App.tsx`

**5. JWT/Auth issues**
- Ensure `JWT_SECRET` is set in `server/.env`
- Clear browser localStorage and try again

### Reset Database:
```bash
# Connect to MongoDB and drop database
mongo
use bookverse
db.dropDatabase()

# Then re-seed
npm run server:seed
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Books
- `GET /api/books` - Get all books (supports search & filter)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Add new book (auth required)
- `GET /api/books/meta/genres` - Get all available genres

### Reviews
- `GET /api/reviews/book/:bookId` - Get reviews for a book
- `GET /api/reviews/user/:userId` - Get user's reviews
- `POST /api/reviews` - Add/update review (auth required)
- `DELETE /api/reviews/:reviewId` - Delete review (auth required)

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile (auth required)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Update API base URL for production

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Deploy `server/` directory
3. Ensure MongoDB Atlas is configured

## 📝 Next Steps

- Add more books to your collection
- Customize the UI/styling
- Add more features (favorites, recommendations, etc.)
- Set up production deployment
- Add tests

## 🆘 Need Help?

If you encounter issues:
1. Check this troubleshooting guide
2. Verify all prerequisites are installed
3. Ensure environment variables are set correctly
4. Check browser console and server logs for errors

Happy coding! 🎉
