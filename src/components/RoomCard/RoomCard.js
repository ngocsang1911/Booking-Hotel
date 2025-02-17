import React from 'react';
import { motion } from 'framer-motion';

const RoomCard = ({ room, onBookNow, darkMode }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className={`h-full flex flex-col ${darkMode ? 'text-white' : 'text-gray-800'
      }`}>
      <div className="relative overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full">
          {formatPrice(room.price)}/đêm
        </div>
      </div>

      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{room.name}</h3>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {room.description}
        </p>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Tiện nghi:</h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity, index) => (
              <span
                key={index}
                className={`text-sm px-3 py-1 rounded-full ${darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                  }`}
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBookNow}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Đặt Ngay
        </motion.button>
      </div>
    </div>
  );
};

export default RoomCard; 