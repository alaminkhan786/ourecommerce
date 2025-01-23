import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  Cog6ToothIcon as CogIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  ClockIcon, 
  ArrowRightOnRectangleIcon as LogoutIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  KeyIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { currentUser, logout } = useAuth() || {};
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for demonstration
  const [userData, setUserData] = useState({
    name: currentUser?.displayName || 'John Doe',
    email: currentUser?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    avatar: currentUser?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  });

  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-01-20',
      total: 299.99,
      status: 'Delivered',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 199.99 },
        { name: 'Phone Case', quantity: 2, price: 49.99 }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-15',
      total: 159.99,
      status: 'Processing',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 159.99 }
      ]
    }
  ]);

  const [wishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ]);

  const handleLogout = async () => {
    try {
      await logout?.();
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the user's profile
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recent Orders Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <ShoppingBagIcon className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-primary-600">{orders.length}</p>
            <p className="text-sm text-gray-500">Total orders this month</p>
          </div>

          {/* Wishlist Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Wishlist Items</h3>
              <HeartIcon className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-primary-600">{wishlistItems.length}</p>
            <p className="text-sm text-gray-500">Saved items</p>
          </div>

          {/* Account Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Account Status</h3>
              <UserIcon className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-primary-600">Active</p>
            <p className="text-sm text-gray-500">Member since Jan 2024</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                type: 'order',
                message: 'Your order #ORD-2024-001 has been delivered',
                time: '2 hours ago',
                icon: ShoppingBagIcon,
                color: 'text-green-600 bg-green-100'
              },
              {
                type: 'wishlist',
                message: 'Added Premium Headphones to your wishlist',
                time: '5 hours ago',
                icon: HeartIcon,
                color: 'text-red-600 bg-red-100'
              },
              {
                type: 'review',
                message: 'You reviewed Wireless Earbuds',
                time: '1 day ago',
                icon: StarIcon,
                color: 'text-yellow-600 bg-yellow-100'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${activity.color}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <span className="text-xs text-primary-600 hover:text-primary-700 cursor-pointer">
              Mark all as read
            </span>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Order Update',
                message: 'Your order has been shipped! Track your package.',
                time: '1 hour ago',
                unread: true
              },
              {
                title: 'Price Drop Alert',
                message: 'A product in your wishlist is now on sale!',
                time: '3 hours ago',
                unread: true
              },
              {
                title: 'New Feature',
                message: 'Check out our new mobile app for a better shopping experience.',
                time: '1 day ago',
                unread: false
              }
            ].map((notification, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  notification.unread ? 'bg-primary-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                  {notification.unread && (
                    <div className="h-2 w-2 bg-primary-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{userData.name}</h3>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold">Personal Information</h4>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              <PencilSquareIcon className="h-5 w-5 mr-1" />
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <span>{userData.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold mb-4">Security Settings</h4>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between px-4 py-2 border rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <KeyIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span>Change Password</span>
              </div>
              <PencilSquareIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderOrders = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Order History</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold">{order.id}</h4>
                  <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="border-t pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price}</p>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">${order.total}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWishlist = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">My Wishlist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-primary-600 font-medium mt-2">${item.price}</p>
                <button className="w-full mt-4 bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'profile':
        return renderProfile();
      case 'orders':
        return renderOrders();
      case 'wishlist':
        return renderWishlist();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Coming Soon</p>
          </div>
        );
    }
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: UserIcon },
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow-sm px-4 py-8 md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
            >
              <LogoutIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
