// PaymentForm.js
import React, { useState } from 'react';
import './PaymentForm.css';

const PaymentForm = ({ onSubmit }) => {
  const [paymentData, setPaymentData] = useState({
    amount: 500,
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Additional validation can be added here

    // Pass paymentData to the parent component for processing
    onSubmit(paymentData);
  };

  return (
    <div className="payment-form">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <p>₹{paymentData.amount}</p>
        </div>

        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            placeholder="Enter card number"
            required
          />
        </div>

        <div>
          <label>Expiration Date:</label>
          <input
            type="text"
            name="expirationDate"
            value={paymentData.expirationDate}
            onChange={handleInputChange}
            placeholder="MM/YYYY"
            required
          />
        </div>

        <div>
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleInputChange}
            placeholder="CVV"
            required
          />
        </div>

        <div>
          <button type="submit">Submit Payment</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
