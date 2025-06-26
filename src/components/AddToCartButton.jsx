import React, { useState, useEffect } from 'react';
import { addItemToCart, removeItemFromCart } from '../api/CartService';

const AddToCartButton = ({ item }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const checkIfSaved = async () => {
    try {
      const response = await fetch(`http://localhost/car/backend/api/cart/check_in_cart.php?item_id=${item.id}`, {
        credentials: 'include', 
      });
      const data = await response.json();
      console.log("check_in_cart response:", data);
      setIsSaved(data.exists);
    } catch (err) {
      console.error('Error checking cart status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  checkIfSaved();
}, [item.id]);

  const handleToggleCart = async () => {
    try {
      if (isSaved) {
        const response = await removeItemFromCart(item.id);
        if (response.message) {
          alert('Removed from cart');
          setIsSaved(false);
        } else {
          alert(response.error || 'Failed to remove');
        }
      } else {
        const response = await addItemToCart(item);
        if (response.error) {
          alert(response.error);
        } else {
          alert('Added to cart');
          setIsSaved(true);
        }
      }
    } catch (err) {
      console.error('Toggle cart error:', err.message);
      alert('Something went wrong');
    }
  };

  if (isLoading) return null;

  return (
    <button
      onClick={handleToggleCart}
      className={`p-2 rounded-full transition ${
        isSaved ? 'bg-red-100 text-red-500' : 'bg-gray-200 text-gray-500'
      }`}
      aria-label={isSaved ? "Remove from cart" : "Add to cart"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isSaved ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42
           4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81
           14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
           6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default AddToCartButton;
