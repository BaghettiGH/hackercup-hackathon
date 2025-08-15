import React from 'react';
import './ProductPopup.css';

const ProductPopup = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);

  if (!product) return null;

  return (
    <div className="product-popup-overlay" onClick={onClose}>
      <div className="product-popup" onClick={e => e.stopPropagation()}>
        <button className="product-popup-close" onClick={onClose}>&times;</button>
        <div className="product-popup-content">
          <img src={product.product_image} className="product-popup-image"/>
          <div className="product-popup-details">
            <h2 className="product-popup-title">{product.name}</h2>
            <div className="product-popup-row">
              <span className="product-popup-price">₱{product.price}</span>
              <span className="product-popup-category">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
            </div>
            <p className="product-popup-description">{product.description}</p>
            <div className="product-popup-actions">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                className="product-popup-quantity"
              />
              <button
                className="product-popup-add"
                onClick={() => onAddToCart(product, quantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
