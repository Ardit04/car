<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Cart.php';

$cart = new Cart($pdo);
$success = $cart->clearCart();

echo json_encode([
    'message' => $success ? 'Cart cleared.' : 'Failed to clear cart.'
]);
