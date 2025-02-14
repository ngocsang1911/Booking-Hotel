import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Chuyển hướng đến trang Rooms với các tham số tìm kiếm
    navigate('/rooms', {
      state: {
        searchParams
      }
    });
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={searchParams.checkIn}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={searchParams.checkOut}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Guests</label>
          <input
            type="number"
            name="guests"
            min="1"
            value={searchParams.guests}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar; 