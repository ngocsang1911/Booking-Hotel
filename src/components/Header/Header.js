import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthModal from '../Modal/AuthModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode } = useTheme();
  const location = useLocation();
  const isRoomsPage = location.pathname === '/rooms';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        isLoggedIn: true
      }));
      setUser({ email: formData.email, isLoggedIn: true });
      setShowLoginModal(false);
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    localStorage.setItem('user', JSON.stringify({
      name: formData.name,
      email: formData.email,
      isLoggedIn: true
    }));
    setUser({ name: formData.name, email: formData.email, isLoggedIn: true });
    setShowRegisterModal(false);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
  };

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/rooms', label: 'Phòng' },
    { path: '/services', label: 'Dịch vụ' },
    { path: '/about', label: 'Về chúng tôi' },
    { path: '/contact', label: 'Liên hệ' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isRoomsPage
        ? darkMode
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-2xl font-bold ${isScrolled || isRoomsPage
                ? darkMode
                  ? 'text-white'
                  : 'text-gray-900'
                : isRoomsPage
                  ? 'text-gray-900'
                  : 'text-white'
                }`}
            >
              Khách Sạn Sang Chảnh
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative group ${isScrolled || isRoomsPage
                  ? darkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  : isRoomsPage
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-white hover:text-white/90'
                  }`}
              >
                {link.label}
                <motion.div
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode
                    ? 'bg-blue-400'
                    : isRoomsPage
                      ? 'bg-blue-600'
                      : 'bg-white'
                    } group-hover:w-full transition-all duration-300`}
                  whileHover={{ width: '100%' }}
                />
                {location.pathname === link.path && (
                  <motion.div
                    className={`absolute -bottom-1 left-0 w-full h-0.5 ${darkMode
                      ? 'bg-blue-400'
                      : isRoomsPage
                        ? 'bg-blue-600'
                        : 'bg-white'
                      }`}
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className={`${isScrolled || isRoomsPage
                    ? darkMode ? 'text-white' : 'text-gray-900'
                    : 'text-white'
                    }`}>
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-rose-500/25 font-medium"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className={`px-6 py-2.5 rounded-xl transition-all duration-300 font-medium ${darkMode
                        ? 'bg-gradient-to-r from-purple-500/90 to-violet-500/90 text-white hover:from-purple-600 hover:to-violet-600'
                        : isRoomsPage
                          ? 'bg-gradient-to-r from-violet-500/90 to-purple-500/90 text-white hover:from-violet-600 hover:to-purple-600'
                          : 'bg-gradient-to-r from-violet-500/90 to-purple-500/90 text-white hover:from-violet-600 hover:to-purple-600'
                      } shadow-lg hover:shadow-violet-500/25`}
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled || isRoomsPage
              ? darkMode
                ? 'text-white'
                : 'text-gray-900'
              : isRoomsPage
                ? 'text-gray-900'
                : 'text-white'
              }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden mt-4 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 ${darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Modal */}
      <AuthModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Don't have an account? Create one
            </button>
          </div>
        </form>
      </AuthModal>

      {/* Register Modal */}
      <AuthModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Create Account
          </button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setShowRegisterModal(false);
                setShowLoginModal(true);
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </AuthModal>
    </header>
  );
};

export default Header; 