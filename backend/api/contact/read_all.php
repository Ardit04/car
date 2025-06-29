<?php
require_once '../../db/db.php';
require_once '../../models/Contact.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $contact = new Contact($pdo);
    $messages = $contact->getAll();

    echo json_encode([
        'success' => true,
        'data' => $messages
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
