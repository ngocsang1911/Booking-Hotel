import React from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import { useNavigate, useLocation } from 'react-router-dom';

const Rooms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state?.searchParams;

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
      name: "Deluxe Ocean View",
      description: "Spacious room with stunning ocean view",
      price: 299,
      image: "/assets/images/rooms/deluxe-1.jpg",
      amenities: ["Ocean View", "King Bed", "Free WiFi", "Mini Bar"],
      details: [
        "/assets/images/rooms/deluxe-1.jpg",
        "/assets/images/rooms/deluxe-2.jpg",
        "/assets/images/rooms/deluxe-3.jpg",
        "/assets/images/rooms/deluxe-4.jpg"
      ]
    },
    {
      id: 2,
      name: "Executive Suite",
      description: "Luxury suite with city skyline view",
      price: 399,
      image: "/assets/images/rooms/suite-1.jpg",
      amenities: ["City View", "Living Room", "Work Space", "Butler Service"],
      details: [
        "/assets/images/rooms/suite-1.jpg",
        "/assets/images/rooms/suite-2.jpg",
        "/assets/images/rooms/suite-3.jpg",
        "/assets/images/rooms/suite-4.jpg"
      ]
    },
    {
      id: 3,
      name: "Family Suite",
      description: "Perfect for family stays",
      price: 499,
      image: "/assets/images/rooms/family-1.jpg",
      amenities: ["2 Bedrooms", "Kitchen", "Living Room", "Children's Play Area"],
      details: [
        "/assets/images/rooms/family-1.jpg",
        "/assets/images/rooms/family-2.jpg",
        "/assets/images/rooms/family-3.jpg",
        "/assets/images/rooms/family-4.jpg"
      ]
    },
    {
      id: 4,
      name: "Premium Garden View",
      description: "Peaceful room with garden view",
      price: 249,
      image: "/assets/images/rooms/garden-1.jpg",
      amenities: ["Garden View", "Queen Bed", "Balcony", "Rain Shower"],
      details: [
        "/assets/images/rooms/garden-1.jpg",
        "/assets/images/rooms/garden-2.jpg",
        "/assets/images/rooms/garden-3.jpg",
        "/assets/images/rooms/garden-4.jpg"
      ]
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Rooms</h1>
        {searchParams && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Search Results</h2>
            <p>Check-in: {searchParams.checkIn}</p>
            <p>Check-out: {searchParams.checkOut}</p>
            <p>Guests: {searchParams.guests}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onBookNow={() => handleBookNow(room)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;