import { internalMutation } from "./_generated/server";

export const seedBooks = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if books already exist
    const existingBooks = await ctx.db.query("books").take(1);
    if (existingBooks.length > 0) {
      return "Books already seeded";
    }

    const sampleBooks = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway.",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
        publishedYear: 1925,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch.",
        coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        publishedYear: 1960,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        description: "A dystopian social science fiction novel about totalitarian control and the struggle for individual freedom in a surveillance state.",
        coverUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop",
        publishedYear: 1949,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        description: "A romantic novel that critiques the British landed gentry at the end of the 18th century, following Elizabeth Bennet and Mr. Darcy.",
        coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        publishedYear: 1813,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        description: "A controversial coming-of-age story following teenager Holden Caulfield's experiences in New York City.",
        coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
        publishedYear: 1951,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        description: "An epic science fiction novel set in a distant future amidst a feudal interstellar society, focusing on politics, religion, and ecology.",
        coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
        publishedYear: 1965,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "An epic high fantasy novel following the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
        coverUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
        publishedYear: 1954,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        description: "The first book in the beloved series about a young wizard discovering his magical heritage and attending Hogwarts School.",
        coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        publishedYear: 1997,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "A children's fantasy novel about Bilbo Baggins' unexpected journey with dwarves to reclaim their mountain home from a dragon.",
        coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        publishedYear: 1937,
        averageRating: 0,
        totalReviews: 0,
      },
      {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "Non-Fiction",
        description: "A thought-provoking exploration of human history from the Stone Age to the present, examining how Homo sapiens came to dominate the world.",
        coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
        publishedYear: 2011,
        averageRating: 0,
        totalReviews: 0,
      },
    ];

    for (const book of sampleBooks) {
      await ctx.db.insert("books", book);
    }

    return `Seeded ${sampleBooks.length} books`;
  },
});
