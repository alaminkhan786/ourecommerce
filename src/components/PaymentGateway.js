import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCardIcon,
  BuildingLibraryIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const PaymentGateway = ({ total, onPaymentComplete }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show processing message
    const processingMessage = document.createElement('div');
    processingMessage.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg z-50';
    processingMessage.textContent = `Processing ${paymentMethod.toUpperCase()} payment...`;
    document.body.appendChild(processingMessage);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Remove processing message
      document.body.removeChild(processingMessage);
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50';
      successMessage.textContent = 'Payment successful! Redirecting...';
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
        onPaymentComplete();
        navigate('/order-confirmation');
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg z-50';
      errorMessage.textContent = 'Payment failed. Please try again.';
      document.body.appendChild(errorMessage);
      setTimeout(() => document.body.removeChild(errorMessage), 3000);
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatMobileNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return value;
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCardIcon },
    { id: 'bkash', name: 'bKash', icon: PhoneIcon },
    { id: 'nagad', name: 'Nagad', icon: PhoneIcon },
    { id: 'bank', name: 'Bank Transfer', icon: BuildingLibraryIcon },
    { id: 'ssl', name: 'SSL Commerce', icon: ShieldCheckIcon },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-8">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span className="text-primary-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {paymentMethods.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setPaymentMethod(id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                <Icon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <span className="block text-sm text-center">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Details Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {paymentMethod === 'card' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </>
          )}

          {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(formatMobileNumber(e.target.value))}
                  placeholder="017-XXXX-XXXX"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">
                  {paymentMethod === 'bkash'
                    ? 'You will receive a bKash payment confirmation message on your phone.'
                    : 'You will receive a Nagad payment confirmation message on your phone.'}
                </p>
              </div>
            </>
          )}

          {paymentMethod === 'bank' && (
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">Bank Transfer Details</h4>
              <p className="text-sm text-blue-800">
                Bank: Example Bank<br />
                Account Name: EcoShop Ltd<br />
                Account Number: 1234567890<br />
                Branch: Main Branch<br />
                SWIFT Code: EXBKBDXX
              </p>
            </div>
          )}

          {paymentMethod === 'ssl' && (
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-800">
                You will be redirected to SSL Commerce's secure payment gateway to complete your payment.
              </p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                `Pay $${total.toFixed(2)}`
              )}
            </button>
          </div>
        </form>

        {/* Payment Methods Icons */}
        <div className="mt-8 border-t pt-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Secure Payment Powered By</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 items-center">
            <img src="https://www.bkash.com/sites/all/themes/bkash/logo.png" alt="bKash" className="h-8 object-contain" />
            <img src="https://www.nagad.com.bd/wp-content/themes/nagad/images/nagad-logo.png" alt="Nagad" className="h-8 object-contain" />
            <img src="https://www.sslcommerz.com/wp-content/uploads/2019/11/footer_logo.png" alt="SSL Commerce" className="h-8 object-contain" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8 object-contain" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-8 object-contain" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="PayPal" className="h-8 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
