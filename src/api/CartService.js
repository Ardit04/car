const BASE_URL = 'http://localhost/car/backend/api/cart';

export const checkout = async (total) => {
  try {
    const response = await fetch(`${BASE_URL}/checkout.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ total }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Checkout failed:', error);
    return { error: error.message };
  }
};

export const addItemToCart = async (item) => {
  try {
    const response = await fetch(`${BASE_URL}/add_item.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  
      body: JSON.stringify(item),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      throw new Error("Server error: Invalid response format");
    }

    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(result.error || 'Failed to add item to cart');
    }

    return result;
  } catch (error) {
    console.error("Add to cart failed:", error.message);
    return { error: error.message };
  }
};


export const removeItemFromCart = async (itemId) => {
  try {
    const response = await fetch(`${BASE_URL}/remove_item.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: itemId }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Remove from cart failed:", error.message);
    return { error: error.message };
  }
};



export const viewCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/view_cart.php`, {
      credentials: 'include'
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response from view_cart.php:", text);
      return [];
    }

    const items = await response.json();
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error("Fetching cart failed:", error.message);
    return [];
  }
};

export const clearCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/clear_cart.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({}),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Clear cart failed:", error.message);
    return { error: error.message };
  }
};

