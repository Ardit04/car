<?php

header("Access-Control-Allow-Origin: *"); // Allow requests from the frontend
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Access-Control-Allow-Credentials: true"); // Allow cookies if needed
require_once '../../db/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    file_put_contents('php://stderr', print_r($data, true));
    error_log("Received data: " . print_r($data, true));
    $username = $data->username;
    $email = $data->email;
    $number = $data->number;
    
    $password = password_hash($data->password, PASSWORD_BCRYPT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        if ($stmt->execute([$username, $email, $password])) {
            echo json_encode(["status" => "success", "message" => "User registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to execute query"]);
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry error code
            echo json_encode(["status" => "error", "message" => "Email already exists"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Registration failed: " . $e->getMessage()]);
        }
    }
}
?>
