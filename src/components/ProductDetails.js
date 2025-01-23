import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { StarIcon, HeartIcon, ShoppingCartIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart() || {};
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist() || {};
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          Return to Products
        </button>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ ...product, quantity, selectedSize });
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist?.(product.id)) {
      removeFromWishlist?.(product.id);
    } else {
      addToWishlist?.(product);
    }
  };

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent product! The quality is outstanding."
    },
    {
      id: 2,
      author: "Jane Smith",
      rating: 4,
      date: "2024-01-10",
      comment: "Very good product, but shipping took a bit longer than expected."
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? (
        <StarIconSolid key={index} className="h-5 w-5 text-yellow-400" />
      ) : (
        <StarIcon key={index} className="h-5 w-5 text-yellow-400" />
      )
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[product.image, ...(product.images || [])].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${
                  selectedImage === idx ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-xl text-primary-600">${product.price}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="prose prose-sm text-gray-500">
            <p>{product.description}</p>
          </div>

          {/* Size Selector */}
          {product.sizes && (
            <div>
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      selectedSize === size
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="mt-2 flex items-center space-x-3">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-md"
              >
                -
              </button>
              <span className="text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 flex items-center justify-center space-x-2"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={toggleWishlist}
              className="p-3 border rounded-md hover:bg-gray-50"
            >
              {isInWishlist?.(product.id) ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Delivery & Warranty */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <TruckIcon className="h-6 w-6 text-gray-400" />
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="text-sm text-gray-500">2-3 business days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
              <div>
                <h4 className="font-medium">Warranty</h4>
                <p className="text-sm text-gray-500">1 year manufacturer warranty</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Features</h3>
            <ul className="mt-4 space-y-2">
              {[
                'High-quality materials',
                'Durable construction',
                'Modern design',
                'Versatile functionality',
                'Easy maintenance'
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
            <dl className="mt-4 space-y-3">
              {[
                ['Material', 'Premium grade'],
                ['Dimensions', '10" x 8" x 4"'],
                ['Weight', '2.5 lbs'],
                ['Color', 'Multiple options available'],
                ['Warranty', '1 year limited']
              ].map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">{key}</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">{review.author}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
