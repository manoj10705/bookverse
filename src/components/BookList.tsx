import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { internal } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { toast } from "sonner";

export default function BookList() {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const books = useQuery(api.books.listBooks, { 
    genre: selectedGenre || undefined,
    searchQuery: searchQuery || undefined 
  });
  const genres = useQuery(api.books.getGenres);

  if (books === undefined || genres === undefined) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search books by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-48">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <Link
            key={book._id}
            to={`/book/${book._id}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="aspect-[3/4] bg-gray-200 relative">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-4xl">📖</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {book.genre}
                </span>
                <div className="flex items-center space-x-1">
                  <StarRating rating={book.averageRating} size="sm" readonly />
                  <span className="text-xs text-gray-500">
                    ({book.totalReviews})
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-6">
            <span className="text-6xl">📚</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || selectedGenre 
              ? "Try adjusting your search criteria or browse all books." 
              : "Be the first to add a book to the collection!"}
          </p>
          <Link
            to="/add-book"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add First Book
          </Link>
        </div>
      )}
    </div>
  );
}
