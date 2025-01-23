import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ShoppingCartIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Products = ({ featured, newArrivals, onSale, limit }) => {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist() || {};
  const { addToCart } = useCart() || {};
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let filtered = [...products];

    // Apply filters based on props
    if (featured) {
      filtered = filtered.filter(product => product.rating >= 4.5);
    }
    if (newArrivals) {
      filtered = filtered.sort((a, b) => b.id - a.id);
    }
    if (onSale) {
      filtered = filtered.map(product => ({
        ...product,
        originalPrice: Math.round(product.price * 1.2 * 100) / 100, // 20% higher for original price
        discount: '20%'
      })).filter(product => product.price.toString().endsWith('99'));
    }

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    setFilteredProducts(filtered);
  }, [featured, newArrivals, onSale, limit]);

  const handleWishlist = (product) => {
    if (isInWishlist?.(product.id)) {
      removeFromWishlist?.(product.id);
    } else {
      addToWishlist?.(product);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
      {filteredProducts.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <Link to={`/product/${product.id}`} className="block relative">
            {onSale && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                {product.discount} OFF
              </span>
            )}
            {newArrivals && (
              <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                NEW
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleWishlist(product);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              {isInWishlist?.(product.id) ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </Link>
          
          <div className="p-4">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-600">{product.reviews} reviews</span>
              </div>
            </Link>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary-600">${product.price}</span>
                {onSale && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              <button
                onClick={() => addToCart?.(product)}
                className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                disabled={!product.inStock}
              >
                <ShoppingCartIcon className="h-5 w-5 mr-1" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      ))}

      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
