<?php
require_once '../../db/db.php';  

class Cart {
    private $pdo;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        global $pdo;
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->prepare("SELECT * FROM cart");
        $stmt->execute();
        return $stmt;
    }

    public function addItem($item) {
    $userId = $_SESSION['user_id'] ?? 0;
    $itemId = $item['id'] ?? null;

    if (!$itemId) {
        return ['error' => 'Missing item ID'];
    }

    $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM cart WHERE item_id = ? AND user_id = ?");
    $stmt->execute([$itemId, $userId]);
    $exists = $stmt->fetchColumn();

    if ($exists) {
        return ['error' => 'Item already in cart'];
    }

    $stmt = $this->pdo->prepare("SELECT * FROM cars WHERE id = ?");
    $stmt->execute([$itemId]);
    $car = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$car) {
        return ['error' => 'Car not found'];
    }

    $stmt = $this->pdo->prepare("
        INSERT INTO cart (item_id, user_id, price, brand, model, image_url, mileage, fuel, year, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $success = $stmt->execute([
        $car['id'],
        $userId,
        $car['price'],
        $car['brand'],
        $car['model'],
        $car['image_url'],
        $car['mileage'],
        $car['fuel'],
        $car['year'],
        $car['description']
    ]);

    return $success
        ? ['message' => 'Item added to cart']
        : ['error' => 'Failed to insert', 'details' => $stmt->errorInfo()];
}


    public function removeItem($id) {
    $userId = $_SESSION['user_id'] ?? 0;

    $stmt = $this->pdo->prepare("DELETE FROM cart WHERE item_id = ? AND user_id = ?");
    $stmt->execute([$id, $userId]);
    
    if ($stmt->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}


    public function viewCart() {
        $userId = $_SESSION['user_id'] ?? 0;

        $stmt = $this->pdo->prepare("
            SELECT 
                item_id,
                price AS cart_price,
                brand,
                model,
                image_url,
                mileage,
                fuel,
                year,
                description
            FROM cart
            WHERE user_id = ?
        ");

        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

   public function clearCart() {
    $userId = $_SESSION['user_id'] ?? 0;
    if ($userId == 0) {
        return false;
    }

    $stmt = $this->pdo->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->execute([$userId]);

    return $stmt->rowCount() > 0;
}

    public function isItemInCart($userId, $itemId) {
    $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM cart WHERE user_id = ? AND item_id = ?");
    $stmt->execute([$userId, $itemId]);
    return $stmt->fetchColumn() > 0;
}


}
