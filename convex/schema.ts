import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  books: defineTable({
    title: v.string(),
    author: v.string(),
    genre: v.string(),
    description: v.string(),
    coverUrl: v.optional(v.string()),
    isbn: v.optional(v.string()),
    publishedYear: v.optional(v.number()),
    averageRating: v.number(),
    totalReviews: v.number(),
  })
    .index("by_genre", ["genre"])
    .index("by_author", ["author"])
    .searchIndex("search_books", {
      searchField: "title",
      filterFields: ["genre", "author"],
    }),

  reviews: defineTable({
    bookId: v.id("books"),
    userId: v.id("users"),
    rating: v.number(),
    reviewText: v.optional(v.string()),
    isEdited: v.boolean(),
  })
    .index("by_book", ["bookId"])
    .index("by_user", ["userId"])
    .index("by_book_and_user", ["bookId", "userId"]),

  userProfiles: defineTable({
    userId: v.id("users"),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    favoriteGenres: v.array(v.string()),
    totalReviews: v.number(),
  })
    .index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
