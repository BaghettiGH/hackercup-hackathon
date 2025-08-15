import React, { useEffect, useState } from 'react';
import CartRow from '../components/CartRow';
import supabase from '../api/supabase';

export default function CartScreen() {
    const [cartItems, setCartItems] = useState([]);
    const [buyerId, setBuyerId] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
                return;
            }
            if(!user){
                console.error('No user logged in');
                return;
            }
            setBuyerId(user.id);
        };
        getUser();
    }, []);

    useEffect(() =>{
        if(!buyerId) return;
        fetchCart();
    },[buyerId]);

    async function fetchCart() {
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select(`
                id,
                order_item_id (
                    id,
                    quantity,
                    total_price,
                    product_id (
                    id,
                        name,
                        product_image,
                        supplier_id 
                    )
                )
            `)
            .eq('buyer_id', buyerId)
            .eq('status','pending');

        if (ordersError) {
            console.error(ordersError);
            return;
        }
        if (!orders || orders.length === 0) {
            setCartItems([]);
            return;
        }
        

        const supplierIds = [...new Set(
            orders.map(o => o.order_item_id.product_id.supplier_id)
        )];
        const { data: suppliers } = await supabase
            .from('suppliers')
            .select('id, name')
            .in('id', supplierIds);

        const supplierMap = {};
        suppliers.forEach(s => supplierMap[s.id] = s.name);
        const items = orders.map(order => {
            const item = order.order_item_id;
            const product = item.product_id;    
            return {
                productName: product.name,
                supplierName: supplierMap[product.supplier_id] || 'Unknown Supplier',
                quantity: item.quantity,
                totalPrice: item.total_price,
                productImage: product.product_image
            };
        });

        setCartItems(items);
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.map((item, index) => (
                <CartRow key={index} {...item} />
            ))}
        </div>
    );
}
