<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$id_intercambio = $_POST['id_intercambio'] ?? null;
$accion = $_POST['accion'] ?? '';

if (!$id_intercambio || !in_array($accion, ['aceptar', 'rechazar'])) {
    echo json_encode(["success" => false, "mensaje" => "Datos inválidos"]);
    exit();
}

$nuevo_estado = ($accion === 'aceptar') ? 2 : 3;
$mensaje_exito = ($accion === 'aceptar') ? "¡Trueque aceptado! El canal de chat se ha activado." : "Propuesta rechazada.";

$sql = "UPDATE intercambios SET id_estado = ? WHERE id_intercambio = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ii", $nuevo_estado, $id_intercambio);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "mensaje" => $mensaje_exito]);
} else {
    echo json_encode(["success" => false, "mensaje" => "Error al actualizar la base de datos."]);
}

$stmt->close();
$conexion->close();
