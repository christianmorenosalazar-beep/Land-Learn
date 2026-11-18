<?php
session_start();
ob_start();
include 'conexion.php';

$correo   = strtolower(trim($_POST['correo'] ?? ''));
$password = trim($_POST['password'] ?? '');

if (!$correo || !$password) { header("Location: ../index2.html?error=vacio"); exit(); }

$sql  = "SELECT id_usuario, nombre, email, password, es_admin, intentos_login, bloqueado_hasta
         FROM usuarios WHERE email = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$row = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$row) { header("Location: ../index2.html?error=email"); exit(); }

if ($row['bloqueado_hasta'] && strtotime($row['bloqueado_hasta']) > time()) {
    header("Location: ../index2.html?error=bloqueado"); exit();
}

if (password_verify($password, $row['password'])) {
    $reset = $conexion->prepare("UPDATE usuarios SET intentos_login = 0, bloqueado_hasta = NULL WHERE id_usuario = ?");
    $reset->bind_param("i", $row['id_usuario']);
    $reset->execute();
    $reset->close();

    $_SESSION['usuario_id']     = $row['id_usuario'];
    $_SESSION['usuario_correo'] = $row['email'];
    $_SESSION['es_admin']       = intval($row['es_admin']);
    $_SESSION['ultimo_acceso']  = time();
    $_SESSION['csrf_token']     = bin2hex(random_bytes(32));

    header("Location: ../my_perfil.html");
    exit();
}

$intentos = intval($row['intentos_login']) + 1;
if ($intentos >= 5) {
    $up = $conexion->prepare("UPDATE usuarios SET intentos_login = ?, bloqueado_hasta = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE id_usuario = ?");
} else {
    $up = $conexion->prepare("UPDATE usuarios SET intentos_login = ? WHERE id_usuario = ?");
}
$up->bind_param("ii", $intentos, $row['id_usuario']);
$up->execute();
$up->close();
$conexion->close();

header("Location: ../index2.html?error=pass");
exit();
