import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import OrderSuccess from './OrderSuccess';
import PaymentGateway from './PaymentGateway';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const tax = subtotal * 0.15; // 15% tax
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shippingCost.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + shippingCost + tax).toFixed(2)
    };
  };

  const handlePaymentComplete = () => {
    const totals = calculateTotal();
    // Save order details to local storage
    const order = {
      items: cart,
      totals,
      orderDate: new Date().toISOString(),
      orderId: Math.random().toString(36).substr(2, 9)
    };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Clear cart by removing each item
    cart.forEach(item => removeFromCart(item.id));
    
    // Hide payment gateway and show success message
    setShowPayment(false);
    setShowSuccess(true);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to your cart to continue shopping.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const totals = calculateTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {!showPayment ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        <Link to={`/product/${item.id}`} className="hover:text-primary-600">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <MinusIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <PlusIcon className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${totals.subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {totals.shipping === '0.00' ? 'Free' : `$${totals.shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (15%)</span>
                  <span className="text-gray-900">${totals.tax}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-xl font-bold text-primary-600">${totals.total}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {totals.shipping === '0.00' ? 'Free shipping applied!' : 'Free shipping on orders over $100'}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="w-full text-gray-600 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PaymentGateway 
          total={parseFloat(totals.total)} 
          onPaymentComplete={handlePaymentComplete} 
        />
      )}

      {/* Success Modal */}
      {showSuccess && <OrderSuccess onClose={() => setShowSuccess(false)} />}
    </div>
  );
};

export default Cart;
