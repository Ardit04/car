<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Car.php';

$car = new Car($pdo);
$result = $car->getAll();

$cars = $result->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($cars);
