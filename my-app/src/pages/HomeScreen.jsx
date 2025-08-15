import React, { useState, useEffect } from 'react';
import { fetchProductsByCategory } from '../services/productService';
import ProductPopup from '../components/ProductPopup';


const categories = [
  'All',
  'Block',
  'Tile',
  'Wall',
  'Bamboo',
  'Concrete',
  'Insulation',
];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popupProduct, setPopupProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProductsByCategory(selectedCategory)
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="promo-container">
      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="home-hero-grid">
          {/* Large Hero Image */}
          <div className="home-hero-image">
            <span className="home-hero-image-text">[HERO IMAGE]</span>
          </div>
          {/* Two Smaller Images */}
          <div className="home-hero-side-images">
            <div className="home-hero-side-image">
              <span className="home-hero-side-image-text">[IMAGE]</span>
            </div>
            <div className="home-hero-side-image">
              <span className="home-hero-side-image-text">[IMAGE]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="home-products-section">
        <h2 className="home-products-title">OUR PRODUCTS</h2>
        <div className="home-products-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn${selectedCategory === cat ? ' active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="home-products-list">
          {loading && <div>Loading...</div>}
          {error && <div>Error loading products.</div>}
          {!loading && !error && products.length === 0 && <div>No products found.</div>}
          {!loading && !error && products.map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <div className="product-card" onClick={() => setPopupProduct(product)} style={{cursor: 'pointer'}}>
                <img src={product.product_image}/>
                <p className="price">₱{product.price}</p>
              </div>
              <div className="product-meta">
                <h3 title={product.name}>{
                  product.name.length > 30
                    ? product.name.slice(0, 27) + '...'
                    : product.name
                }</h3>
                <p className="category">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
              </div>
            </div>
          ))}

        {/* Product Popup */}
        {popupProduct && (
          <ProductPopup
            product={popupProduct}
            onClose={() => setPopupProduct(null)}
            onAddToCart={(product, quantity) => {
              // TODO: Add to cart logic here
              setPopupProduct(null);
            }}
          />
        )}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;