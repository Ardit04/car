import React from 'react';
import { addItemToCart } from '../api/CartService';

const AddToCartButton = ({ item }) => {
    const handleAddToCart = async () => {
        const response = await addItemToCart(item);
        alert(response.message || 'Item added to cart!');
    };

    return <button onClick={handleAddToCart}>Order Now</button>;
};

export default AddToCartButton;