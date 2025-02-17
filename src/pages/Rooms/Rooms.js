import React, { useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Rooms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state?.searchParams;
  const { darkMode } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleBookNow = (room) => {
    navigate(`/room/${room.id}`, {
      state: {
        room,
        searchParams
      }
    });
  };

  const rooms = [
    {
      id: 1,
      name: "Phòng Deluxe Hướng Biển",
      description: "Phòng rộng rãi với tầm nhìn biển tuyệt đẹp",
      price: 2990000,
      image: "/assets/images/rooms/deluxe-1.jpg",
      amenities: ["Hướng Biển", "Giường King", "WiFi Miễn phí", "Mini Bar"],
      category: "deluxe",
      details: [
        "/assets/images/rooms/deluxe-1.jpg",
        "/assets/images/rooms/deluxe-2.jpg",
        "/assets/images/rooms/deluxe-3.jpg",
        "/assets/images/rooms/deluxe-4.jpg"
      ]
    },
    {
      id: 2,
      name: "Phòng Executive Suite",
      description: "Phòng suite sang trọng với tầm nhìn thành phố",
      price: 399,
      image: "/assets/images/rooms/suite-1.jpg",
      amenities: ["Hướng Thành phố", "Phòng khách", "Khu làm việc", "Phục vụ phòng"],
      details: [
        "/assets/images/rooms/suite-1.jpg",
        "/assets/images/rooms/suite-2.jpg",
        "/assets/images/rooms/suite-3.jpg",
        "/assets/images/rooms/suite-4.jpg"
      ]
    },
    {
      id: 3,
      name: "Phòng Suite Gia đình",
      description: "Hoàn hảo cho kỳ nghỉ gia đình",
      price: 499,
      image: "/assets/images/rooms/family-1.jpg",
      amenities: ["2 Phòng ngủ", "Bếp", "Phòng khách", "Khu vui chơi trẻ em"],
      details: [
        "/assets/images/rooms/family-1.jpg",
        "/assets/images/rooms/family-2.jpg",
        "/assets/images/rooms/family-3.jpg",
        "/assets/images/rooms/family-4.jpg"
      ]
    },
    {
      id: 4,
      name: "Phòng Premium Hướng Vườn",
      description: "Phòng yên tĩnh với tầm nhìn vườn",
      price: 249,
      image: "/assets/images/rooms/garden-1.jpg",
      amenities: ["Hướng Vườn", "Giường Queen", "Ban công", "Vòi sen Mưa"],
      details: [
        "/assets/images/rooms/garden-1.jpg",
        "/assets/images/rooms/garden-2.jpg",
        "/assets/images/rooms/garden-3.jpg",
        "/assets/images/rooms/garden-4.jpg"
      ]
    }
  ];

  const filters = [
    { id: 'all', name: 'Tất cả' },
    { id: 'deluxe', name: 'Phòng Deluxe' },
    { id: 'suite', name: 'Phòng Suite' },
    { id: 'family', name: 'Phòng Gia đình' }
  ];

  const filteredRooms = selectedFilter === 'all'
    ? rooms
    : rooms.filter(room => room.category === selectedFilter);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Hero Section */}
      <div className="relative h-64 mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/images/rooms/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative container mx-auto px-6 h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">
            Khám phá Phòng của Chúng tôi
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Search Results */}
        {searchParams && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`mb-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'
              }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Thông tin Tìm kiếm</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <i className="fas fa-calendar-check mr-2" />
                <div>
                  <p className="text-sm opacity-70">Ngày nhận phòng</p>
                  <p className="font-medium">{searchParams.checkIn}</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-calendar-times mr-2" />
                <div>
                  <p className="text-sm opacity-70">Ngày trả phòng</p>
                  <p className="font-medium">{searchParams.checkOut}</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-users mr-2" />
                <div>
                  <p className="text-sm opacity-70">Số khách</p>
                  <p className="font-medium">{searchParams.guests} người</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <motion.div
              key={room.id}
              variants={itemVariants}
              className={`room-item rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg hover:shadow-2xl transition-all duration-300`}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <RoomCard
                room={room}
                onBookNow={() => handleBookNow(room)}
                darkMode={darkMode}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Rooms;