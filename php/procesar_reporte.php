<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$mi_id = $_SESSION['usuario_id'];
$reportado_id = intval($_POST['reportado_id'] ?? 0);
$motivo = trim($_POST['motivo'] ?? '');

if (!$reportado_id || empty($motivo)) {
    echo json_encode(["success" => false, "error" => "Datos incompletos."]);
    exit();
}

if ($mi_id === $reportado_id) {
    echo json_encode(["success" => false, "error" => "No puedes reportarte a ti mismo."]);
    exit();
}

$sql_insert = "INSERT INTO reporte (reportador_id, reportado_id, motivo, estado) VALUES (?, ?, ?, 'Pendiente')";
$stmt_insert = $conexion->prepare($sql_insert);
$stmt_insert->bind_param("iis", $mi_id, $reportado_id, $motivo);

if ($stmt_insert->execute()) {
    echo json_encode(["success" => true, "mensaje" => "Reporte enviado al Administrador."]);
} else {
    echo json_encode(["success" => false, "error" => $conexion->error]);
}

$stmt_insert->close();
$conexion->close();
