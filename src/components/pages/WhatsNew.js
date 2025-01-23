import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/outline';
import Products from '../Products';

const WhatsNew = () => {
  const newCategories = [
    {
      title: "New Arrivals",
      description: "Just landed in store",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Trending Now",
      description: "Most popular this week",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Coming Soon",
      description: "Preview upcoming products",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      gradient: "from-teal-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center px-8 py-20 rounded-lg" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-800/90" />
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div className="max-w-2xl text-white">
            <div className="flex items-center space-x-2 mb-4">
              <SparklesIcon className="h-6 w-6" />
              <span className="text-sm font-medium uppercase tracking-wider">Latest Arrivals</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Discover What's New</h1>
            <p className="text-lg mb-6">Be the first to shop our latest collections and exclusive releases.</p>
            <div className="flex items-center space-x-2 text-blue-200">
              <FireIcon className="h-5 w-5" />
              <span>Updated daily with fresh styles</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Categories */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newCategories.map((category, index) => (
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
                    <p className="text-lg mt-2">{category.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Products */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Arrivals</h2>
          <p className="text-gray-600">Be the first to shop our newest products</p>
        </div>
        <Products newArrivals={true} />
      </div>

      {/* Coming Soon Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="relative rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt="Coming Soon"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-800/90 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Coming Soon</h3>
              <p className="text-lg mb-6">Get ready for our exciting new collection</p>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
