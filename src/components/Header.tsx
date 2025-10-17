import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold text-gray-900">BookVerse</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Browse Books
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/add-book" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Add Book
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Profile
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
