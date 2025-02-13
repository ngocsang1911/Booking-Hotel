import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from '../Modal/AuthModal';

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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Hotel Booking
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            <Link to="/rooms" className="text-gray-600 hover:text-gray-800">Rooms</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
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