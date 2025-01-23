import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Products from '../Products';

const Deals = () => {
  const dealCategories = [
    {
      title: "Flash Sale",
      discount: "Up to 70% Off",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      gradient: "from-pink-500 to-rose-500",
      validUntil: "24h"
    },
    {
      title: "Clearance",
      discount: "Up to 50% Off",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      gradient: "from-purple-500 to-indigo-500",
      validUntil: "This Week"
    },
    {
      title: "Bundle Deals",
      discount: "Buy 2 Get 1 Free",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      gradient: "from-orange-500 to-amber-500",
      validUntil: "Limited Time"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center px-8 py-20 rounded-lg" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90" />
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold mb-4">Hot Deals & Discounts</h1>
            <p className="text-lg mb-6">Discover amazing savings on your favorite products. Limited time offers you don't want to miss!</p>
            <div className="flex items-center space-x-2 text-primary-200">
              <SparklesIcon className="h-5 w-5" />
              <span>New deals added daily</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Categories */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dealCategories.map((category, index) => (
            <div key={index} className="relative bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative h-48">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    <p className="text-3xl font-bold mt-2">{category.discount}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Valid for: {category.validUntil}</span>
                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Products */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Current Deals</h2>
          <p className="text-gray-600">Don't miss out on these amazing offers</p>
        </div>
        <Products onSale={true} />
      </div>
    </div>
  );
};

export default Deals;
