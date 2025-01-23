import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Products from '../Products';

const Home = () => {
  const featuredSections = [
    {
      title: "Hot Deals & Discounts",
      description: "Save big on our best-selling items",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      link: "/deals",
      gradient: "from-rose-500 to-orange-500"
    },
    {
      title: "What's New",
      description: "Discover our latest arrivals",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      link: "/whats-new",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Fast Delivery",
      description: "Free shipping on orders over $50",
      image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      link: "/delivery",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-cover bg-center px-8 py-16 rounded-lg mt-16" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome to auDio App</h1>
            <p className="text-xl mb-8">Discover amazing products at unbeatable prices. Shop now and enjoy exclusive deals!</p>
            <Link 
              to="/products" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Shop Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSections.map((section, index) => (
            <Link key={index} to={section.link} className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-50`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                  <p className="text-white/90">{section.description}</p>
                  <div className="mt-4 flex items-center text-white">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600">Check out our most popular items</p>
        </div>
        <Products featured={true} limit={8} />
        <div className="text-center mt-12">
          <Link 
            to="/products"
            className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
          >
            View All Products
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
