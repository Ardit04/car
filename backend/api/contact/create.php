<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once 'Contact.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

if ($name && $email && $message) {
    try {
        $contact = new Contact('localhost', 'root', '', 'car_shop_db');
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
?>
