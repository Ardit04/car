<?php

require_once '../../models/Cart.php';

$cart = new Cart();
echo json_encode($cart->clearCart());