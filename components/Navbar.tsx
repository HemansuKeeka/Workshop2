
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">FreeFlow</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition">Home</Link>
            <a href="#features" className="text-slate-600 hover:text-indigo-600 font-medium transition">Features</a>
            <a href="#pricing" className="text-slate-600 hover:text-indigo-600 font-medium transition">Pricing</a>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/welcome" className="text-slate-600 hover:text-indigo-600 font-medium transition">Dashboard</Link>
                <button 
                  onClick={onLogout}
                  className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full font-semibold hover:bg-slate-200 transition"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/signin" className="text-slate-600 hover:text-indigo-600 font-medium transition">Sign In</Link>
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >
                  Join the Hype
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 border-t border-slate-100 p-4 space-y-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Home</Link>
          <a href="#features" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Features</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Pricing</a>
          {user ? (
            <>
              <Link to="/welcome" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Dashboard</Link>
              <button 
                onClick={() => { onLogout(); setIsOpen(false); }}
                className="w-full text-left text-slate-600 font-medium"
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <Link to="/signin" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Sign In</Link>
              <Link 
                to="/signup" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                Join the Hype
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
