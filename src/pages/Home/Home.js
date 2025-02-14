import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const Home = () => {
  const { darkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  // Mảng chứa đường dẫn các hình nền
  const backgroundImages = [
    '/assets/images/backgrounds/hero-bg.jpg',
    '/assets/images/backgrounds/hero-bg-2.jpg',
    '/assets/images/backgrounds/hero-bg-3.jpg',
    '/assets/images/backgrounds/hero-bg-4.jpg',
    // Thêm nhiều hình nền khác tại đây
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentImageIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={darkMode ? 'dark' : ''}
    >
      <ThemeToggle />
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
              zIndex: 1
            }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          className="navigation-arrow left-arrow"
          onClick={() => paginate(-1)}
        >
          ‹
        </button>
        <button
          className="navigation-arrow right-arrow"
          onClick={() => paginate(1)}
        >
          ›
        </button>

        <div className="absolute inset-0 bg-black bg-opacity-50 z-[2]" />
        <div className="relative container mx-auto px-6 py-32 z-[3]">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold leading-tight animate-fade-in text-white">
              Welcome to Luxury Hotel
            </h1>
            <p className="text-xl animate-fade-in-delay text-white mt-4 mb-8">
              Experience the perfect blend of comfort and luxury
            </p>
            <div className="animate-fade-in-delay-2">
              <SearchBar />
              {isLoggedIn && (
                <div className="mt-8">
                  <Link
                    to="/rooms"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                  >
                    Browse Rooms
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Rooms Section */}
      <motion.section
        className={`featured-rooms py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Featured Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              '/assets/images/rooms/deluxe-1.jpg',
              '/assets/images/rooms/suite-2.jpg',
              '/assets/images/rooms/family-1.jpg'
            ].map((imagePath, index) => (
              <motion.div
                key={index}
                className="room-preview group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative overflow-hidden">
                    <img
                      src={imagePath}
                      alt={`Luxury Room ${index + 1}`}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Luxury Room {index + 1}</h3>
                    <p className="text-gray-600 mb-4">Experience ultimate comfort and luxury</p>
                    <Link
                      to="/rooms"
                      className="text-blue-600 font-semibold hover:text-blue-700"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`rounded-2xl shadow-xl p-8 transform transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-2xl'
                }`}>
                <img
                  src="/assets/images/features/best-price.jpg"
                  alt="Best Prices"
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  Best Price Guarantee
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  Find a lower price? We'll match it!
                </p>
              </div>
            </motion.div>

            <motion.div
              className="group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`rounded-2xl shadow-xl p-8 transform transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-2xl'
                }`}>
                <img
                  src="/assets/images/features/easy-booking.jpg"
                  alt="Easy Booking"
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  Easy Booking
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  Book your stay in just a few clicks
                </p>
              </div>
            </motion.div>

            <motion.div
              className="group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`rounded-2xl shadow-xl p-8 transform transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-2xl'
                }`}>
                <img
                  src="/assets/images/features/support.jpg"
                  alt="24/7 Support"
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  24/7 Support
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  We're here to help anytime
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home; 