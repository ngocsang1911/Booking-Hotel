import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/backgrounds/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-6 py-32">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              '/assets/images/rooms/deluxe-1.jpg',
              '/assets/images/rooms/suite-2.jpg',
              '/assets/images/rooms/family-1.jpg'
            ].map((imagePath, index) => (
              <div key={index} className="room-preview group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform group-hover:-translate-y-2 transition-all duration-300">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform group-hover:-translate-y-2 transition-all duration-300">
                <img 
                  src="/assets/images/features/best-price.jpg" 
                  alt="Best Prices" 
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className="text-xl font-bold mb-4">Best Price Guarantee</h3>
                <p className="text-gray-600">Find a lower price? We'll match it!</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform group-hover:-translate-y-2 transition-all duration-300">
                <img 
                  src="/assets/images/features/easy-booking.jpg" 
                  alt="Easy Booking" 
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className="text-xl font-bold mb-4">Easy Booking</h3>
                <p className="text-gray-600">Book your stay in just a few clicks</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform group-hover:-translate-y-2 transition-all duration-300">
                <img 
                  src="/assets/images/features/support.jpg" 
                  alt="24/7 Support" 
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
                <p className="text-gray-600">We're here to help anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 