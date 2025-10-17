# BookVerse - MERN Stack Book Review Platform

A full-stack book review and rating platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 📚 Browse and search books
- ⭐ Rate and review books
- 👤 User authentication and profiles
- 🔍 Advanced search and filtering
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookverse
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   npm run server:install
   ```

4. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `.env` with your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=mongodb://localhost:27017/bookverse
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

5. **Seed the database (optional)**
   ```bash
   npm run server:seed
   ```

6. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
bookverse/
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   └── lib/               # Utilities
├── server/                # Express backend
│   └── src/
│       ├── models/        # Mongoose models
│       ├── routes/        # API routes
│       ├── middleware/    # Custom middleware
│       └── server.js      # Entry point
└── public/                # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Books
- `GET /api/books` - Get all books (with search/filter)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Add new book (protected)
- `GET /api/books/meta/genres` - Get all genres

### Reviews
- `GET /api/reviews/book/:bookId` - Get reviews for book
- `GET /api/reviews/user/:userId` - Get user's reviews
- `POST /api/reviews` - Add/update review (protected)
- `DELETE /api/reviews/:reviewId` - Delete review (protected)

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update profile (protected)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
