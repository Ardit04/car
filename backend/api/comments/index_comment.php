<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../../db/db.php';
require_once '../../models/Comment.php';

$commentModel = new Comment($pdo);

try {
    if (isset($_GET['user_id'])) {
        $userId = intval($_GET['user_id']);
        $comments = $commentModel->getCommentsByUserId($userId);
    } else {
        $stmt = $commentModel->getAll();
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        'success' => true,
        'comments' => $comments
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching comments: ' . $e->getMessage()
    ]);
}
