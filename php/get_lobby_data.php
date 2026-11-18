<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$res = $conexion->query("SELECT id_habilidad, nombre AS nombre_habilidad FROM habilidades ORDER BY nombre ASC");
$out = [];
if ($res) { while ($r = $res->fetch_assoc()) { $out[] = $r; } }

if (empty($out)) {
    $base = ['Diseño Web','Mecánica','Matemáticas','Física','Química','Gastronomía','Diseño Gráfico','Herrería y Soldadura'];
    foreach ($base as $i => $n) { $out[] = ["id_habilidad"=>$i+1, "nombre_habilidad"=>$n]; }
}

echo json_encode($out);
$conexion->close();
