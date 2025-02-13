import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';

const Booking = () => {
  const { roomId } = useParams();

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Your Stay</h1>
      <BookingForm roomId={roomId} />
    </div>
  );
};

export default Booking; 