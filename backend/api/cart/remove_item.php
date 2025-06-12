<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../../models/Cart.php';

$cart = new Cart();
$data = json_decode(file_get_contents('php://input'), true);
echo json_encode($cart->removeItem($data['id']));