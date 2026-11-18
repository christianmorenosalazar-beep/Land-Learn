<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT m.*, u.nombre AS nombre_remitente 
        FROM mensajes_sala m
        JOIN usuarios u ON m.id_remitente = u.id_usuario
        WHERE m.id_intercambio = ? 
        ORDER BY m.id_mensaje ASC";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

$mensajes = [];
while ($row = $res->fetch_assoc()) {
    $mensajes[] = $row;
}

echo json_encode(["mensajes" => $mensajes, "mi_id" => $_SESSION['usuario_id'] ?? 0]);

$stmt->close();
$conexion->close();
