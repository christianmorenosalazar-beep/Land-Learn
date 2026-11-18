<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$stmt = $conexion->prepare("SELECT es_admin FROM usuarios WHERE id_usuario = ?");
$stmt->bind_param("i", $_SESSION['usuario_id']);
$stmt->execute();
$u = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$u || intval($u['es_admin']) !== 1) { echo json_encode(["error"=>"Acceso denegado."]); exit(); }

$stats = [
    "total_usuarios"      => $conexion->query("SELECT COUNT(*) t FROM usuarios")->fetch_assoc()['t'],
    "total_intercambios"  => $conexion->query("SELECT COUNT(*) t FROM intercambios")->fetch_assoc()['t'],
    "total_salas"         => $conexion->query("SELECT COUNT(*) t FROM intercambios WHERE id_estado >= 2")->fetch_assoc()['t'],
    "reportes_pendientes" => $conexion->query("SELECT COUNT(*) t FROM reporte WHERE estado='Pendiente'")->fetch_assoc()['t']
];

$res = $conexion->query(
    "SELECT r.id_reporte, r.reportador_id, r.reportado_id, r.motivo, r.estado, r.fecha_reporte,
            u1.nombre AS nombre_reportador, u2.nombre AS nombre_reportado
     FROM reporte r
     JOIN usuarios u1 ON r.reportador_id = u1.id_usuario
     JOIN usuarios u2 ON r.reportado_id  = u2.id_usuario
     ORDER BY r.fecha_reporte DESC");

$reportes = [];
while ($r = $res->fetch_assoc()) { $reportes[] = $r; }

echo json_encode(["stats"=>$stats, "reportes"=>$reportes]);
$conexion->close();
