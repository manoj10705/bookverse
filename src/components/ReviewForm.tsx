import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

interface ReviewFormProps {
  bookId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [existingReview, setExistingReview] = useState<any>(null);

  useEffect(() => {
    checkExistingReview();
  }, [bookId]);

  const checkExistingReview = async () => {
    try {
      const response = await axios.get(`/api/reviews/book/${bookId}`);
      const userReview = response.data.find((review: any) => 
        review.userId._id === localStorage.getItem('userId')
      );
      
      if (userReview) {
        setExistingReview(userReview);
        setRating(userReview.rating);
        setReviewText(userReview.reviewText || '');
      }
    } catch (err) {
      console.error('Error checking existing review:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await axios.post('/api/reviews', {
        bookId,
        rating,
        reviewText: reviewText.trim() || undefined
      });

      onReviewSubmitted();
      
      if (!existingReview) {
        setRating(0);
        setReviewText('');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        <StarRating 
          rating={rating} 
          onRatingChange={setRating}
          size="lg"
        />
      </div>

      <div>
        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
          Review (optional)
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Share your thoughts about this book..."
          maxLength={2000}
        />
        <p className="text-xs text-gray-500 mt-1">
          {reviewText.length}/2000 characters
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || rating === 0}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading 
          ? (existingReview ? 'Updating...' : 'Submitting...') 
          : (existingReview ? 'Update Review' : 'Submit Review')
        }
      </button>
    </form>
  );
};

export default ReviewForm;
