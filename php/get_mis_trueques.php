<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$u_id = $_SESSION['usuario_id'];

$sql = "SELECT i.id_intercambio, i.habilidad_ofrecida, i.habilidad_buscada,
               e.estado, i.fecha_creacion,
               CASE WHEN i.id_solicitante = ? THEN u2.nombre ELSE u1.nombre END AS nombre_pareja
        FROM intercambios i
        JOIN estado_intercambio e ON i.id_estado = e.id_estado
        JOIN usuarios u1 ON i.id_solicitante = u1.id_usuario
        JOIN usuarios u2 ON i.id_aceptante = u2.id_usuario
        WHERE i.id_solicitante = ? OR i.id_aceptante = ?
        ORDER BY i.fecha_creacion DESC";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("iii", $u_id, $u_id, $u_id);
$stmt->execute();
$res = $stmt->get_result();

$trueques = [];
while ($row = $res->fetch_assoc()) {
    $trueques[] = $row;
}

echo json_encode($trueques);

$stmt->close();
$conexion->close();
