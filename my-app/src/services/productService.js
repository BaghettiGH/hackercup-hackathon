import supabase from '../api/supabase';

export async function fetchProductsByCategory(category) {
  let query = supabase.from('products').select('*');
  if (category && category !== 'All') {
    query = query.eq('category', category.toLowerCase());
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
