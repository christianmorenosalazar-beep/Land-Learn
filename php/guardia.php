<?php
ob_start();

ini_set('display_errors', 0);
error_reporting(E_ALL);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function responder($datos, $codigo = 200) {
    while (ob_get_level() > 0) { ob_end_clean(); }
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit();
}

function exito($datos = []) {
    responder(array_merge(["success" => true], $datos), 200);
}

function fallo($mensaje, $codigo = 400, $extra = []) {
    responder(array_merge(["success" => false, "error" => $mensaje], $extra), $codigo);
}

set_exception_handler(function ($e) {
    error_log("[LandLearn] " . $e->getMessage() . " en " . $e->getFile() . ":" . $e->getLine());
    fallo("Ocurrio un error en el servidor. Intenta de nuevo.", 500);
});

register_shutdown_function(function () {
    $ultimo  = error_get_last();
    $fatales = [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR];

    if ($ultimo && in_array($ultimo['type'], $fatales, true)) {
        while (ob_get_level() > 0) { ob_end_clean(); }
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode([
            "success" => false,
            "error"   => "Error fatal del servidor."
        ], JSON_UNESCAPED_UNICODE);
    }
});
