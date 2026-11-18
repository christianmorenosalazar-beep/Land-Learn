<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$mi_id = $_SESSION['usuario_id'];

$sql = "SELECT u.nombre, u.apellido_paterno, d.nivel_actual, d.biografia 
        FROM usuarios u
        LEFT JOIN detalles_match d ON u.id_usuario = d.id_usuario
        WHERE u.id_usuario != ? 
        ORDER BY u.id_usuario DESC";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $mi_id);
$stmt->execute();
$resultado = $stmt->get_result();

$comunidad = [];
while ($row = $resultado->fetch_assoc()) {
    $comunidad[] = $row;
}

echo json_encode($comunidad);

$stmt->close();
$conexion->close();
