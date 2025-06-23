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

        // Get full car info from DB
        $stmt = $this->pdo->prepare("SELECT * FROM cars WHERE id = ?");
        $stmt->execute([$itemId]);
        $car = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$car) {
            return ['error' => 'Car not found'];
        }

        // Insert full car info into cart
        $stmt = $this->pdo->prepare("
            INSERT INTO cart (
                item_id, user_id, price, brand, model, photo, mileage, fuel, year, description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $success = $stmt->execute([
            $car['id'],
            $userId,
            $car['price'],
            $car['brand'],
            $car['model'],
            $car['image_url'], // correct DB column
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
        if ($stmt->execute([$id, $userId])) {
            return ['message' => 'Item removed from cart'];
        } else {
            return ['error' => 'Failed to remove item', 'details' => $stmt->errorInfo()];
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
                photo,
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

        $stmt = $this->pdo->prepare("DELETE FROM cart WHERE user_id = ?");
        if ($stmt->execute([$userId])) {
            return ['message' => 'Cart cleared'];
        } else {
            return ['error' => 'Failed to clear cart', 'details' => $stmt->errorInfo()];
        }
    }
}
