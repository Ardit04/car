<?php

require_once '../../db/db.php'; 

class Contact {
    private $table = 'contacts';
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

   public function save($name, $email, $message) {
    $sql = "INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)";
    $stmt = $this->pdo->prepare($sql);

    if (!$stmt) {
        throw new Exception("SQL prepare failed: " . implode(", ", $this->pdo->errorInfo()));
    }

    if (!$stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':message' => $message
    ])) {
        throw new Exception("SQL execute failed: " . implode(", ", $stmt->errorInfo()));
    }
}
    public function getAll() {
    $sql = "SELECT * FROM contacts ORDER BY id DESC";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
    public function delete($id) {
        $query = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->pdo->prepare($query);
        $result = $stmt->execute([$id]);

        if (!$result) {
            error_log(print_r($stmt->errorInfo(), true));
        }

        return $result;
    }

}