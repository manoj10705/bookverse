import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import reviewRoutes from './routes/reviews.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI /*|| 'mongodb://localhost:27017/bookverse'*/;

mongoose.connect(MONGODB_URI)
  .then(() => {
  if (MONGODB_URI.includes('mongodb.net')) {
    console.log('✅ Connected to MongoDB Atlas (online)');
  } else {
    console.log('✅ Connected to Local MongoDB');
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})

export default app;
