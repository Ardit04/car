<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000"); // Your frontend URL here
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['email']) || !isset($input['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        exit;
    }

    $email = $input['email'];
    $password = $input['password'];

    $stmt = $pdo->prepare("SELECT id, username, password, role FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role'];

            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user" => [
                    "id" => $user['id'],
                    "username" => $user['username'],
                    "role" => $user['role']
                ]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
