<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

if (!isset($_SESSION['usuario_id']) || !isset($_POST['id_intercambio'])) {
    echo json_encode(["success" => false, "error" => "No autorizado"]);
    exit();
}

$id_intercambio = $_POST['id_intercambio'];
$accion = $_POST['accion']; // Puede ser 'generar' o 'verificar'

try {
    if ($accion === 'generar') {

        $sql = "SELECT codigo_sala FROM intercambios WHERE id_intercambio = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("i", $id_intercambio);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_assoc();

        $codigo = $res['codigo_sala'];

        if (empty($codigo)) {
            $codigo = "LRN-" . rand(1000, 9999);
            $update = "UPDATE intercambios SET codigo_sala = ? WHERE id_intercambio = ?";
            $stmtUpd = $conexion->prepare($update);
            $stmtUpd->bind_param("si", $codigo, $id_intercambio);
            $stmtUpd->execute();
        }

        echo json_encode(["success" => true, "codigo" => $codigo]);

    } else if ($accion === 'verificar') {
        $codigo_ingresado = trim($_POST['codigo']);

        $sql = "SELECT codigo_sala FROM intercambios WHERE id_intercambio = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("i", $id_intercambio);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_assoc();

        if ($res['codigo_sala'] === $codigo_ingresado && !empty($res['codigo_sala'])) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Código incorrecto o no generado."]);
        }
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Error SQL"]);
}
