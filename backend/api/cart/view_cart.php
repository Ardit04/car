<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../../db/db.php';
require_once '../../models/Cart.php';

$cart = new Cart($pdo);
$result = $cart->getAll();

$cart = $result->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($cart);

