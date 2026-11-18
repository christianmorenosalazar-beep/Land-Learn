<?php
// Los datos de conexión viven en config.php, que no se sube al repositorio.
// Para configurarlo, copia config.example.php como config.php y pon tus datos.
$config_path = __DIR__ . '/config.php';
if (!file_exists($config_path)) {
    die("Falta php/config.php. Copia php/config.example.php como php/config.php y configura tu base de datos.");
}
$config = require $config_path;

$conexion = new mysqli(
    $config['servidor'],
    $config['usuario'],
    $config['password'],
    $config['base_datos']
);

if ($conexion->connect_error) {
    die("Error crítico de conexión: " . $conexion->connect_error);
}
$conexion->set_charset("utf8mb4");
