<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

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
