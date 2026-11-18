<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$mi_id = $_SESSION['usuario_id'];
$id_intercambio = intval($_GET['id'] ?? $_POST['id_intercambio'] ?? 0);

if (!$id_intercambio) {
    echo json_encode(["error" => "Falta ID de intercambio"]);
    exit();
}

$sql_check = "SELECT id_intercambio FROM intercambios
              WHERE id_intercambio = ? AND (id_solicitante = ? OR id_aceptante = ?)";
$stmt_check = $conexion->prepare($sql_check);
$stmt_check->bind_param("iii", $id_intercambio, $mi_id, $mi_id);
$stmt_check->execute();
if ($stmt_check->get_result()->num_rows === 0) {
    echo json_encode(["error" => "No autorizado para este chat"]);
    exit();
}
$stmt_check->close();

$sql = "SELECT m.id_mensaje, m.mensaje, m.fecha_envio,
               m.id_remitente, u.nombre AS nombre_remitente
        FROM mensajes m
        JOIN usuarios u ON m.id_remitente = u.id_usuario
        WHERE m.id_intercambio = ?
        ORDER BY m.fecha_envio ASC";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_intercambio);
$stmt->execute();
$res = $stmt->get_result();

$mensajes = [];
while ($row = $res->fetch_assoc()) { $mensajes[] = $row; }
$stmt->close();

echo json_encode([
    "mensajes" => $mensajes,
    "mi_id"    => $mi_id
]);

$conexion->close();
