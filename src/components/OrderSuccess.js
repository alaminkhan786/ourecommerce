import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const OrderSuccess = ({ onClose }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/order-confirmation');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform animate-slideIn">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 animate-bounce" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
          <p className="mt-2 text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          <div className="mt-6 space-y-2">
            <div className="text-sm text-gray-500">
              You will receive an email confirmation shortly.
            </div>
            <div className="text-sm text-gray-500">
              Redirecting to order confirmation page in 5 seconds...
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={() => navigate('/order-confirmation')}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              View Order Details
            </button>
            <button
              onClick={() => navigate('/products')}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
