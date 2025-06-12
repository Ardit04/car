<?php

require_once '../../db/db.php'; // <-- this includes the $pdo object

class Contact {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function save($name, $email, $message) {
        $sql = "INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)";
        $stmt = $this->pdo->prepare($sql);

        if (!$stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message
        ])) {
            throw new Exception("Failed to insert message.");
        }
    }
}
