import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { StarIcon } from '@heroicons/react/20/solid';
import SearchBar from './SearchBar';

const initialProducts = [
  {
    id: 1,
    name: 'Premium Wireless Earbuds',
    price: 129.99,
    category: 'Electronics',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=400',
    description: 'High-quality wireless earbuds with active noise cancellation'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 199.99,
    category: 'Electronics',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400',
    description: 'Advanced smartwatch with health tracking features'
  },
  {
    id: 3,
    name: 'Ultra Boost Running Shoes',
    price: 159.99,
    category: 'Sports',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
    description: 'Professional running shoes with superior comfort'
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    category: 'Electronics',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400',
    description: 'Waterproof portable speaker with amazing sound quality'
  },
  {
    id: 5,
    name: 'Yoga Mat Premium',
    price: 45.99,
    category: 'Sports',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=400',
    description: 'Eco-friendly yoga mat with perfect grip'
  },
  {
    id: 6,
    name: 'Smart Home Camera',
    price: 89.99,
    category: 'Electronics',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=400',
    description: '1080p security camera with night vision'
  },
  {
    id: 7,
    name: 'Gaming Laptop',
    price: 1299.99,
    category: 'Electronics',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400',
    description: 'High-performance gaming laptop with RGB keyboard'
  },
  {
    id: 8,
    name: 'Professional Camera',
    price: 899.99,
    category: 'Electronics',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
    description: 'DSLR camera with 4K video capabilities'
  },
  {
    id: 9,
    name: 'Gym Dumbbell Set',
    price: 299.99,
    category: 'Sports',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&q=80&w=400',
    description: 'Adjustable dumbbell set for home workouts'
  },
  {
    id: 10,
    name: 'Smart Coffee Maker',
    price: 159.99,
    category: 'Home',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400',
    description: 'WiFi-enabled coffee maker with smartphone control'
  },
  {
    id: 11,
    name: 'Air Purifier',
    price: 199.99,
    category: 'Home',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1626436629565-5f33be729c80?auto=format&fit=crop&q=80&w=400',
    description: 'HEPA air purifier for clean indoor air'
  },
  {
    id: 12,
    name: 'Wireless Keyboard',
    price: 89.99,
    category: 'Electronics',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400',
    description: 'Mechanical wireless keyboard with RGB lighting'
  }
];

const ProductList = () => {
  const [products] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/product/${product.id}`} className="block aspect-w-1 aspect-h-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 truncate">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-1 flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
