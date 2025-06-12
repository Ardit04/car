<?php
// NO session_start() here
// NO require_once here

class Cart {
    public function __construct() {
        if (!isset($_SESSION['cart_items'])) {
            $_SESSION['cart_items'] = [];
        }
    }

    public function addItem($item) {
        $_SESSION['cart_items'][] = $item;
        return ['message' => 'Item added to cart'];
    }

    public function removeItem($id) {
        $_SESSION['cart_items'] = array_filter($_SESSION['cart_items'], fn($item) => $item['id'] !== $id);
        return ['message' => 'Item removed from cart'];
    }

    public function viewCart() {
        return $_SESSION['cart_items'];
    }

    public function clearCart() {
        $_SESSION['cart_items'] = [];
        return ['message' => 'Cart cleared'];
    }
}
