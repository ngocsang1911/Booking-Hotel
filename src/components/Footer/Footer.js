import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Hotel Booking</h3>
            <p className="text-gray-400">Best hotel booking experience</p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p className="text-gray-400">Email: info@hotel.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400">© 2024 Hotel Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 