import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function UserProfile() {
  const userProfile = useQuery(api.users.getUserProfile, {});
  const userReviews = useQuery(api.reviews.getUserReviews, {});

  if (userProfile === undefined || userReviews === undefined) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
      </div>
    );
  }

  const averageRating = userReviews.length > 0
    ? userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length
    : 0;

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {"displayName" in userProfile && userProfile.displayName ? userProfile.displayName : userProfile.userName}
            </h1>
            <p className="text-gray-600">{userProfile.userEmail}</p>
          </div>
        </div>

        {"bio" in userProfile && userProfile.bio && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">About</h3>
            <p className="text-gray-600">{userProfile.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userReviews.length}</div>
            <div className="text-sm text-gray-600">Reviews Written</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Average Rating Given</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {"favoriteGenres" in userProfile && userProfile.favoriteGenres ? userProfile.favoriteGenres.length : 0}
            </div>
            <div className="text-sm text-gray-600">Favorite Genres</div>
          </div>
        </div>

        {"favoriteGenres" in userProfile && userProfile.favoriteGenres && userProfile.favoriteGenres.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-3">Favorite Genres</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.favoriteGenres.map((genre: string) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Reviews */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          My Reviews ({userReviews.length})
        </h2>
        
        {userReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userReviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Link
                      to={`/book/${review.bookId}`}
                      className="text-lg font-medium text-blue-600 hover:text-blue-700 mb-1 block"
                    >
                      {review.bookTitle}
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">by {review.bookAuthor}</p>
                    <div className="flex items-center space-x-3">
                      <StarRating rating={review.rating} size="sm" readonly />
                      <span className="text-sm text-gray-500">
                        {new Date(review._creationTime).toLocaleDateString()}
                      </span>
                      {review.isEdited && (
                        <span className="text-xs text-gray-500">(edited)</span>
                      )}
                    </div>
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
