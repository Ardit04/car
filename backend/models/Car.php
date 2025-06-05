<?php
class Car {
    private $conn;
    private $table = 'cars';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM {$this->table}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getById($id) {
        $query = "SELECT * FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

   public function create($data) {
    $query = "INSERT INTO {$this->table} (brand, model, year, price, description, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $this->conn->prepare($query);
    $result = $stmt->execute([
        $data['brand'],
        $data['model'],
        $data['year'],
        $data['price'],
        $data['description'] ?? null,
        $data['imageUrl'] ?? null
    ]);

    if (!$result) {
        return $stmt->errorInfo(); // Kthe error
    }

    return true;
}


    public function update($id, $data) {
        $query = "UPDATE {$this->table} SET brand = ?, model = ?, year = ?, price = ?, description = ?, image_url = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $result = $stmt->execute([
            $data['brand'],
            $data['model'],
            $data['year'],
            $data['price'],
            $data['description'] ?? null,
            $data['imageUrl'] ?? null,
            $id
        ]);

        if (!$result) {
            error_log(print_r($stmt->errorInfo(), true));
        }

        return $result;
    }

    public function delete($id) {
        $query = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $result = $stmt->execute([$id]);

        if (!$result) {
            error_log(print_r($stmt->errorInfo(), true));
        }

        return $result;
    }
}
?>
