import React, { useEffect, useState } from 'react';
import CartRow from '../components/CartRow';
import supabase from '../api/supabase';

export default function CartScreen() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

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
                    products (
                        name,
                        product_image,
                        suppliers (
                            name
                        )
                    )
                )
            `)
            .eq('buyer_id', 1); // change to the actual logged-in buyer's ID

        if (ordersError) {
            console.error(ordersError);
            return;
        }

        // Flatten orders to extract order item details
        const items = orders.map(order => {
            const item = order.order_item_id;
            return {
                productName: item.products.name,
                supplierName: item.products.suppliers.name,
                quantity: item.quantity,
                totalPrice: item.total_price,
                productImage: item.products.product_image
            };
        });

        setCartItems(items);
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.map((item, index) => (
                <CartRow key={index} {...item} />
            ))}
        </div>
    );
}
