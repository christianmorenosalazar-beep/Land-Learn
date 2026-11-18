<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$sql = "SELECT h.id_habilidad, h.nombre AS nombre_habilidad, c.nombre AS categoria
        FROM habilidades h
        LEFT JOIN categorias c ON h.id_categoria = c.id_categoria
        ORDER BY h.nombre ASC";
$res = $conexion->query($sql);

$iconos = [
    'Programacion'=>'💻','Programación'=>'💻','Diseno'=>'🎨','Diseño'=>'🎨',
    'Idiomas'=>'🗣️','Musica'=>'🎵','Música'=>'🎵','Ciencias'=>'🔬',
    'Oficios'=>'🔧','Gastronomia'=>'🍳','Gastronomía'=>'🍳','Matematicas'=>'📐','Matemáticas'=>'📐'
];

$out = [];
if ($res) {
    while ($r = $res->fetch_assoc()) {
        $cat = $r['categoria'] ?? '';
        $r['icono'] = $iconos[$cat] ?? '🍄';
        $out[] = $r;
    }
}

if (empty($out)) {
    $base = ['Diseño Web'=>'💻','Mecánica'=>'🔧','Matemáticas'=>'📐','Física'=>'⚛️',
             'Química'=>'🧪','Gastronomía'=>'🍳','Diseño Gráfico'=>'🎨','Herrería y Soldadura'=>'🔨'];
    $i = 1;
    foreach ($base as $n => $ic) {
        $out[] = ["id_habilidad"=>$i++, "nombre_habilidad"=>$n, "categoria"=>$n, "icono"=>$ic];
    }
}

echo json_encode($out);
$conexion->close();
