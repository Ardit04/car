<?php
class Cart {
    private $items = [];

    public function addItem($item) {
        $this->items[] = $item;
        return ['message' => 'Item added to cart'];
    }

    public function removeItem($id) {
        $this->items = array_filter($this->items, fn($item) => $item['id'] !== $id);
        return ['message' => 'Item removed from cart'];
    }

    public function viewCart() {
        return $this->items;
    }

    public function clearCart() {
        $this->items = [];
        return ['message' => 'Cart cleared'];
    }
}