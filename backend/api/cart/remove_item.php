<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Cart.php';

$data = json_decode(file_get_contents("php://input"), true);

$cart = new Cart($pdo);
$success = $cart->removeItem($data['id']);

echo json_encode([
    'message' => $success ? 'Item removed.' : 'Failed to remove item.'
]);
