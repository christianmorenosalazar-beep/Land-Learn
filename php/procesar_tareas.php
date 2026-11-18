<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$accion = $_REQUEST['accion'] ?? '';
$id_intercambio = intval($_REQUEST['id_intercambio'] ?? 0);

if (!$id_intercambio) {
    echo json_encode(["error" => "Falta ID de intercambio"]); exit();
}

if ($accion === 'leer') {
    $sql = "SELECT * FROM tareas_trueque WHERE id_intercambio = ? ORDER BY id_tarea ASC";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $id_intercambio);
    $stmt->execute();
    $res = $stmt->get_result();
    $tareas = [];
    while ($row = $res->fetch_assoc()) { $tareas[] = $row; }
    echo json_encode($tareas);

} elseif ($accion === 'crear') {
    $titulo = trim($_POST['titulo'] ?? '');
    if (empty($titulo)) { echo json_encode(["success" => false, "error" => "Título vacío"]); exit(); }
    $sql = "INSERT INTO tareas_trueque (id_intercambio, titulo_tarea) VALUES (?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("is", $id_intercambio, $titulo);
    echo json_encode(["success" => $stmt->execute()]);

} elseif ($accion === 'completar') {
    $id_tarea = intval($_POST['id_tarea'] ?? 0);
    $sql = "UPDATE tareas_trueque SET completada = 1 WHERE id_tarea = ? AND id_intercambio = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ii", $id_tarea, $id_intercambio);
    echo json_encode(["success" => $stmt->execute()]);

} else {
    echo json_encode(["error" => "Acción no reconocida"]);
}

$conexion->close();
