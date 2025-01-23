import React from 'react';
import { 
  TruckIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const Delivery = () => {
  const deliveryFeatures = [
    {
      title: "Free Standard Delivery",
      description: "Free delivery on all orders over $50",
      icon: TruckIcon,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Worldwide Shipping",
      description: "We deliver to over 100 countries",
      icon: GlobeAltIcon,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Secure Delivery",
      description: "Track your package in real-time",
      icon: ShieldCheckIcon,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Express Delivery",
      description: "Get your items within 24 hours",
      icon: ClockIcon,
      color: "text-orange-600 bg-orange-100"
    }
  ];

  const deliveryOptions = [
    {
      name: "Standard Delivery",
      time: "3-5 business days",
      price: "Free",
      description: "For orders over $50"
    },
    {
      name: "Express Delivery",
      time: "1-2 business days",
      price: "$9.99",
      description: "Available for select areas"
    },
    {
      name: "Same Day Delivery",
      time: "Today",
      price: "$14.99",
      description: "Order before 2 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center px-8 py-20 rounded-lg" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-emerald-800/90" />
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold mb-4">Fast & Reliable Delivery</h1>
            <p className="text-lg mb-6">We ensure your packages arrive safely and on time. Track your delivery in real-time.</p>
            <div className="flex items-center space-x-2 text-green-200">
              <TruckIcon className="h-5 w-5" />
              <span>Free delivery on orders over $50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Features */}
      <div className="container mx-auto px-4 -mt-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deliveryFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300">
              <div className={`inline-block p-4 rounded-full ${feature.color} mb-6`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Options */}
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Delivery Options</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Choose the delivery option that suits you best</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deliveryOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent hover:border-primary-600 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4">{option.name}</h3>
              <div className="flex items-center space-x-3 text-gray-600 mb-6">
                <ClockIcon className="h-6 w-6" />
                <span className="text-lg">{option.time}</span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary-600">{option.price}</span>
              </div>
              <p className="text-gray-600 text-lg">{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 pb-24 max-w-7xl">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Everything you need to know about our delivery service</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">How can I track my order?</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package in real-time through our website or app.</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">What if I'm not home?</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Our delivery partner will attempt delivery up to 3 times. You can also choose to have your package delivered to a secure pickup location near you.</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Do you deliver internationally?</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Yes, we offer worldwide shipping to over 100 countries. Delivery times and costs vary by location.</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Is my package insured?</h3>
              <p className="text-gray-600 text-lg leading-relaxed">All deliveries are fully insured against loss or damage. We'll replace or refund any items that don't arrive in perfect condition.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
