import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";
import { toast } from "sonner";

export default function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const book = useQuery(api.books.getBook, { 
    bookId: bookId as Id<"books"> 
  });
  const reviews = useQuery(api.reviews.getBookReviews, { 
    bookId: bookId as Id<"books"> 
  });
  const userReview = useQuery(api.reviews.getUserBookReview, { 
    bookId: bookId as Id<"books"> 
  });
  
  const deleteReview = useMutation(api.reviews.deleteReview);

  if (book === undefined || reviews === undefined) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          ← Back to Books
        </Link>
      </div>
    );
  }

  const handleDeleteReview = async () => {
    if (!userReview) return;
    
    try {
      await deleteReview({ reviewId: userReview._id });
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
        ← Back to Books
      </Link>

      {/* Book Info */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="aspect-[3/4] bg-gray-200">
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
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <StarRating rating={book.averageRating} size="lg" readonly />
                <span className="text-lg font-medium">
                  {book.averageRating.toFixed(1)}
                </span>
                <span className="text-gray-500">
                  ({book.totalReviews} review{book.totalReviews !== 1 ? 's' : ''})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="font-medium text-gray-700">Genre:</span>
                <span className="ml-2 text-gray-600">{book.genre}</span>
              </div>
              {book.publishedYear && (
                <div>
                  <span className="font-medium text-gray-700">Published:</span>
                  <span className="ml-2 text-gray-600">{book.publishedYear}</span>
                </div>
              )}
              {book.isbn && (
                <div>
                  <span className="font-medium text-gray-700">ISBN:</span>
                  <span className="ml-2 text-gray-600">{book.isbn}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{book.description}</p>
            </div>

            {/* Review Actions */}
            <div className="flex space-x-4">
              {userReview ? (
                <>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit My Review
                  </button>
                  <button
                    onClick={handleDeleteReview}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete My Review
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Write a Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          bookId={book._id}
          existingReview={userReview}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Reviews ({reviews.length})
        </h2>
        
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
                        {review.userName}
                      </span>
                      <StarRating rating={review.rating} size="sm" readonly />
                      {review.isEdited && (
                        <span className="text-xs text-gray-500">(edited)</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(review._creationTime).toLocaleDateString()}
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
}
