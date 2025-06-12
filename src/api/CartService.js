const BASE_URL = 'http://localhost/car/backend/api/cart';

export const addItemToCart = async (item) => {
    const response = await fetch(`${BASE_URL}/add_item.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item), // correct JSON stringified body
    });
    return response.json();
};

export const removeItemFromCart = async (itemId) => {
    const response = await fetch(`${BASE_URL}/remove_item.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId }), // also correct
    });
    return response.json();
};

export const viewCart = async () => {
    const response = await fetch(`${BASE_URL}/view_cart.php`); // GET request, no body needed
    return response.json();
};

export const clearCart = async () => {
    const response = await fetch(`${BASE_URL}/clear_cart.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Add header if PHP expects JSON
        body: JSON.stringify({}), // send empty JSON object to avoid input errors
    });
    return response.json();
};
