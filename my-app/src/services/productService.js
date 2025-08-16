import supabase from '../api/supabase';
// Add product to cart for a buyer (normalized structure)
export async function addToCart(buyerId, productId, quantity, totalPrice) {
  // 1. Find or create a pending order for the buyer
  let { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id')
    .eq('buyer_id', buyerId)
    .eq('status', 'pending')
    .single();

  if (orderError && orderError.code !== 'PGRST116') throw orderError; // PGRST116: No rows found

  if (!order) {
    // Create new pending order
    const { data: newOrder, error: newOrderError } = await supabase
      .from('orders')
      .insert([{ buyer_id: buyerId, status: 'pending' }])
      .select('id')
      .single();
    if (newOrderError) throw newOrderError;
    order = newOrder;
  }

  // 2. Add item to order_items referencing order_id
  const { data: orderItem, error: orderItemError } = await supabase
    .from('order_items')
    .insert([{ order_id: order.id, product_id: productId, quantity, total_price: totalPrice }])
    .select()
    .single();
  if (orderItemError) throw orderItemError;
  return orderItem;
}

// Fetch cart items for a buyer (normalized structure)
export async function fetchCartItems(buyerId) {
  if (!buyerId) return [];
  // 1. Find pending order for the buyer
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id')
    .eq('buyer_id', buyerId)
    .eq('status', 'pending')
    .single();
  if (orderError && orderError.code !== 'PGRST116') throw orderError; // PGRST116: No rows found, which is a valid case (empty cart)
  if (!order) return [];

  // 2. Fetch all order_items for that order
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      product_id (
        name,
        product_image,
        supplier_id (
          company_name
        )
      ),
      quantity,
      total_price
    `)
    .eq('order_id', order.id);
  if (itemsError) throw itemsError;

  return items.map(item => ({
    productName: item.product_id.name,
    supplierName: item.product_id.supplier_id.company_name,
    quantity: item.quantity,
    totalPrice: item.total_price,
    productImage: item.product_id.product_image
  }));
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