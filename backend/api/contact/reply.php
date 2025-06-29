<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? null;
$subject = $data['subject'] ?? 'Reply from Admin';
$message = $data['message'] ?? null;

if (!$email || !$message) {
    echo json_encode(['success' => false, 'message' => 'Missing email or message']);
    exit;
}

// Headers
$headers = "From: admin@yourdomain.com\r\n";
$headers .= "Reply-To: admin@yourdomain.com\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Dërgo emailin
$sent = mail($email, $subject, nl2br($message), $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email.']);
}
