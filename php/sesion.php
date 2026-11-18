<?php
require_once __DIR__ . '/guardia.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('INACTIVIDAD_MAXIMA', 900);

function cerrar_sesion_completa() {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
                  $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}

if (!isset($_SESSION['usuario_id'])) {
    fallo("Necesitas iniciar sesion.", 401, ["sesion_expirada" => true]);
}

if (isset($_SESSION['ultimo_acceso']) &&
    (time() - $_SESSION['ultimo_acceso']) > INACTIVIDAD_MAXIMA) {
    cerrar_sesion_completa();
    fallo("Tu sesion expiro por inactividad.", 401, ["sesion_expirada" => true]);
}

$_SESSION['ultimo_acceso'] = time();

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recibido = $_POST['csrf_token'] ?? ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');

    if (!is_string($recibido) || !hash_equals($_SESSION['csrf_token'], $recibido)) {
        fallo("Token de seguridad invalido. Recarga la pagina.", 403, ["csrf_invalido" => true]);
    }
}

$id_usuario_actual = $_SESSION['usuario_id'];
