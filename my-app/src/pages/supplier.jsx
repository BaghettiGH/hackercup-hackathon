import React, { useState, useEffect } from 'react';
import supabase from '../api/supabase';


function SupplierProductDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock_quantity: '',
    image_url: '',
    is_active: true
  });

  useEffect(() => {
    // fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('supplier_id', supplierId);
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSuppliers = async () => {
      
      try{
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        const supplierId = user?.id;
        const { data, error } = await supabase
            .from('suppliers')
            .select('company_name, address, contact_number')
            .eq('id',supplierId)
            .single();

            if (error) throw error;
            setSupplier(data);
    } catch (error) {
        console.error('Error fetching supplier:', error);    
    }
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        supplier_id: supplierId
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
        setEditingProduct(null);
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
        if (data) setProducts([...products, ...data]);
      }
      
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
        image_url: '',
        is_active: true
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving product:', error);
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
    </div>
  );
}

export default SupplierProductDashboard;