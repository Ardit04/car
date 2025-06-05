<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Car.php';

parse_str($_SERVER['QUERY_STRING'], $params);
$id = $params['id'] ?? null;
$data = json_decode(file_get_contents("php://input"), true);

if (!$id || !$data) {
    echo json_encode(['error' => 'Missing ID or data']);
    exit;
}

$car = new Car($pdo);
$success = $car->update($id, $data);

echo json_encode(['success' => $success]);
