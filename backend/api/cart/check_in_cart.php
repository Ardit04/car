<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../db/db.php';
require_once '../../models/Cart.php';

$userId = $_SESSION['user_id'] ?? null;
$itemId = $_GET['item_id'] ?? null;

if (!$userId || !$itemId) {
    echo json_encode(['exists' => false]);
    exit;
}

$cart = new Cart($pdo);
$exists = $cart->isItemInCart($userId, $itemId);

echo json_encode(['exists' => $exists]);
