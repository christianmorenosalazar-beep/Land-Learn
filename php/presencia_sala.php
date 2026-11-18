<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$mi_id = $_SESSION['usuario_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_intercambio = intval($_POST['id_intercambio'] ?? 0);
    $accion         = $_POST['accion'] ?? 'ping';

    if (!$id_intercambio) {
        echo json_encode(["success" => false]);
        exit();
    }

    if ($accion === 'salir') {
        $stmt = $conexion->prepare(
            "DELETE FROM presencia_sala WHERE id_intercambio = ? AND id_usuario = ?"
        );
        $stmt->bind_param("ii", $id_intercambio, $mi_id);
        $stmt->execute();
        $stmt->close();
    } else {

        $stmt = $conexion->prepare(
            "INSERT INTO presencia_sala (id_intercambio, id_usuario, ultimo_ping)
             VALUES (?, ?, NOW())
             ON DUPLICATE KEY UPDATE ultimo_ping = NOW()"
        );
        $stmt->bind_param("ii", $id_intercambio, $mi_id);
        $stmt->execute();
        $stmt->close();
    }

    echo json_encode(["success" => true]);
    $conexion->close();
    exit();
}

$id_intercambio = intval($_GET['id'] ?? 0);
if (!$id_intercambio) {
    echo json_encode(["participantes" => []]);
    exit();
}

$stmtI = $conexion->prepare(
    "SELECT id_solicitante FROM intercambios WHERE id_intercambio = ?"
);
$stmtI->bind_param("i", $id_intercambio);
$stmtI->execute();
$inter = $stmtI->get_result()->fetch_assoc();
$stmtI->close();

$id_anfitrion = $inter['id_solicitante'] ?? 0;

$sql = "SELECT p.id_usuario, u.nombre
        FROM presencia_sala p
        JOIN usuarios u ON p.id_usuario = u.id_usuario
        WHERE p.id_intercambio = ?
          AND p.ultimo_ping >= DATE_SUB(NOW(), INTERVAL 45 SECOND)
        ORDER BY (p.id_usuario = ?) DESC, p.ultimo_ping ASC";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("ii", $id_intercambio, $id_anfitrion);
$stmt->execute();
$res = $stmt->get_result();

$participantes = [];
while ($row = $res->fetch_assoc()) {
    $participantes[] = [
        "id_usuario"   => $row['id_usuario'],
        "nombre"       => $row['nombre'],
        "es_anfitrion" => ($row['id_usuario'] == $id_anfitrion)
    ];
}

echo json_encode(["participantes" => $participantes, "mi_id" => $mi_id]);

$stmt->close();
$conexion->close();
