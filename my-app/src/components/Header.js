

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Phone, Mail, Clock } from 'lucide-react';
import SearchBar from './SearchBar';


const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Navigation Bar (now first row) */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900">
              LOGO
            </div>
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-900 font-medium hover:text-blue-600">HOME</Link>
              <Link to="/about" className="text-gray-900 font-medium hover:text-blue-600">ABOUT US</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <SearchBar />
              <ShoppingCart
                className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer"
                onClick={() => navigate('/cart')}
              />
              <User className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Contact Bar (now second row) */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call Us: +63 912 345 6789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email us: construction@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Working Hours: 8am - 9pm</span>
            </div>
          </div>
          <div className="text-sm">
            <Link to="/seller" className="hover:underline">Go to Seller Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;