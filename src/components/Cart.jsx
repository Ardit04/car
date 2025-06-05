import React, { useEffect, useState } from 'react';
import { viewCart, clearCart } from '../api/CartService';
import CartItem from './CartItem';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const items = await viewCart();
            setCartItems(items);
        };
        fetchCart();
    }, []);

    const handleClearCart = async () => {
        const response = await clearCart();
        alert(response.message || 'Cart cleared!');
        setCartItems([]);
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
            ))}
            <button onClick={handleClearCart}>Clear Cart</button>
        </div>
    );
};

export default Cart;