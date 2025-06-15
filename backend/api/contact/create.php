<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../../db/db.php'; // this defines $pdo
require_once '../../models/Contact.php';

$rawData = file_get_contents("php://input");
// file_put_contents("debug.txt", $rawData); // ← Remove this in production

$data = json_decode($rawData, true);
if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON or missing Content-Type header",
        "raw" => $rawData
    ]);
    exit;
}

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

if ($name && $email && $message) {
    try {
        $contact = new Contact($pdo);
        $contact->save($name, $email, $message);
        echo json_encode(['success' => true, 'message' => 'Message saved!']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
}

// var_dump($data); // ← Remove this, it breaks the JSON
