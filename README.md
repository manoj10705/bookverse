# BookVerse 📚

A modern book review platform built with React, Convex, and TypeScript. Discover books, write reviews, and connect with fellow readers.

## Features

- **Book Discovery**: Browse and search through a curated collection of books
- **User Reviews**: Write, edit, and delete book reviews with star ratings
- **User Profiles**: Personalized profiles showing review history and favorite genres
- **Real-time Updates**: Live updates powered by Convex
- **Authentication**: Secure user authentication with Convex Auth
- **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (database, real-time, auth)
- **Routing**: React Router DOM
- **UI Components**: Custom components with Tailwind
- **Notifications**: Sonner for toast notifications

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Convex](https://convex.dev/) account (free)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd bookverse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Convex

1. **Create a Convex account** at [convex.dev](https://convex.dev) if you haven't already
2. **Install Convex CLI** globally:
   ```bash
   npm install -g convex
   ```
3. **Login to Convex**:
   ```bash
   npx convex login
   ```
4. **Initialize Convex** (if not already done):
   ```bash
   npx convex dev
   ```
   This will:
   - Create a new Convex project
   - Generate a `.env.local` file with your deployment URL
   - Deploy your backend functions

### 4. Seed the Database (Optional)

To populate the database with sample books, run:

```bash
npx convex run seedData:seedBooks
```

### 5. Start the Development Server

```bash
npm run dev
```

This will start both the Convex backend and the React frontend. The app will be available at `http://localhost:5173`.

## Project Structure

```
bookverse/
├── convex/                 # Backend functions and schema
│   ├── auth.ts            # Authentication configuration
│   ├── books.ts           # Book-related functions
│   ├── reviews.ts         # Review-related functions
│   ├── users.ts           # User profile functions
│   ├── schema.ts          # Database schema
│   └── seedData.ts        # Sample data seeding
├── src/
│   ├── components/        # React components
│   │   ├── BookList.tsx   # Book browsing and search
│   │   ├── BookDetail.tsx # Individual book page
│   │   ├── UserProfile.tsx# User profile page
│   │   ├── AddBook.tsx    # Add new book form
│   │   ├── ReviewForm.tsx # Review creation/editing
│   │   └── StarRating.tsx # Star rating component
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the Convex backend
- `npm run build` - Build for production
- `npm run lint` - Run linting and type checking

## Key Features Explained

### Authentication
- Users can sign up/sign in with username and password
- Authentication is handled by Convex Auth
- User sessions persist across browser sessions

### Book Management
- Browse books with search and genre filtering
- Add new books to the collection
- View detailed book information with reviews

### Review System
- Rate books from 1-5 stars
- Write optional text reviews
- Edit or delete your own reviews
- View all reviews for a book

### User Profiles
- View your review history
- See your average rating given
- Track favorite genres (when profile is updated)

## Database Schema

The app uses three main tables:

1. **books** - Book information (title, author, genre, etc.)
2. **reviews** - User reviews with ratings and text
3. **userProfiles** - Extended user profile information

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your preferred hosting service

### Backend Deployment

The Convex backend is automatically deployed when you run `npx convex dev` or push to production.

For production deployment:
```bash
npx convex deploy --prod
```

## Environment Variables

The project uses these environment variables (automatically managed by Convex):

- `VITE_CONVEX_URL` - Your Convex deployment URL
- `CONVEX_DEPLOY_KEY` - Convex deployment key (for CI/CD)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## Troubleshooting

### Common Issues

1. **"Convex functions not found"**
   - Make sure you've run `npx convex dev` to deploy your functions
   - Check that your `.env.local` file contains the correct `VITE_CONVEX_URL`

2. **Authentication not working**
   - Ensure Convex Auth is properly configured
   - Check the browser console for any error messages

3. **Database schema errors**
   - If you modify the schema, you may need to clear existing data
   - Use the Convex dashboard to manage your data

### Getting Help

- Check the [Convex documentation](https://docs.convex.dev/)
- Visit the [Convex Discord](https://convex.dev/community) for community support
- Open an issue in this repository for project-specific problems

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Convex](https://convex.dev/) for the backend
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and images from [Unsplash](https://unsplash.com/)
