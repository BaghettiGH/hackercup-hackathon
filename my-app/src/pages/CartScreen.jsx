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
        // 1. Get orders for the logged-in buyer
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
                            name
                        )
                    )
                )
            `)
            .eq('buyer_id', buyerId);

        if (ordersError) {
            console.error(ordersError);
            return;
        }

        const items = orders.map(order => {
            const item = order.order_item_id;
            return {
                productName: item.product_id.name,
                supplierName: item.product_id.supplier_id.name,
                quantity: item.quantity,
                totalPrice: item.total_price,
                productImage: item.product_id.product_image
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
