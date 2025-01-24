import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Profile from './components/Account/Profile';
import ProductDetails from './components/ProductDetails';
import Deals from './components/pages/Deals';
import WhatsNew from './components/pages/WhatsNew';
import Delivery from './components/pages/Delivery';
import Home from './components/pages/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Footer from './components/Footer';
import AboutUs from './components/pages/AboutUs';
import Contact from './components/pages/Contact';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-10 py-8 mt-16 sm:mt-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:productId" element={<ProductDetails />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/whats-new" element={<WhatsNew />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/notifications" element={<Profile />} />
                  <Route path="/settings" element={<Profile />} />
                  <Route path="/account/profile" element={<Profile />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
