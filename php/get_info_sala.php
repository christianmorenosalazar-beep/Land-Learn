<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$mi_id = $_SESSION['usuario_id'];
$id    = intval($_GET['id'] ?? 0);
if (!$id) { echo json_encode(["error"=>"ID invalido"]); exit(); }

$cols = [];
$chk = $conexion->query("SHOW COLUMNS FROM intercambios");
while ($c = $chk->fetch_assoc()) { $cols[] = $c['Field']; }

$extra = "";
foreach (['categoria_sala','habilidad_sala','enfoque_sala','cupos'] as $c) {
    $extra .= in_array($c, $cols) ? ", i.$c" : ", NULL AS $c";
}

$sql = "SELECT i.id_intercambio, i.id_solicitante, i.id_aceptante,
               i.habilidad_ofrecida, i.habilidad_buscada, i.id_estado,
               i.codigo_sala, i.tiempo_limite $extra,
               us.nombre AS nombre_emisor, ua.nombre AS nombre_receptor
        FROM intercambios i
        JOIN usuarios us ON i.id_solicitante = us.id_usuario
        JOIN usuarios ua ON i.id_aceptante   = ua.id_usuario
        WHERE i.id_intercambio = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$d = $stmt->get_result()->fetch_assoc();
$stmt->close();
$conexion->close();

if (!$d) { echo json_encode(["error"=>"Intercambio no encontrado"]); exit(); }

echo json_encode([
    "id_intercambio"=>$d['id_intercambio'], "mi_id"=>$mi_id,
    "id_emisor"=>$d['id_solicitante'], "id_receptor"=>$d['id_aceptante'],
    "nombre_emisor"=>$d['nombre_emisor'], "nombre_receptor"=>$d['nombre_receptor'],
    "habilidad_ofrecida"=>$d['habilidad_ofrecida'], "habilidad_buscada"=>$d['habilidad_buscada'],
    "categoria_sala"=>$d['categoria_sala'], "habilidad_sala"=>$d['habilidad_sala'],
    "enfoque_sala"=>$d['enfoque_sala'], "cupos"=>$d['cupos'] ?? 2,
    "id_estado"=>$d['id_estado'], "tiempo_limite"=>$d['tiempo_limite']
]);
