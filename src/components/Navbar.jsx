import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuth } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLandingPage = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to={isAuth ? "/home" : "/"} className="flex items-center gap-2">
          <Terminal className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DeployDash
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {isLandingPage && !isAuth ? (
            ['Features', 'Demo', 'Docs'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-text-muted hover:text-text-base font-medium transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </a>
            ))
          ) : (
            <Link to={isAuth ? "/home" : "/"} className="text-text-muted hover:text-text-base font-medium transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-text-muted hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {!isAuth ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" magnetic className="hidden md:flex">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="text-sm font-medium text-text-muted hover:text-red-400 transition-colors hidden md:block"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
