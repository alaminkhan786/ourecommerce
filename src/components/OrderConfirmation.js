import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const OrderConfirmation = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Generate random order number

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Thank you for your order!</h1>
        <p className="mt-2 text-lg text-gray-600">
          Your order has been successfully placed and is being processed.
        </p>
      </div>

      <div className="mt-12 bg-white shadow rounded-lg p-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
          <p className="mt-1 text-sm text-gray-600">Order #{orderNumber}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Status:</span>
            <span className="font-medium text-green-600">Confirmed</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="font-medium">
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Method:</span>
            <span className="font-medium">Standard Shipping</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">Credit Card (ending in ****)</span>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              1. You will receive an order confirmation email with your order details.
            </p>
            <p>
              2. Once your order ships, we'll send you a shipping confirmation email with tracking information.
            </p>
            <p>
              3. You can track your order status anytime by logging into your account.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="block w-full text-center bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account/orders"
            className="block w-full text-center text-gray-600 hover:text-gray-900"
          >
            View Order History
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Email us at: support@ecoshop.com</p>
          <p>Call us at: 1-800-ECOSHOP</p>
          <p>Our customer service team is available 24/7</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
