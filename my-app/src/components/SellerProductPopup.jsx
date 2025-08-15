
import React, { useState } from 'react';
import './SellerProductPopup.css';
import supabase from '../api/supabase';

const SellerProductPopup = ({ product, onClose, onApply }) => {
  const [price, setPrice] = useState(product.price);
  const [stockQuantity, setStockQuantity] = useState(product.stock_quantity);
  const [isListed, setIsListed] = useState(product.is_listed);
  const [status, setStatus] = useState(getStockStatus(product.stock_quantity));

  if (!product) return null;

  // Edit product in DB
  const handleEdit = async () => {
    const { data, error } = await supabase
      .from('products')
      .update({ price, stock_quantity: stockQuantity, is_listed: isListed })
      .eq('id', product.id)
      .select();
    if (error) {
      alert('Error updating product: ' + error.message);
      return;
    }
    if (onApply) onApply({ ...product, price, stock_quantity: stockQuantity, is_listed: isListed });
    onClose();
  };

  // Get stock status
  function getStockStatus(quantity) {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
    if (quantity < 20) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-100' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-100' };
  }

  return (
    <div className="seller-product-popup-overlay" onClick={onClose}>
      <div className="seller-product-popup" onClick={e => e.stopPropagation()}>
        <button className="seller-product-popup-close" onClick={onClose}>&times;</button>
        <div className="seller-product-popup-content-vertical">
          <div className="seller-product-popup-image-container">
            <img src={product.product_image} className="seller-product-popup-image"/>
          </div>
          <div className="seller-product-popup-details-vertical">
            <h2 className="seller-product-popup-title-left">{product.name}</h2>
            <p className="seller-product-popup-description-left">{product.description ? product.description : 'No description provided.'}</p>
            <div className="seller-product-popup-row-vertical">
              <label className="seller-product-popup-label">Stock Quantity:</label>
              <p className="seller-product-popup-quantity">{stockQuantity}</p>
              <span className={status.color} style={{marginLeft: '1rem'}}>{status.text}</span>
            </div>
            <div className="seller-product-popup-row-vertical">
              <label className="seller-product-popup-label">Unit Price:</label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="seller-product-popup-input"
              />
            </div>
            <div className="seller-product-popup-row-vertical">
              <label className="seller-product-popup-label">Listed:</label>
              <label className="seller-product-popup-switch">
                <input
                  type="checkbox"
                  checked={isListed}
                  onChange={e => setIsListed(e.target.checked)}
                />
                <span className="seller-product-popup-slider"></span>
              </label>
            </div>
            <button
              className="seller-product-popup-apply"
              onClick={handleEdit}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductPopup;
