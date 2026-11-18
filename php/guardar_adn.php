<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$id_usuario     = $_SESSION['usuario_id'];
$biografia      = $_POST['biografia']      ?? '';
$match_ideal    = $_POST['match_ideal']    ?? '';
$disponibilidad = $_POST['disponibilidad'] ?? '';

$sql = "INSERT INTO detalles_match (id_usuario, biografia, match_ideal, disponibilidad)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            biografia      = VALUES(biografia),
            match_ideal    = VALUES(match_ideal),
            disponibilidad = VALUES(disponibilidad)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("isss", $id_usuario, $biografia, $match_ideal, $disponibilidad);

if ($stmt->execute()) {
    $stmt->close();
    $conexion->close();
    exito(["mensaje" => "ADN guardado correctamente."]);
}

$stmt->close();
$conexion->close();
fallo("No se pudo guardar tu perfil. Intenta de nuevo.", 500);
