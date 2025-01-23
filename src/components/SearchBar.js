import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, ArrowTrendingUpIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { products } from '../data/products';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches] = useState([
    'Wireless Headphones',
    'Gaming Headset',
    'Noise Cancelling',
    'Sport Earbuds',
    'Bluetooth Speakers'
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  // Update recent searches
  const updateRecentSearches = (term) => {
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchTerm(query);
  }, [location.search]);

  // Handle clicks outside of search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate suggestions based on products
  const generateSuggestions = (value) => {
    if (!value.trim()) return [];

    const searchValue = value.toLowerCase();
    const productSuggestions = products
      .filter(product => 
        product.name.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue)
      )
      .slice(0, 5)
      .map(product => ({
        type: 'product',
        text: product.name,
        category: product.category
      }));

    const categorySuggestions = [...new Set(products
      .filter(product => 
        product.category.toLowerCase().includes(searchValue)
      )
      .map(product => product.category))]
      .slice(0, 3)
      .map(category => ({
        type: 'category',
        text: category
      }));

    return [...productSuggestions, ...categorySuggestions];
  };

  const handleSearch = (term) => {
    const trimmedTerm = term?.trim() || '';
    if (trimmedTerm) {
      updateRecentSearches(trimmedTerm);
      navigate(`/products?search=${encodeURIComponent(trimmedTerm)}`);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value || '';
    setSearchTerm(value);
    setShowDropdown(true);
    setSuggestions(generateSuggestions(value));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const removeRecentSearch = (term, e) => {
    e.stopPropagation();
    const updated = recentSearches.filter(t => t !== term);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Search for products..."
          value={searchTerm || ''}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowDropdown(true)}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/4 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Live Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-1">Suggestions</div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => handleSearch(suggestion.text)}
                >
                  <div className="flex items-center">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{suggestion.text}</span>
                  </div>
                  {suggestion.category && (
                    <span className="text-sm text-gray-500">{suggestion.category}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 px-3 py-1">Recent Searches</div>
              {recentSearches.map((term, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between group"
                  onClick={() => handleSearch(term)}
                >
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{term}</span>
                  </div>
                  <button
                    onClick={(e) => removeRecentSearch(term, e)}
                    className="hidden group-hover:block text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          {(!searchTerm || !suggestions.length) && (
            <div className="p-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 px-3 py-1">Trending</div>
              {trendingSearches.map((term, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSearch(term)}
                >
                  <ArrowTrendingUpIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
