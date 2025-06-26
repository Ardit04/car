import React, { useEffect, useState } from 'react';
import { viewCart, clearCart, removeItemFromCart, checkout } from '../api/CartService';
import CartItem from './CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const items = await viewCart();
      setCartItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClearCart = async () => {
    const response = await clearCart();
    if (response?.message) {
      alert(response.message);
      fetchCart();
    } else {
      console.error(response?.error || 'Clear cart failed');
    }
  };

  const handleRemoveItem = async (itemId) => {
    const res = await removeItemFromCart(itemId);
    if (res.message) {
      fetchCart();
    } else {
      console.error(res.error || 'Failed to remove item');
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.cart_price || 0), 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const response = await checkout(totalPrice);
      if (response?.message) {
        alert(response.message);
        await handleClearCart(); 
      } else {
        alert('Checkout failed: ' + (response.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again later.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {loading ? (
        <p className="text-gray-500 italic">Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 italic">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem key={item.item_id || index} item={item} onRemove={handleRemoveItem} />
          ))}

          <div className="mt-6 p-4 bg-gray-100 rounded text-lg font-medium text-gray-800">
            Total: <span className="text-green-600 font-bold">€{totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
