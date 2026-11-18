<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$mi_id   = $_SESSION['usuario_id'];
$ofrezco = trim($_GET['ofrezco'] ?? '');
$busco   = trim($_GET['busco']   ?? '');

$sql = "SELECT u.id_usuario, u.nombre, u.apellido_paterno, u.experiencia,
               d.nivel_actual, d.biografia, d.disponibilidad, d.match_ideal
        FROM usuarios u
        LEFT JOIN detalles_match d ON u.id_usuario = d.id_usuario
        WHERE u.id_usuario != ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $mi_id);
$stmt->execute();
$res = $stmt->get_result();

$matches = [];
while ($f = $res->fetch_assoc()) {

    $puntaje = 0;
    $ofreceOtro = mb_strtolower($f['disponibilidad'] ?? '');
    $buscaOtro  = mb_strtolower($f['match_ideal']    ?? '');

    if ($busco   !== '' && $ofreceOtro !== '' && mb_stripos($ofreceOtro, mb_strtolower($busco)) !== false) {
        $puntaje += 60;
    }
    if ($ofrezco !== '' && $buscaOtro !== '' && mb_stripos($buscaOtro, mb_strtolower($ofrezco)) !== false) {
        $puntaje += 40;
    }
    if (!empty($f['biografia'])) $puntaje += 5;

    $f['puntaje_match'] = $puntaje;
    $f['es_match_ideal'] = ($puntaje >= 100);
    $matches[] = $f;
}

usort($matches, function($a, $b) {
    if ($a['puntaje_match'] === $b['puntaje_match']) {
        return intval($b['experiencia']) - intval($a['experiencia']);
    }
    return $b['puntaje_match'] - $a['puntaje_match'];
});

echo json_encode($matches);
$stmt->close();
$conexion->close();
