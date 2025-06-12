import React, { useState } from 'react';
import { addItemToCart } from '../api/CartService';
import { Heart } from 'lucide-react';

const AddToCartButton = ({ item }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleAddToCart = async () => {
  console.log("Clicked!");
  if (!isSaved) {
    const response = await addItemToCart(item);
    alert(response.message || 'Item added to cart!');
  }
  setIsSaved(!isSaved);
};

  return (
    <button
      onClick={handleAddToCart}
      className={`p-2 rounded-full transition ${
  isSaved ? 'bg-red-100 text-red-500' : 'bg-gray-200 text-gray-500'
   }`}

    >
      <Heart className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
    </button>
  );
};

export default AddToCartButton;
