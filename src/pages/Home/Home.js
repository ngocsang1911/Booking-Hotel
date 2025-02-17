import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import { images, defaultImages } from '../../assets/images';

// Thêm biến môi trường cho base URL của hình ảnh
const IMAGE_BASE_URL = process.env.PUBLIC_URL;

const Home = () => {
  const { darkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  // Cập nhật đường dẫn hình ảnh
  const backgroundImages = images.backgrounds;

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

  const featuredRooms = [
    {
      id: 1,
      name: "Phòng Tổng Thống",
      description: "Không gian đẳng cấp với tầm nhìn toàn cảnh",
      price: "15.000.000đ",
      image: images.rooms.presidential,
      tags: ["Sang trọng", "Độc quyền", "Dịch vụ VIP"]
    },
    {
      id: 2,
      name: "Suite Hoàng Gia",
      description: "Trải nghiệm đẳng cấp hoàng gia",
      price: "8.500.000đ",
      image: images.rooms.royalSuite,
      tags: ["Quý phái", "Tinh tế", "Riêng tư"]
    },
    {
      id: 3,
      name: "Penthouse Panorama",
      description: "Tầm nhìn 360 độ từ tầng thượng",
      price: "12.000.000đ",
      image: images.rooms.penthouse,
      tags: ["Cao cấp", "View Panorama", "Độc đáo"]
    }
  ];

  const services = [
    {
      icon: images.features.service,
      title: "Dịch Vụ VIP",
      description: "Phục vụ 24/7 với đội ngũ chuyên nghiệp"
    },
    {
      icon: images.features.restaurant,
      title: "Ẩm Thực Đỉnh Cao",
      description: "Nhà hàng 5 sao với đầu bếp quốc tế"
    },
    {
      icon: images.features.spa,
      title: "Spa & Wellness",
      description: "Thư giãn tuyệt đối với dịch vụ spa cao cấp"
    }
  ];

  // Thêm xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    const type = e.target.dataset.type || 'room';
    e.target.src = defaultImages[type];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={darkMode ? 'dark' : ''}
    >
      <ThemeToggle />

      {/* Hero Section với Video Background */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={backgroundImages[currentImageIndex]}
            alt="Hotel Background"
            className="absolute w-full h-full object-cover"
            onError={handleImageError}
            data-type="background"
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        <div className="relative container mx-auto px-6 py-32 z-[3]">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold leading-tight animate-fade-in text-white mb-6">
              Khách Sạn Sang Chảnh
            </h1>
            <p className="text-2xl animate-fade-in-delay text-white/90 mb-12">
              Nơi Đẳng Cấp Gặp Gỡ Sự Tinh Tế
            </p>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
              <SearchBar />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <p className="text-sm mb-2">Khám phá thêm</p>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Thống kê ấn tượng */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10+", text: "Năm Kinh Nghiệm" },
              { number: "150+", text: "Phòng Sang Trọng" },
              { number: "50+", text: "Giải Thưởng" },
              { number: "98%", text: "Khách Hài Lòng" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.number}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phòng Nổi bật với Animation */}
      <motion.section
        className={`featured-rooms py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
              Phòng Đẳng Cấp
            </h2>
            <p className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Trải nghiệm không gian sống đỉnh cao với thiết kế sang trọng và tiện nghi hiện đại
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
                whileHover={{ y: -10 }}
              >
                <div className={`rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-700' : 'bg-white'} 
                  transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]`}>
                  <div className="relative h-[300px]"> {/* Fixed height container */}
                    <img
                      src={room.image}
                      alt={room.name}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={handleImageError}
                      data-type="room"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex gap-3 mb-3 flex-wrap">
                        {room.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-full text-white text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-3">
                        {room.name}
                      </h3>
                      <p className="text-white/90 text-xl font-medium">
                        Từ {room.price}/đêm
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Dịch vụ & Tiện ích */}
      <section className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
              Dịch Vụ Đẳng Cấp
            </h2>
            <p className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Trải nghiệm dịch vụ 5 sao chuẩn quốc tế với đội ngũ chuyên nghiệp
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`p-10 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}
                  transition-all duration-500 transform hover:shadow-[0_10px_40px_rgba(8,_112,_184,_0.4)]`}
              >
                <div className="relative w-20 h-20 mb-6 mx-auto overflow-hidden rounded-2xl">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    onError={handleImageError}
                    data-type="feature"
                  />
                </div>
                <h3 className={`text-2xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center text-lg`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home; 