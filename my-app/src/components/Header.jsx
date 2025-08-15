

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Phone, Mail, Clock } from 'lucide-react';
import SearchBar from './SearchBar';


const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Navigation Bar (now first row) */}
      <header className="header-nav">
        <div className="header-container">
          <div className="header-row">
            <div className="header-logo">
              LOGO
            </div>
            <nav className="header-links">
              <Link to="/" className="header-link">HOME</Link>
              <Link to="/about" className="header-link">ABOUT US</Link>
            </nav>
            <div className="header-actions">
              <SearchBar />
              <ShoppingCart
                className="icon-cart"
                onClick={() => navigate('/cart')}
              />
              <User className="icon-user" />
              <Link to="/seller" className="header-seller-link-text">Go to Seller Page</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Bar (now second row) */}
      <div className="header-contact-bar">
        <div className="header-contact-container">
          <div className="header-contact-row">
            <div className="header-contact-item">
              <Phone className="icon-contact" />
              <span>Call Us: +63 912 345 6789</span>
            </div>
            <div className="header-contact-item">
              <Mail className="icon-contact" />
              <span>Email us: construction@gmail.com</span>
            </div>
            <div className="header-contact-item">
              <Clock className="icon-contact" />
              <span>Working Hours: 8am - 9pm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;