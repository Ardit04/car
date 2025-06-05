import React from 'react';
import { removeItemFromCart } from '../api/CartService';

const CartItem = ({ item, onRemove }) => {
    const handleRemove = async () => {
        const response = await removeItemFromCart(item.id);
        alert(response.message || 'Item removed from cart!');
        onRemove(item.id);
    };

    return (
        <div>
            <p>{item.name} - ${item.price}</p>
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default CartItem;