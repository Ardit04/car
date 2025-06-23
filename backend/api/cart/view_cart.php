<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Cart.php';

try {
    $cart = new Cart($pdo);
    $result = $cart->getAll();
    $items = $result->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
