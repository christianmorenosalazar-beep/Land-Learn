<?php
require_once __DIR__ . '/sesion.php';
try {

    include __DIR__ . '/conexion.php';

    

    $id_solicitante   = $_SESSION['usuario_id'];
    $id_aceptante     = intval($_POST['receptor_id'] ?? 0);
    $habilidad_ofrecida = trim($_POST['habilidad_ofrecida'] ?? 'No especificada');
    $habilidad_buscada  = trim($_POST['habilidad_buscada']  ?? 'No especificada');
    $id_estado = 1; // Estado 1 = Solicitado (Pendiente)

    if (!$id_aceptante || $id_aceptante === $id_solicitante) {
        echo json_encode(["success" => false, "error" => "Destinatario inválido."]);
        exit();
    }

    $sql_insert = "INSERT INTO intercambios (id_solicitante, id_aceptante, habilidad_ofrecida, habilidad_buscada, id_estado)
                   VALUES (?, ?, ?, ?, ?)";
    $stmt_insert = $conexion->prepare($sql_insert);
    $stmt_insert->bind_param("iissi", $id_solicitante, $id_aceptante, $habilidad_ofrecida, $habilidad_buscada, $id_estado);
    $stmt_insert->execute();
    $stmt_insert->close();

    echo json_encode(["success" => true, "mensaje" => "Propuesta enviada exitosamente a la Red."]);
    $conexion->close();

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Error SQL: " . $e->getMessage()]);
}
