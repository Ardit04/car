<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

require_once '../../db/db.php';

$userId = $_SESSION['user_id'] ?? 0;
if ($userId === 0) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$total = $input['total'] ?? 0;

if ($total <= 0) {
    echo json_encode(['error' => 'Invalid total amount']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO payments (user_id, total_amount, payment_date, status) VALUES (?, ?, NOW(), ?)");
    $status = 'paid';
    $stmt->execute([$userId, $total, $status]);

    $stmt2 = $pdo->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt2->execute([$userId]);

    echo json_encode(['message' => 'Payment successful! Thank you for your purchase.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
