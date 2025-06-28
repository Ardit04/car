<?php
class Comment {
    private $conn;
    private $table = 'comments';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
    $query = "
        SELECT c.id, c.comment, c.car_id, c.user_id, u.username AS user_name
        FROM {$this->table} c
        LEFT JOIN users u ON c.user_id = u.id
        ORDER BY c.id DESC
    ";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}


    public function getCommentsByUserId($userId) {
    $query = "
        SELECT c.id, c.comment, c.car_id, c.user_id, u.username AS user_name
        FROM {$this->table} c
        JOIN users u ON c.user_id = u.id
        WHERE c.user_id = :user_id
    ";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}



    public function create($data) {
        $query = "INSERT INTO {$this->table} (user_id, comment, car_id) VALUES (:user_id, :comment, :car_id)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':comment', $data['text']);
        $stmt->bindParam(':car_id', $data['car_id']);
        return $stmt->execute();
    }

    public function update($id, $text) {
        $query = "UPDATE {$this->table} SET comment = :comment WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':comment', $text);
        return $stmt->execute();
    }

    public function delete($id) {
    $query = "DELETE FROM {$this->table} WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $result = $stmt->execute();

    if (!$result) {
        $error = $stmt->errorInfo();
        error_log("Delete failed: " . implode(", ", $error));
    }

    return $result;
}

}
