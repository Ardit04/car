<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include DB connection
require_once '../../db/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST allowed']);
    exit;
}

// Validate fields
$required = ['brand', 'model', 'year', 'price', 'description'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing field: $field"]);
        exit;
    }
}

// Handle image upload
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Image upload failed']);
    exit;
}

$uploadDir = '../../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$imageTmpPath = $_FILES['image']['tmp_name'];
$imageName = basename($_FILES['image']['name']);
$uploadPath = $uploadDir . $imageName;

if (!move_uploaded_file($imageTmpPath, $uploadPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to move uploaded file']);
    exit;
}

// Insert into database
try {
    $stmt = $pdo->prepare("INSERT INTO cars (brand, model, year, price, description, image_url) 
                           VALUES (:brand, :model, :year, :price, :description, :image_url)");
    $stmt->execute([
        ':brand' => $_POST['brand'],
        ':model' => $_POST['model'],
        ':year' => $_POST['year'],
        ':price' => $_POST['price'],
        ':description' => $_POST['description'],
        ':image_url' => $imageName
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Car created and saved to database',
        'car' => [
            'brand' => $_POST['brand'],
            'model' => $_POST['model'],
            'year' => $_POST['year'],
            'price' => $_POST['price'],
            'description' => $_POST['description'],
            'image_url' => $imageName
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB insert failed: ' . $e->getMessage()]);
    exit;
}
