import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [roomData, setRoomData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchParams = location.state?.searchParams;

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    // Giả lập dữ liệu phòng - trong thực tế sẽ lấy từ API dựa vào id
    const mockRoom = {
      id: id,
      name: "Deluxe Ocean View",
      description: "Spacious room with stunning ocean view",
      price: 299,
      image: "/assets/images/rooms/deluxe-1.jpg",
      amenities: ["Ocean View", "King Bed", "Free WiFi", "Mini Bar"]
    };
    setRoomData(mockRoom);
  }, [id]);

  const handleBookNow = () => {
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
      navigate('/login', {
        state: {
          from: location.pathname,
          roomData: roomData,
          searchParams: searchParams
        }
      });
      return;
    }

    if (!roomData) return;

    const bookingData = {
      ...roomData,
      checkIn: searchParams?.checkIn || '',
      checkOut: searchParams?.checkOut || '',
      totalPrice: calculateTotalPrice(roomData.price, searchParams?.checkIn, searchParams?.checkOut)
    };

    navigate('/payment', {
      state: {
        roomData: bookingData
      }
    });
  };

  const calculateTotalPrice = (price, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return price;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return price * nights;
  };

  if (!roomData) {
    return <div className="container mx-auto px-6 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{roomData.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={roomData.image}
            alt={roomData.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div>
            <p className="text-xl mb-4">{roomData.description}</p>
            <p className="text-2xl font-bold mb-4">${roomData.price} per night</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Amenities:</h3>
              <ul className="list-disc list-inside">
                {roomData.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            {searchParams && (
              <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Booking Details:</h3>
                <p>Check-in: {searchParams.checkIn}</p>
                <p>Check-out: {searchParams.checkOut}</p>
                <p>Guests: {searchParams.guests}</p>
              </div>
            )}
            <button
              onClick={handleBookNow}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isLoggedIn ? 'Book Now' : 'Login to Book'}
            </button>
            {!isLoggedIn && (
              <p className="mt-2 text-sm text-gray-600">
                Please login to book this room
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;