<?php
session_start();
ob_start();
error_reporting(0);

include __DIR__ . '/conexion.php';

function volver_con_error($clave) {
    while (ob_get_level() > 0) { ob_end_clean(); }
    header("Location: ../registro.html?error=" . urlencode($clave));
    exit();
}

$nombre           = trim($_POST['nombre']           ?? '');
$apellido_paterno = trim($_POST['apellido_paterno'] ?? '');
$apellido_materno = trim($_POST['apellido_materno'] ?? '');
$fecha_nacimiento = trim($_POST['fecha']            ?? '');
$correo           = strtolower(trim($_POST['correo'] ?? ''));
$password         = trim($_POST['password']         ?? '');
$habilidad        = trim($_POST['habilidad']        ?? '');

if (!$correo || !$password || !$nombre) {
    volver_con_error('faltan');
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    volver_con_error('correo_invalido');
}

if (strlen($password) < 6) {
    volver_con_error('pass_corta');
}

$stmt_check = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE email = ?");
$stmt_check->bind_param("s", $correo);
$stmt_check->execute();
$duplicado = $stmt_check->get_result()->num_rows > 0;
$stmt_check->close();

if ($duplicado) {
    $conexion->close();
    volver_con_error('duplicado');
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$sql  = "INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, email, password, fecha_nacimiento)
         VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssssss", $nombre, $apellido_paterno, $apellido_materno, $correo, $hash, $fecha_nacimiento);

if (!$stmt->execute()) {
    $stmt->close();
    $conexion->close();
    volver_con_error('bd');
}

$id_nuevo = $conexion->insert_id;
$stmt->close();

$stmt_dm = $conexion->prepare(
    "INSERT INTO detalles_match (id_usuario, nivel_actual, match_ideal)
     VALUES (?, 'Espora', ?)
     ON DUPLICATE KEY UPDATE match_ideal = VALUES(match_ideal)"
);
$stmt_dm->bind_param("is", $id_nuevo, $habilidad);
$stmt_dm->execute();
$stmt_dm->close();

$_SESSION['usuario_id']     = $id_nuevo;
$_SESSION['usuario_correo'] = $correo;
$_SESSION['es_admin']       = 0;
$_SESSION['ultimo_acceso']  = time();
$_SESSION['csrf_token']     = bin2hex(random_bytes(32));

$conexion->close();

while (ob_get_level() > 0) { ob_end_clean(); }
header("Location: ../conocer_us.html");
exit();
