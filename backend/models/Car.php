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
        $query = "INSERT INTO {$this->table} (brand, model, year, price, fuel, mileage, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $result = $stmt->execute([
            $data['brand'],
            $data['model'],
            $data['year'],
            $data['price'],
            $data['fuel'],
            $data['mileage'],
            $data['description'] ?? null,
            $data['image_url'] ?? null
        ]);


    if (!$result) {
        return $stmt->errorInfo(); // Kthe error
    }

    return true;
}


    public function update($id, $data) {
    $sql = "UPDATE cars SET brand = :brand, model = :model, year = :year, price = :price, description = :description";

    if (!empty($data['image_url'])) {
        $sql .= ", image_url = :image_url";
    }

    $sql .= " WHERE id = :id";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindValue(':brand', $data['brand']);
    $stmt->bindValue(':model', $data['model']);
    $stmt->bindValue(':year', $data['year']);
    $stmt->bindValue(':price', $data['price']);
    $stmt->bindValue(':description', $data['description']);

    if (!empty($data['image_url'])) {
        $stmt->bindValue(':image_url', $data['image_url']);
    }

    $stmt->bindValue(':id', $id, PDO::PARAM_INT);

    return $stmt->execute();
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
