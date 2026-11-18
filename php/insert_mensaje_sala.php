<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$id_remitente = $_SESSION['usuario_id'];
$id_intercambio = $_POST['id_intercambio'] ?? null;
$mensaje = trim($_POST['mensaje'] ?? '');

if ($id_intercambio && !empty($mensaje)) {
    $sql = "INSERT INTO mensajes_sala (id_intercambio, id_remitente, mensaje) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iis", $id_intercambio, $id_remitente, $mensaje);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Error al insertar en BD"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}
$conexion->close();
