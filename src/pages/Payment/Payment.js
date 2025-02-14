import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formattedData, setFormattedData] = useState({
        name: '',
        price: 0,
        totalPrice: 0,
        checkIn: '',
        checkOut: '',
    });

    // Format giá tiền
    const formatPrice = (price) => {
        if (!price) return '0 VND';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Format ngày tháng
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        } catch (error) {
            return '';
        }
    };

    useEffect(() => {
        // Kiểm tra xem có dữ liệu được truyền qua không
        if (!location.state?.roomData) {
            // Nếu không có dữ liệu, chuyển về trang rooms
            navigate('/rooms');
            return;
        }

        const data = location.state.roomData;
        setFormattedData({
            name: data.name || '',
            price: data.price || 0,
            totalPrice: data.totalPrice || data.price || 0,
            checkIn: formatDate(data.checkIn),
            checkOut: formatDate(data.checkOut)
        });
    }, [location.state, navigate]);

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thanh toán thành công!');
        navigate('/');
    };

    return (
        <div className="payment-container">
            <div className="payment-form">
                <h2>Thanh Toán</h2>

                <div className="booking-summary">
                    <h3>Thông tin đặt phòng</h3>
                    <p>Tên phòng: {formattedData.name}</p>
                    <p>Giá: {formatPrice(formattedData.price)}/đêm</p>
                    {formattedData.checkIn && (
                        <p>Ngày nhận phòng: {formattedData.checkIn}</p>
                    )}
                    {formattedData.checkOut && (
                        <p>Ngày trả phòng: {formattedData.checkOut}</p>
                    )}
                    <p>Tổng tiền: {formatPrice(formattedData.totalPrice)}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Số thẻ</label>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentInfo.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tên chủ thẻ</label>
                        <input
                            type="text"
                            name="cardHolder"
                            placeholder="NGUYEN VAN A"
                            value={paymentInfo.cardHolder}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Ngày hết hạn</label>
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={paymentInfo.expiryDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                placeholder="123"
                                value={paymentInfo.cvv}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="payment-button">
                        Xác nhận thanh toán
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;