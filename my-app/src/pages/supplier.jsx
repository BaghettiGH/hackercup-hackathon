import React, { useState, useEffect } from 'react';
import supabase from '../api/supabase';
import MainLayout from './MainLayout';
import SellerProductCard from '../components/SellerProductCard';


function SupplierProductDashboard() {
  const [products, setProducts] = useState([]);
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
      
      if (error) {
        console.error("Error getting user:", error);
        return;
      }
      
      if (!user) {
        console.error("No user session found");
        return; // or redirect to login
      }
    await fetchProducts(user.id);
    await fetchSuppliers(user.id);
  };

  loadData();

  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('name,price,product_image')
        .eq('supplier_id',supplierId);
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSuppliers = async (supplierId) => {
      
      try{
        setSupplierId(supplierId)
        const { data, supplierError } = await supabase
            .from('suppliers')
            .select('company_name, address, contact_number')
            .eq('id',supplierId)
            .single();

            if (supplierError) throw supplierError;
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock_quantity: product.stock_quantity.toString(),
      image_url: product.image_url,
      is_active: product.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const toggleProductStatus = async (product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !product.is_active })
        .eq('id', product.id);
      
      if (error) throw error;
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, is_active: !p.is_active } : p
      ));
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
    if (quantity < 20) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-100' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-100' };
  };



  return (
    <div className="main-page">
        <div className="supplier-profile">
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
        <div className="list-product-button">
          <button onClick={()=> setShowAddForm(true)}>List Products</button>

        </div>
        <div className="products">
      <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "16px"
    }}>
      {products.map((product, index) => (
        <SellerProductCard
          key={index}
          name={product.name}
          price={product.price}
          product_image={product.product_image}
        />
      ))}
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

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleSubmit}>Save</button>
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupplierProductDashboard;