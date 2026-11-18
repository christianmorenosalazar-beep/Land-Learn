<?php
require_once __DIR__ . '/sesion.php';
include __DIR__ . '/conexion.php';

$id = $_SESSION['usuario_id'];

$sql = "SELECT u.nombre, u.apellido_paterno, u.foto_perfil, u.experiencia,
               d.biografia, d.nivel_actual, d.disponibilidad, d.match_ideal
        FROM usuarios u
        LEFT JOIN detalles_match d ON d.id_usuario = u.id_usuario
        WHERE u.id_usuario = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$u = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$u) {
    fallo("Usuario no encontrado.", 404);
}

$xp = max(0, intval($u['experiencia']));

if ($xp <= 500) {
    $rango  = 'Espora 🍄';
    $xp_min = 0;
    $xp_max = 500;
} elseif ($xp <= 10000) {
    $rango  = 'Micelio 🕸️';
    $xp_min = 501;
    $xp_max = 10000;
} else {
    $rango  = 'Fructificación 🌳';
    $xp_min = 10001;
    $xp_max = 50000;
}

$rango_relativo = $xp - $xp_min;
$max_relativo   = $xp_max - $xp_min;
$porcentaje     = ($max_relativo > 0)
                    ? min(100, round(($rango_relativo / $max_relativo) * 100))
                    : 100;

$sql_h = "SELECT c.puntuacion, c.comentario, c.fecha_calificacion,
                 i.habilidad_ofrecida, u2.nombre AS nombre_companero
          FROM calificaciones c
          JOIN intercambios i ON c.id_intercambio = i.id_intercambio
          JOIN usuarios u2    ON c.id_evaluador   = u2.id_usuario
          WHERE c.id_evaluado = ?
          ORDER BY c.fecha_calificacion DESC
          LIMIT 5";
$stmt_h = $conexion->prepare($sql_h);
$stmt_h->bind_param("i", $id);
$stmt_h->execute();
$res_h = $stmt_h->get_result();

$historial = [];
while ($row = $res_h->fetch_assoc()) {
    $historial[] = $row;
}
$stmt_h->close();

$certs = [];
$chk_cert = $conexion->query("SHOW TABLES LIKE 'certificaciones'");

if ($chk_cert && $chk_cert->num_rows > 0) {
    $sc = $conexion->prepare(
        "SELECT topico, puntaje, fecha_certificacion
         FROM certificaciones
         WHERE id_usuario = ?
         ORDER BY fecha_certificacion DESC"
    );
    $sc->bind_param("i", $id);
    $sc->execute();
    $rc = $sc->get_result();
    while ($row = $rc->fetch_assoc()) {
        $certs[] = $row;
    }
    $sc->close();
}

echo json_encode([
    "nombre"          => trim($u['nombre'] . ' ' . ($u['apellido_paterno'] ?? '')),
    "foto_perfil"     => $u['foto_perfil'],
    "biografia"       => $u['biografia']      ?? '',
    "disponibilidad"  => $u['disponibilidad'] ?? '',
    "match_ideal"     => $u['match_ideal']    ?? '',
    "nivel_actual"    => $u['nivel_actual']   ?? 'Espora',
    "rango"           => $rango,
    "xp_actual"       => $xp,
    "xp_min"          => $xp_min,
    "xp_max"          => $xp_max,
    "porcentaje"      => $porcentaje,
    "historial"       => $historial,
    "certificaciones" => $certs
], JSON_UNESCAPED_UNICODE);

$conexion->close();
