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

$data = json_decode(file_get_contents("php://input"), true);

$cart = new Cart($pdo);
$success = $cart->removeItem($data['id']);

echo json_encode([
    'message' => $success ? 'Item removed.' : 'Failed to remove item.'
]);
