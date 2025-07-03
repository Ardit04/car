import React from 'react';
import { motion } from 'framer-motion';

const CartItem = ({ item, onRemove }) => {
  const imageName = item.image_url;
  const imageUrl = imageName
    ? `http://localhost/car/backend/uploads/${imageName}`
    : 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="border rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-6 bg-white hover:shadow-2xl transition-shadow duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full md:w-72 max-h-[320px] flex justify-center items-center bg-gray-50 rounded-xl overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={`${item.brand} ${item.model}`}
          className="w-full h-auto max-h-[320px] object-contain"
          loading="lazy"
        />
      </motion.div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
            {item.brand} {item.model}{' '}
            <span className="text-gray-500 font-normal">({item.year})</span>
          </h3>
          <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">
            {item.description || 'No description available.'}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
            <div>
              <span className="font-semibold">Mileage:</span> {(item.mileage ?? 0).toLocaleString()} km
            </div>
            <div>
              <span className="font-semibold">Fuel:</span> {item.fuel ?? '-'}
            </div>
            <div>
              <span className="font-semibold">Price (Car):</span> €{(item.price ?? 0).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold text-green-600">Price in Cart:</span>{' '}
              <span className="font-semibold text-green-700">€{(item.cart_price ?? 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onRemove(item.item_id)}
          className="mt-6 md:mt-8 self-start px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Remove ${item.brand} ${item.model} from cart`}
        >
          Remove from Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;
