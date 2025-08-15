import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Phone, Mail, Clock } from 'lucide-react';
import SearchBar from './SearchBar';
import logo from '../assets/G R E V I A.png'; // Importing the logo image


const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header-layout">
      {/* Logo at the very left */}
      <img src={logo} alt="Logo" className="header-logo-img" />
      {/* Stack nav and contact bar vertically to the right of logo */}
      <div className="header-stack">
        <header className="header-nav-full">
          <div className="header-row-full">
            <nav className="header-links-full">
              <Link to="/" className="header-link-full">HOME</Link>
              <Link to="/about" className="header-link-full">ABOUT US</Link>

            </nav>
            <div className="header-actions-full">
              <SearchBar />
              <ShoppingCart
                className="icon-cart-full"
                onClick={() => navigate('/cart')}
              />
              <User className="icon-user-full" />
              <Link to="/seller" className="header-seller-link-full">Go to Seller Page</Link>
            </div>
          </div>
        </header>
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
    </div>
  );
};

export default Header;