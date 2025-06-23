<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../models/Cart.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

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
$result = $cart->addItem($data);

echo json_encode($result);
