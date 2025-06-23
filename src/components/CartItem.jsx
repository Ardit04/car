import React from 'react';
import { removeItemFromCart } from '../api/CartService';

const CartItem = ({ item, onRemove }) => {
  const handleRemove = async () => {
    const response = await removeItemFromCart(item.item_id);
    alert(response.message);
    onRemove(item.item_id);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row gap-4">
      <img
        src={`http://localhost/car/uploads/${item.photo}`}
        alt={`${item.brand} ${item.model}`}
        className="w-full md:w-48 h-32 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold">{item.brand} {item.model} ({item.year})</h3>
        <p className="text-sm text-gray-600 mb-2 italic">{item.description}</p>
        <p><strong>Mileage:</strong> {item.mileage} km</p>
        <p><strong>Fuel:</strong> {item.fuel}</p>
        <p><strong>Price (Car):</strong> €{item.price}</p>
        <p className="text-green-600 font-semibold mt-2">
          <strong>Price in Cart:</strong> €{item.cart_price}
        </p>
        <button
          onClick={handleRemove}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
