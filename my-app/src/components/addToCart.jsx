import React, { useEffect, useState } from "react";
import supabase from "../api/supabase";

export async function addToCart(buyerId, productId, quantity, totalPrice) {
    const { data: orderItem, error: orderItemError } = await supabase
        .from('order_items')
        .insert([{ product_id: productId, quantity, total_price: totalPrice }])
        .select()
        .single();

    if (orderItemError) throw orderItemError;

    const { error: orderError } = await supabase
        .from('orders')
        .insert([{ buyer_id: buyerId, status: 'pending', order_item_id: orderItem.id }]);

    if (orderError) throw orderError;

    return orderItem;
}