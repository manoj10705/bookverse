import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../contexts/AuthContext';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverUrl?: string;
  isbn?: string;
  publishedYear?: number;
  averageRating: number;
  totalReviews: number;
}

interface Review {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  reviewText?: string;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchBookDetails();
      fetchReviews();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      setBook(response.data);
    } catch (err) {
      setError('Failed to load book details');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/book/${id}`);
      setReviews(response.data);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    fetchBookDetails();
    fetchReviews();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book Not Found</h2>
        <p className="text-gray-600 mb-6">{error || 'The book you are looking for does not exist.'}</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          ← Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Book Details */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-6xl">📖</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <StarRating rating={book.averageRating} readonly />
                  <span className="text-sm text-gray-600">
                    {book.averageRating.toFixed(1)} ({book.totalReviews} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {book.genre}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            {(book.isbn || book.publishedYear) && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {book.isbn && (
                  <div>
                    <span className="font-medium text-gray-900">ISBN:</span>
                    <span className="ml-2 text-gray-600">{book.isbn}</span>
                  </div>
                )}
                {book.publishedYear && (
                  <div>
                    <span className="font-medium text-gray-900">Published:</span>
                    <span className="ml-2 text-gray-600">{book.publishedYear}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {user && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <ReviewForm bookId={book._id} onReviewSubmitted={handleReviewSubmitted} />
        </div>
      )}

      {/* Reviews */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">
          Reviews ({reviews.length})
        </h3>
        
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No reviews yet. Be the first to review this book!
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900">
                        {review.userId.name}
                      </span>
                      <StarRating rating={review.rating} size="sm" readonly />
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                      {review.isEdited && ' (edited)'}
                    </p>
                  </div>
                </div>
                {review.reviewText && (
                  <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
