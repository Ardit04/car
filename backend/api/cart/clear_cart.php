<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../../models/Cart.php';

$cart = new Cart();
echo json_encode($cart->clearCart());