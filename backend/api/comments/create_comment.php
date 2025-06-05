<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Comment.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['user_id']) || !isset($data['text'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid input: user_id and text are required'
    ]);
    exit;
}

$comment = new Comment($pdo);
$success = $comment->create($data);

if ($success) {
    echo json_encode([
        'success' => true,
        'message' => 'Comment created successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to create comment'
    ]);
}
?>
