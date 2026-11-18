<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$mi_id     = $_SESSION['usuario_id'];
$id_inter  = intval($_POST['id_intercambio'] ?? 0);
$categoria = trim($_POST['categoria'] ?? '');
$habilidad = trim($_POST['habilidad'] ?? '');
$enfoque   = trim($_POST['enfoque'] ?? '');
$cupos     = intval($_POST['cupos'] ?? 2);
$tiempo    = intval($_POST['tiempo_limite'] ?? 45);

if (!$id_inter) { echo json_encode(["success"=>false,"mensaje"=>"Datos incompletos"]); exit(); }

$chk = $conexion->prepare("SELECT id_solicitante FROM intercambios WHERE id_intercambio = ?");
$chk->bind_param("i", $id_inter);
$chk->execute();
$row = $chk->get_result()->fetch_assoc();
$chk->close();

if (!$row || $row['id_solicitante'] != $mi_id) {
    echo json_encode(["success"=>false,"mensaje"=>"Solo el anfitrion puede abrir la sala"]); exit();
}

$cols = [];
$q = $conexion->query("SHOW COLUMNS FROM intercambios");
while ($c = $q->fetch_assoc()) { $cols[] = $c['Field']; }

if (in_array('categoria_sala', $cols)) {
    $stmt = $conexion->prepare(
        "UPDATE intercambios SET id_estado = 2, categoria_sala = ?, habilidad_sala = ?,
         enfoque_sala = ?, cupos = ?, tiempo_limite = ? WHERE id_intercambio = ?");
    $stmt->bind_param("sssiii", $categoria, $habilidad, $enfoque, $cupos, $tiempo, $id_inter);
} else {
    $stmt = $conexion->prepare(
        "UPDATE intercambios SET id_estado = 2, tiempo_limite = ? WHERE id_intercambio = ?");
    $stmt->bind_param("ii", $tiempo, $id_inter);
}

echo json_encode($stmt->execute()
    ? ["success"=>true]
    : ["success"=>false,"mensaje"=>"No se pudo abrir la sala"]);
$stmt->close();
$conexion->close();
