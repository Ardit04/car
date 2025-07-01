import React from 'react';

const CartItem = ({ item, onRemove }) => {
  const imageName = item.image_url;
  const imageUrl = imageName
  ? `http://localhost/car/backend/uploads/${imageName}`
  : 'https://via.placeholder.com/200x130?text=No+Image';



  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row gap-4">
      <img
        src={imageUrl}
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
          onClick={() => onRemove(item.item_id)}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
