import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Menu, X } from 'lucide-react';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className={`relative z-50 ${transparent ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-lavender-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-lavender-600 bg-clip-text text-transparent">
              MentorMatch
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">How It Works</a>
            <a href="#mentors" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">For Mentors</a>
            <a href="#learners" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">For Learners</a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-2xl border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">How It Works</a>
              <a href="#mentors" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">For Mentors</a>
              <a href="#learners" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">For Learners</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;