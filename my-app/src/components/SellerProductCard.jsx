import React from 'react';

export default function SellerProductCard ({name, price, product_image}){
   
    
    return(
        <div className="product-card">
            <div className="product-image">
                <img
                    src={product_image}
                />
            <div className="product-price">
             <p>₱{price}</p>

            </div>
            </div>
            <div className="product-name">
                <p>{name}</p>
            </div>
        </div>
    )
}