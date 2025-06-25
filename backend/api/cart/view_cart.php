<?php
session_start(); 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Cart.php';

try {
    $cart = new Cart();
    $items = $cart->viewCart(); 
    echo json_encode($items);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
