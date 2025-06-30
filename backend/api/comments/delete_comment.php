<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../db/db.php';
require_once '../../models/Comment.php';

parse_str($_SERVER['QUERY_STRING'], $params);
$id = $params['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'Missing ID']);
    exit;
}

$comment = new Comment($pdo);
$success = $comment->delete($id);

echo json_encode(['success' => $success]);
