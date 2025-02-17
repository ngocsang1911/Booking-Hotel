import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Thay thế react-icons bằng SVG components
const CalendarIcon = () => (
  <svg className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const SearchBar = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/rooms', {
      state: {
        searchParams: {
          checkIn: checkIn ? checkIn.toLocaleDateString() : '',
          checkOut: checkOut ? checkOut.toLocaleDateString() : '',
          guests
        }
      }
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-4 shadow-2xl border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Check-in Date */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <CalendarIcon />
            </div>
            <DatePicker
              selected={checkIn}
              onChange={date => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Ngày nhận phòng"
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 hover:bg-white/10 transition-all"
              calendarClassName="search-calendar"
            />
          </div>

          {/* Check-out Date */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <CalendarIcon />
            </div>
            <DatePicker
              selected={checkOut}
              onChange={date => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Ngày trả phòng"
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 hover:bg-white/10 transition-all"
              calendarClassName="search-calendar"
            />
          </div>

          {/* Guests */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <UserIcon />
            </div>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 hover:bg-white/10 transition-all"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num} className="text-gray-900">
                  {num} {num === 1 ? 'Khách' : 'Khách'}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500/80 to-blue-400/80 backdrop-blur-sm text-white rounded-xl flex items-center justify-center space-x-2 hover:from-blue-500/90 hover:to-blue-400/90 transition-all shadow-lg hover:shadow-blue-500/25"
          >
            <SearchIcon />
            <span>Tìm Phòng</span>
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchBar; 