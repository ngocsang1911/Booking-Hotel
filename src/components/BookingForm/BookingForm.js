import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ roomId }) => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đặt phòng ở đây
    console.log({
      roomId,
      checkIn,
      checkOut,
      guests
    });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label>Check-in Date:</label>
        <DatePicker
          selected={checkIn}
          onChange={date => setCheckIn(date)}
          className="date-picker"
        />
      </div>
      
      <div className="form-group">
        <label>Check-out Date:</label>
        <DatePicker
          selected={checkOut}
          onChange={date => setCheckOut(date)}
          className="date-picker"
        />
      </div>

      <div className="form-group">
        <label>Number of Guests:</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={e => setGuests(parseInt(e.target.value))}
          className="guest-input"
        />
      </div>

      <button type="submit" className="submit-btn">
        Book Now
      </button>
    </form>
  );
};

export default BookingForm; 