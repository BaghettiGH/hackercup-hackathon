import React, { useEffect, useState } from 'react';
import CartRow from '../components/CartRow';
import supabase from '../api/supabase';
import { fetchCartItems } from '../services/productService';
import '../components/cart.css';
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
        try {
            const items = await fetchCartItems(buyerId);
            setCartItems(items);
        } catch (error) {
            console.error(error);
        }
    {cartItems.map((item, index) => (
    <CartRow 
        key={index} 
        {...item} 
        onDelete={async () => {
            try {
                const { error } = await supabase
                    .from('order_items')
                    .delete()
                    .eq('id', item.orderItemId);
                if (error) throw error;
                fetchCart();
            } catch (err) {
                console.error('Failed to delete item:', err);
            }
        }} 
    />
))}

    }

    return (
        <div className="cart-page-container">
            <h1>Your Cart</h1>
            {cartItems.map((item, index) => (
                <CartRow key={index} {...item} />
            ))}
        </div>
    );
}