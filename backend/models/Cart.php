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

    public function addItem($item) {
        if (!isset($_SESSION['user_id'])) {
            return ['error' => 'User not logged in'];
        }

        $userId = $_SESSION['user_id'];
        $itemId = $item['id'] ?? null;

        if (!$itemId) {
            return ['error' => 'Missing item ID'];
        }

        $stmt = $this->pdo->prepare("SELECT * FROM cars WHERE id = ?");
        $stmt->execute([$itemId]);
        $car = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$car) {
            return ['error' => 'Car not found'];
        }

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
            $car['image_url'], // Use the correct column name in your DB
            $car['mileage'],
            $car['fuel'],
            $car['year'],
            $car['description']
        ]);

        return $success
            ? ['message' => 'Item added to cart']
            : ['error' => 'Insert failed', 'details' => $stmt->errorInfo()];
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


    public function getAll() {
        return $this->viewCart();
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
