<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Car.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

if (!isset($_POST['brand'], $_POST['model'], $_POST['year'], $_POST['price'])) {
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$imageUrl = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../../uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $filename = time() . '_' . basename($_FILES['image']['name']); // emër unik
    $targetFilePath = $uploadDir . $filename;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
        $imageUrl = 'uploads/' . $filename;
    } else {
        echo json_encode(['error' => 'Failed to move uploaded file']);
        exit;
    }
}

$data = [
    'brand' => $_POST['brand'],
    'model' => $_POST['model'],
    'year' => $_POST['year'],
    'price' => $_POST['price'],
    'description' => $_POST['description'] ?? null,
    'imageUrl' => $imageUrl
];

$car = new Car($pdo);
$result = $car->create($data);

if ($result !== true) {
    echo json_encode([
        'success' => false,
        'error' => $result
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Car created successfully'
]);
