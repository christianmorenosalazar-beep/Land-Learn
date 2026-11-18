<?php
require_once __DIR__ . '/sesion.php';
try {

    include __DIR__ . '/conexion.php';

    

    $mi_id = $_SESSION['usuario_id'];
    $estado_aceptado = 2; // Estado 2 = Aceptado

    $sql = "SELECT i.id_intercambio, 
            CASE 
                WHEN i.id_solicitante = ? THEN i.habilidad_buscada 
                ELSE i.habilidad_ofrecida 
            END AS habilidad_intercambio,
            CASE 
                WHEN i.id_solicitante = ? THEN u2.nombre 
                ELSE u1.nombre 
            END AS nombre_pareja
            FROM intercambios i
            JOIN usuarios u1 ON i.id_solicitante = u1.id_usuario
            JOIN usuarios u2 ON i.id_aceptante = u2.id_usuario
            WHERE (i.id_solicitante = ? OR i.id_aceptante = ?) 
            AND i.id_estado = ?";

    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode(["error" => "Error al preparar la consulta"]);
        exit();
    }

    $stmt->bind_param("iiiii", $mi_id, $mi_id, $mi_id, $mi_id, $estado_aceptado);
    $stmt->execute();
    $res = $stmt->get_result();

    $chats = [];
    while($row = $res->fetch_assoc()) { 
        $chats[] = $row; 
    }

    echo json_encode($chats);

    $stmt->close();
    $conexion->close();

} catch (Exception $e) {
    echo json_encode(["error" => "Excepción SQL: " . $e->getMessage()]);
}
