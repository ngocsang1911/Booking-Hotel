import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Giả lập dữ liệu phòng - trong thực tế sẽ lấy từ API
  const room = {
    id: id,
    name: "Deluxe Ocean View", 
    description: "Experience luxury living with breathtaking ocean views. Our Deluxe Ocean View rooms offer the perfect blend of comfort and sophistication.",
    price: 299,
    size: "45m²",
    maxGuests: 2,
    bedType: "King Size",
    images: [
      "/assets/images/rooms/deluxe-1.jpg",
      "/assets/images/rooms/deluxe-2.jpg",
      "/assets/images/rooms/deluxe-3.jpg",
      "/assets/images/rooms/deluxe-4.jpg"
    ],
    amenities: [
      "Ocean View",
      "King Size Bed", 
      "Free WiFi",
      "Mini Bar",
      "Room Service",
      "Air Conditioning",
      "Smart TV",
      "Coffee Maker",
      "In-room Safe",
      "Premium Toiletries"
    ]
  };

  const handleBookNow = () => {
    // Chuyển hướng đến trang checkout với ID phòng và thông tin đặt phòng
    navigate(`/checkout/${room.id}`, {
      state: {
        roomName: room.name,
        price: room.price,
        checkIn: new Date(),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
        guests: 2,
        nights: 1
      }
    });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <ImageGallery images={room.images} />
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
            <p className="text-gray-600">{room.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              ${room.price}<span className="text-gray-500 text-lg">/night</span>
            </div>
            <button
              onClick={handleBookNow}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
          <BookingForm roomId={id} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;