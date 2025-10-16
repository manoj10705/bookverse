import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get or create user profile
export const getUserProfile = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const currentUserId = await getAuthUserId(ctx);
    const targetUserId = args.userId || currentUserId;
    
    if (!targetUserId) return null;

    const user = await ctx.db.get(targetUserId);
    if (!user) return null;

    let profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", targetUserId))
      .unique();

    if (!profile) {
      // Return user info without profile for now
      return {
        userId: targetUserId,
        totalReviews: 0,
        userName: user.name || user.email || "Anonymous",
        userEmail: user.email,
      };
    }

    return {
      ...profile,
      userName: user.name || user.email || "Anonymous",
      userEmail: user.email,
    };
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    favoriteGenres: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to update profile");
    }

    let profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) {
      // Create new profile
      return await ctx.db.insert("userProfiles", {
        userId,
        totalReviews: 0,
        ...args,
      });
    } else {
      // Update existing profile
      await ctx.db.patch(profile._id, args);
      return profile._id;
    }
  },
});
