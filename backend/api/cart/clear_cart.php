<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../db/db.php';
require_once '../../models/Cart.php';

$cart = new Cart($pdo);
$success = $cart->clearCart();

echo json_encode([
    'message' => $success ? 'Cart cleared.' : 'Failed to clear cart.'
]);
