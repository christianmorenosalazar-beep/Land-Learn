<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$id_usuario = $_SESSION['usuario_id'];
$topico     = trim($_POST['topico']  ?? '');
$puntaje    = intval($_POST['puntaje'] ?? 0);

if (!$topico || $puntaje < 12) {
    echo json_encode(["success" => false, "error" => "Datos inválidos o puntaje insuficiente."]);
    exit();
}

$chk = $conexion->prepare("SELECT id_certificacion FROM certificaciones WHERE id_usuario = ? AND topico = ?");
$chk->bind_param("is", $id_usuario, $topico);
$chk->execute();
if ($chk->get_result()->num_rows > 0) {
    echo json_encode(["success" => true, "mensaje" => "Ya tenías esta certificación."]);
    exit();
}
$chk->close();

$sql = "INSERT INTO certificaciones (id_usuario, topico, puntaje, fecha_certificacion) VALUES (?, ?, ?, NOW())";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("isi", $id_usuario, $topico, $puntaje);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conexion->error]);
}
$stmt->close();
$conexion->close();
