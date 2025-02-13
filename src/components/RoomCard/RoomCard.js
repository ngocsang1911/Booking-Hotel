import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const { id, name, description, price, image, amenities } = room;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-bl-lg">
          ${price}/night
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-gray-700">Amenities:</h4>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-100"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <Link 
          to={`/room/${id}`} 
          className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard; 