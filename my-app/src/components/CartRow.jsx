import React from 'react';
import { Trash2 } from 'lucide-react';
export default function CartRow({productName, supplierName, quantity, totalPrice, productImage}) {


    return(

        <div className='cart-row'>
            <div className='cart-product-image'>
                <img 
                    src={productImage}
                    alt={productName}

                />

            </div>
            <div className='cart-product-info'>
                <p className='font-semibold'>{productName}</p>
                <p className='text-sm text-gray-500'>{supplierName}</p>
                <p className='text-sm'>Quantity: {quantity}</p>
                <p className='font-bold'>₱{totalPrice}</p>
            </div>
            <div className="unlist-row">
                {/*Trash can icon */}
            </div>
            <div className="unlist-row text-red-500 cursor-pointer">
                <Trash2 size={20} />
            </div>
        </div>
    )
}