import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get all books with pagination
export const listBooks = query({
  args: {
    genre: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.searchQuery) {
      return await ctx.db
        .query("books")
        .withSearchIndex("search_books", (q) => {
          let searchQuery = q.search("title", args.searchQuery!);
          if (args.genre) {
            searchQuery = searchQuery.eq("genre", args.genre);
          }
          return searchQuery;
        })
        .collect();
    }

    if (args.genre) {
      return await ctx.db
        .query("books")
        .withIndex("by_genre", (q) => q.eq("genre", args.genre!))
        .order("desc")
        .take(50);
    }

    return await ctx.db.query("books").order("desc").take(50);
  },
});

// Get a single book by ID
export const getBook = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.bookId);
  },
});

// Get all unique genres
export const getGenres = query({
  args: {},
  handler: async (ctx) => {
    const books = await ctx.db.query("books").collect();
    const genres = [...new Set(books.map(book => book.genre))];
    return genres.sort();
  },
});

// Add a new book (admin function)
export const addBook = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    genre: v.string(),
    description: v.string(),
    coverUrl: v.optional(v.string()),
    isbn: v.optional(v.string()),
    publishedYear: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to add books");
    }

    return await ctx.db.insert("books", {
      ...args,
      averageRating: 0,
      totalReviews: 0,
    });
  },
});

// Update book rating (called when reviews are added/updated/deleted)
export const updateBookRating = mutation({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_book", (q) => q.eq("bookId", args.bookId))
      .collect();

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    await ctx.db.patch(args.bookId, {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews,
    });
  },
});
