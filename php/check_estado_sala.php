<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$id = intval($_GET['id'] ?? 0);
if (!$id) { echo json_encode(["error"=>"ID invalido"]); exit(); }

$sql = "SELECT i.id_estado, us.nombre AS nombre_emisor, ua.nombre AS nombre_receptor
        FROM intercambios i
        JOIN usuarios us ON i.id_solicitante = us.id_usuario
        JOIN usuarios ua ON i.id_aceptante   = ua.id_usuario
        WHERE i.id_intercambio = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$r = $stmt->get_result()->fetch_assoc();
$stmt->close(); $conexion->close();

echo json_encode($r ?: ["error"=>"No encontrado"]);
