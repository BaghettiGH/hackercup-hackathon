import React from 'react';
import { Trash2 } from 'lucide-react';
import './cart.css';
export default function CartRow({productName, supplierName, quantity, totalPrice, productImage}) {


    return(
        <div className="cart-row-container">
        <div className='cart-row'>
            <div className='cart-product-image'>
                <img 
                    src={productImage}
                    alt={productName}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', margin: '2px' }}
                />
            </div>
            <div className='cart-product-info'>
                <p className='product-name'>{productName}</p>
                <p className='supplier-name'>{supplierName}</p>
                <p className='order-quantity'>Quantity: {quantity}</p>
                <p className='product-price'>₱{totalPrice}</p>
            </div>
            <div className="unlist-row">
                {/*Trash can icon */}
                
            </div>
            <div className="unlist-row text-red-500 cursor-pointer">
                <Trash2 size={20} />
            </div>
        </div>
        </div>
    )
}