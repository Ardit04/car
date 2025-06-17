<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Car.php';

parse_str($_SERVER['QUERY_STRING'], $params);
$id = $params['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'Missing ID']);
    exit;
}

$data = [
    'brand' => $_POST['brand'] ?? '',
    'model' => $_POST['model'] ?? '',
    'year' => $_POST['year'] ?? '',
    'price' => $_POST['price'] ?? '',
    'description' => $_POST['description'] ?? '',
];

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../../uploads/';
    $filename = uniqid() . '_' . basename($_FILES['image']['name']);
    $targetPath = $uploadDir . $filename;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
        $data['image_url'] = $filename;
    } else {
        echo json_encode(['error' => 'Image upload failed']);
        exit;
    }
}

$car = new Car($pdo);
$success = $car->update($id, $data);

echo json_encode(['success' => $success]);
