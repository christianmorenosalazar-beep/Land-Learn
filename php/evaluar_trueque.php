<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

function sumarXP($conexion, $id_usuario, $cantidad) {
    $q = $conexion->prepare("SELECT experiencia FROM usuarios WHERE id_usuario = ?");
    $q->bind_param("i", $id_usuario);
    $q->execute();
    $row = $q->get_result()->fetch_assoc();
    $q->close();

    if (!$row) return false;

    $actual = intval($row['experiencia']);
    $nuevo  = $actual + intval($cantidad);

    $up = $conexion->prepare("UPDATE usuarios SET experiencia = ? WHERE id_usuario = ?");
    $up->bind_param("ii", $nuevo, $id_usuario);
    $ok = $up->execute();
    $up->close();

    return $ok ? ["antes"=>$actual, "sumado"=>intval($cantidad), "total"=>$nuevo] : false;
}

$id_evaluador   = $_SESSION['usuario_id'];
$id_intercambio = intval($_POST['id_intercambio'] ?? 0);
$puntuacion     = intval($_POST['puntuacion']     ?? 0);
$comentario     = trim($_POST['comentario']       ?? '');

if (!$id_intercambio || $puntuacion < 1 || $puntuacion > 5) {
    echo json_encode(["success"=>false, "mensaje"=>"Selecciona una puntuacion valida (1-5)."]); exit();
}

$chk = $conexion->prepare("SELECT id_calificacion FROM calificaciones WHERE id_intercambio=? AND id_evaluador=?");
$chk->bind_param("ii", $id_intercambio, $id_evaluador);
$chk->execute();
$ya = $chk->get_result()->num_rows > 0;
$chk->close();

if ($ya) { echo json_encode(["success"=>true, "mensaje"=>"Ya evaluaste este trueque."]); exit(); }

$info = $conexion->prepare("SELECT id_solicitante, id_aceptante FROM intercambios WHERE id_intercambio=?");
$info->bind_param("i", $id_intercambio);
$info->execute();
$sala = $info->get_result()->fetch_assoc();
$info->close();

if (!$sala) { echo json_encode(["success"=>false, "mensaje"=>"Intercambio no encontrado."]); exit(); }

$soy_anfitrion = ($id_evaluador == $sala['id_solicitante']);
$id_evaluado   = $soy_anfitrion ? $sala['id_aceptante'] : $sala['id_solicitante'];

$ins = $conexion->prepare(
    "INSERT INTO calificaciones (id_intercambio, id_evaluador, id_evaluado, puntuacion, comentario)
     VALUES (?, ?, ?, ?, ?)");
$ins->bind_param("iiiis", $id_intercambio, $id_evaluador, $id_evaluado, $puntuacion, $comentario);
$guardo = $ins->execute();
$ins->close();

if (!$guardo) { echo json_encode(["success"=>false, "mensaje"=>"Error al guardar la evaluacion."]); exit(); }

$detalle = [];

if ($soy_anfitrion) {
    $r = sumarXP($conexion, $id_evaluado, 10);
    $detalle["companero"] = $r;
    $msg = "Tu companero recibio +10 XP por aprender (total: {$r['total']} XP).";
} else {
    $xp_maestro = $puntuacion * 10;
    $rm = sumarXP($conexion, $id_evaluado,  $xp_maestro);
    $ry = sumarXP($conexion, $id_evaluador, 10);
    $detalle["maestro"] = $rm;
    $detalle["yo"]      = $ry;
    $msg = "El anfitrion recibio +{$xp_maestro} XP (total: {$rm['total']}). Tu ganaste +10 XP (total: {$ry['total']}).";

    $close = $conexion->prepare("UPDATE intercambios SET id_estado=3 WHERE id_intercambio=?");
    $close->bind_param("i", $id_intercambio);
    $close->execute();
    $close->close();
}

$conexion->close();
echo json_encode([
    "success" => true,
    "mensaje" => "Evaluacion registrada. {$msg}",
    "xp"      => $detalle
]);
