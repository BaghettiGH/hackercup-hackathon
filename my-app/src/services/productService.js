import supabase from '../api/supabase';
// Fetch cart items for a buyer
export async function fetchCartItems(buyerId) {
  if (!buyerId) return [];
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select(`
      id,
      order_item_id (
        id,
        quantity,
        total_price,
        product_id (
          name,
          product_image,
          supplier_id (
            company_name
          )
        )
      )
    `)
    .eq('buyer_id', buyerId);

  if (ordersError) {
    throw ordersError;
  }

  return orders.map(order => {
    const item = order.order_item_id;
    return {
      productName: item.product_id.name,
      supplierName: item.product_id.supplier_id.name,
      quantity: item.quantity,
      totalPrice: item.total_price,
      productImage: item.product_id.product_image
    };
  });
}

// Fetch supplier details by supplierId
export async function fetchSuppliers(supplierId) {
  if (!supplierId) return null;
  const { data, error } = await supabase
    .from('suppliers')
    .select('company_name, address, contact_number')
    .eq('id', supplierId)
    .single();
  if (error) throw error;
  return data;
}

// Edit product (returns updated product)
export async function handleEdit(product, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', product.id)
    .select();
  if (error) throw error;
  return data && data[0];
}

// Delete product by id
export async function handleDelete(productId) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);
  if (error) throw error;
  return true;
}

// Toggle product status (active/inactive)
export async function toggleProductStatus(product) {
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: !product.is_active })
    .eq('id', product.id)
    .select();
  if (error) throw error;
  return data && data[0];
}

// Filter products by search term
export function filteredProducts(products, searchTerm) {
  if (!searchTerm) return products;
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
}

// Get stock status
export function getStockStatus(quantity) {
  if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
  if (quantity < 20) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-100' };
  return { text: 'In Stock', color: 'text-green-600 bg-green-100' };
}
export async function fetchProductsBySupplier(supplierId) {
  if (!supplierId) return [];
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, product_image, category, stock_quantity, is_listed')
    .eq('supplier_id', supplierId);
  if (error) throw error;
  return data || [];
}

export async function fetchProductsByCategory(category) {
  let query = supabase.from('products').select('*');
  if (category && category !== 'All') {
    query = query.eq('category', category.toLowerCase());
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
