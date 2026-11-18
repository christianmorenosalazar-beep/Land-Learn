<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$id_usuario     = intval($_SESSION['usuario_id']);
$biografia      = trim($_POST['biografia'] ?? '');
$disponibilidad = trim($_POST['disponibilidad'] ?? '');
$match_ideal    = trim($_POST['match_ideal'] ?? '');

$sql = "INSERT INTO detalles_match (id_usuario, biografia, disponibilidad, match_ideal)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            biografia      = VALUES(biografia),
            disponibilidad = VALUES(disponibilidad),
            match_ideal    = VALUES(match_ideal)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("isss", $id_usuario, $biografia, $disponibilidad, $match_ideal);

if ($stmt->execute()) {
    echo json_encode(["success"=>true, "mensaje"=>"Perfil actualizado con exito."]);
} else {
    echo json_encode(["success"=>false, "mensaje"=>"Error de MySQL: ".$conexion->error]);
}

$stmt->close();
$conexion->close();
