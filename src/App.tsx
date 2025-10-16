import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import UserProfile from "./components/UserProfile";
import AddBook from "./components/AddBook";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Content />
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

function Header() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              📚 BookVerse
            </Link>
            <Authenticated>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  Browse Books
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                  My Profile
                </Link>
                <Link to="/add-book" className="text-gray-700 hover:text-blue-600 font-medium">
                  Add Book
                </Link>
              </nav>
            </Authenticated>
          </div>
          
          <div className="flex items-center space-x-4">
            <Authenticated>
              <span className="text-sm text-gray-600">
                Welcome, {loggedInUser?.name || loggedInUser?.email}!
              </span>
              <SignOutButton />
            </Authenticated>
            <Unauthenticated>
              <span className="text-sm text-gray-600">Sign in to start reviewing</span>
            </Unauthenticated>
          </div>
        </div>
      </div>
    </header>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Authenticated>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </Authenticated>
      
      <Unauthenticated>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to BookVerse
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover amazing books and share your thoughts with fellow readers
            </p>
          </div>
          <SignInForm />
        </div>
      </Unauthenticated>
    </div>
  );
}
