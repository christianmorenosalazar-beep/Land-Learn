<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php'; 

$id_usuario = $_SESSION['usuario_id'];

$sql = "SELECT 
            u.nombre, 
            u.apellido_paterno, 
            u.foto_perfil, 
            u.fecha_registro,
            d.biografia, 
            d.disponibilidad, 
            d.match_ideal, 
            d.nivel_actual 
        FROM usuarios u
        LEFT JOIN detalles_match d ON u.id_usuario = d.id_usuario
        WHERE u.id_usuario = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$resultado = $stmt->get_result();

if ($datos = $resultado->fetch_assoc()) {
    echo json_encode($datos);
} else {
    echo json_encode(["error" => "Usuario no encontrado"]);
}

$stmt->close();
$conexion->close();
