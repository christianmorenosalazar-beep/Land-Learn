<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$mi_id = $_SESSION['usuario_id'];

$sql = "SELECT i.id_intercambio, i.habilidad_ofrecida, i.habilidad_buscada,
               u.nombre AS nombre_remitente
        FROM intercambios i
        JOIN usuarios u ON i.id_solicitante = u.id_usuario
        WHERE i.id_aceptante = ? AND i.id_estado = 1
        ORDER BY i.id_intercambio DESC";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $mi_id);
$stmt->execute();
$res = $stmt->get_result();

$out = [];
while ($row = $res->fetch_assoc()) { $out[] = $row; }
echo json_encode($out);
$stmt->close(); $conexion->close();
