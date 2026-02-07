import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaBus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isAdminPage = location.pathname.startsWith('/admin');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = (e) => {
    if (!isAdminPage) {
      e.preventDefault();
      const newCount = clickCount + 1;
      setClickCount(newCount);
      
      if (newCount === 5) {
        navigate('/admin/login');
        setClickCount(0);
      } else {
        // Reset counter after 2 seconds of no clicks
        setTimeout(() => setClickCount(0), 2000);
      }
    }
  };

  const navLinks = isAdminPage ? [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/vehicles', label: 'Vehicles' },
    { path: '/admin/enquiries', label: 'Enquiries' },
    { path: '/admin/settings', label: 'Settings' }
  ] : [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/fleet', label: 'Fleet' },
    { path: '/booking', label: 'Booking' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 overflow-x-hidden ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-2xl' : 'bg-white/90 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link 
            to={isAdminPage ? "/" : "#"} 
            onClick={handleLogoClick}
            className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
          >
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 sm:p-3 rounded-2xl group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-110">
              <FaBus className="text-white text-2xl sm:text-3xl" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text whitespace-nowrap">SV Travels</h1>
              <p className="text-xs text-neutral-500 -mt-1 font-medium hidden sm:block">Sri Venkateshwara Travels</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold text-sm uppercase tracking-wide transition-all duration-300 relative ${
                  isActive(link.path)
                    ? 'text-teal-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600'
                    : 'text-neutral-700 hover:text-teal-600 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-600 hover:after:w-full after:transition-all after:duration-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isAdminPage && isAuthenticated && (
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-neutral-700 hover:text-teal-600 transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className={`font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-teal-600'
                      : 'text-neutral-700 hover:text-teal-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAdminPage && isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all text-left shadow-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
