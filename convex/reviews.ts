import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";

// Get reviews for a specific book
export const getBookReviews = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_book", (q) => q.eq("bookId", args.bookId))
      .order("desc")
      .collect();

    // Get user info for each review
    const reviewsWithUsers = await Promise.all(
      reviews.map(async (review) => {
        const user = await ctx.db.get(review.userId);
        return {
          ...review,
          userName: user?.name || user?.email || "Anonymous",
        };
      })
    );

    return reviewsWithUsers;
  },
});

// Get reviews by a specific user
export const getUserReviews = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const currentUserId = await getAuthUserId(ctx);
    const targetUserId = args.userId || currentUserId;
    
    if (!targetUserId) {
      return [];
    }

    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", targetUserId))
      .order("desc")
      .collect();

    // Get book info for each review
    const reviewsWithBooks = await Promise.all(
      reviews.map(async (review) => {
        const book = await ctx.db.get(review.bookId);
        return {
          ...review,
          bookTitle: book?.title || "Unknown Book",
          bookAuthor: book?.author || "Unknown Author",
        };
      })
    );

    return reviewsWithBooks;
  },
});

// Check if user has already reviewed a book
export const getUserBookReview = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const existingReview = await ctx.db
      .query("reviews")
      .withIndex("by_book_and_user", (q) => 
        q.eq("bookId", args.bookId).eq("userId", userId)
      )
      .unique();

    return existingReview;
  },
});

// Add or update a review
export const addOrUpdateReview = mutation({
  args: {
    bookId: v.id("books"),
    rating: v.number(),
    reviewText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to review books");
    }

    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    // Check if user already has a review for this book
    const existingReview = await ctx.db
      .query("reviews")
      .withIndex("by_book_and_user", (q) => 
        q.eq("bookId", args.bookId).eq("userId", userId)
      )
      .unique();

    let reviewId;
    if (existingReview) {
      // Update existing review
      await ctx.db.patch(existingReview._id, {
        rating: args.rating,
        reviewText: args.reviewText,
        isEdited: true,
      });
      reviewId = existingReview._id;
    } else {
      // Create new review
      reviewId = await ctx.db.insert("reviews", {
        bookId: args.bookId,
        userId,
        rating: args.rating,
        reviewText: args.reviewText,
      });
    }

    // Update book's average rating
    await ctx.runMutation(api.books.updateBookRating, { bookId: args.bookId });

    return reviewId;
  },
});

// Delete a review
export const deleteReview = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to delete reviews");
    }

    const review = await ctx.db.get(args.reviewId);
    if (!review) {
      throw new Error("Review not found");
    }

    if (review.userId !== userId) {
      throw new Error("Can only delete your own reviews");
    }

    await ctx.db.delete(args.reviewId);

    // Update book's average rating
    await ctx.runMutation(api.books.updateBookRating, { bookId: review.bookId });
  },
});
