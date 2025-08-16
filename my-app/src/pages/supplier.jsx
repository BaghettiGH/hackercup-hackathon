import React, { useState, useEffect } from 'react';
import { CircleUserRound } from 'lucide-react';
import supabase from '../api/supabase';
import SellerProductPopup from '../components/SellerProductPopup';
import {
  fetchProductsBySupplier,
  fetchSuppliers,
  handleEdit
} from '../services/productService';
import circleIcon from '../assets/circle_icon.png'; 
import './supplier.css';


function SupplierProductDashboard() {
  const [products, setProducts] = useState([]);
  const [popupProduct, setPopupProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock_quantity: '',
    product_image: '',
    is_listed: true
  });

  useEffect(() => {
    const loadData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

    await fetchSupplierDetails(user.id);
      
      if (error) {
        console.error("Error getting user:", error);
        return;
      }
      
      if (!user) {
        console.error("No user session found");
        return; // or redirect to login
      }
    await fetchProducts(user.id);
  };

  loadData();

  }, []);

  const fetchProducts = async (supplierId) => {
    try {
      const data = await fetchProductsBySupplier(supplierId);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSupplierDetails = async (supplierId) => {
    try {
      setSupplierId(supplierId);
      const data = await fetchSuppliers(supplierId);
      setSupplier(data);
    } catch (error) {
      console.error('Error fetching supplier:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity, 10),
        supplier_id: supplierId
      };

      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();

      if (error) {
        console.error('Supabase insert error:', error.message, error.details);
      };

      setProducts((prev) => [...prev, ...data]);
      setShowAddForm(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category: '',
        product_image: '',
        is_listed: true
      });
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="main-page">
        <div className="supplier-profile-row">
          <div className="supplier-icon-container">
            <img src={circleIcon} alt="Supplier Icon" />
          </div>
          <div className="supplier-profile-details">
            <h2 className="supplier-name">
              {supplier ? supplier.company_name : 'Loading supplier..'}
            </h2>
            <h3 className="supplier-address">
              {supplier ? supplier.address : ''}    
            </h3>
            <h3 className="supplier-number">
              {supplier ? supplier.contact_number : ''}
            </h3>
          </div>
        </div>
        <div className="list-product-button">
          <button onClick={()=> setShowAddForm(true)}>List Products</button>

        </div>
        <div className="products">
          <div className="supplier-products-list">
            {loading && <div>Loading...</div>}
            {!loading && products.length === 0 && <div>No products found.</div>}
            {!loading && products.map((product) => (
              <div key={product.id || product.name} className="product-card-wrapper">
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
                  <p className="category">{product.category ? (product.category.charAt(0).toUpperCase() + product.category.slice(1)) : ''}</p>
                </div>
              </div>
            ))}

            {/*Seller Product Popup */}
            {popupProduct && (
              <SellerProductPopup
                product={popupProduct}
                onClose={() => setPopupProduct(null)}
                onApply={async (updatedProduct) => {
                  // Save changes to product
                  try {
                    await handleEdit(popupProduct, {
                      price: updatedProduct.price,
                      stock_quantity: updatedProduct.stock_quantity,
                      is_listed: updatedProduct.is_listed
                    });
                    setProducts(products.map(p =>
                      p.id === popupProduct.id ? { ...p, ...updatedProduct } : p
                    ));
                  } catch (error) {
                    console.error('Error updating product:', error);
                  }
                  setPopupProduct(null);
                }}
              />
            )}
          </div>
        </div>
    
      {/* Modal */}
      {showAddForm && (
        <div className="modal-overlay" >
          <div className="modal-content">
            <h2>Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <input
              type="number"
              placeholder="Stock Quantity"
              value={formData.stock_quantity}
              onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
            />

            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="wall">Wall</option>
              <option value="tile">Tile</option>
              <option value="block">Block</option>
              <option value="bamboo">Bamboo</option>
              <option value="concrete">Concrete</option>
              <option value="insulation">Insulation</option>
            </select>

            <input
              type="text"
              placeholder="Image URL"
              value={formData.product_image}
              onChange={(e) => setFormData({ ...formData, product_image: e.target.value })}
            />

            <label>
              <input
                type="checkbox"
                checked={formData.is_listed}
                onChange={(e) => setFormData({ ...formData, is_listed: e.target.checked })}
              />
              Listed
            </label>

            <div className= "list-button-container" style={{ marginTop: "10px" }}>
              <button className="submit-list-button" onClick={handleSubmit}>Save</button>
              <button className="cancel-list-button"onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default SupplierProductDashboard;