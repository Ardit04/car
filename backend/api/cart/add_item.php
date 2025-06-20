<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../../db/db.php';
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

echo json_encode($cart->addItem($data));
