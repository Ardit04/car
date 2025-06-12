<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../../models/Cart.php';

header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data === null) {
    echo json_encode([
        'error' => 'Invalid JSON input',
        'raw_input' => $input
    ]);
    exit;
}

$cart = new Cart();

echo json_encode($cart->addItem($data));
