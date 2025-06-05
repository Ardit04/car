const API_BASE_URL = '/backend/api/cart';

export const addItemToCart = async (item) => {
    const response = await fetch(`${API_BASE_URL}/add_item.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    return response.json();
};

export const removeItemFromCart = async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/remove_item.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId }),
    });
    return response.json();
};

export const viewCart = async () => {
    const response = await fetch(`${API_BASE_URL}/view_cart.php`);
    return response.json();
};

export const clearCart = async () => {
    const response = await fetch(`${API_BASE_URL}/clear_cart.php`, {
        method: 'POST',
    });
    return response.json();
};