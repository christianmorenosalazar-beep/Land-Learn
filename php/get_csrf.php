<?php
require_once __DIR__ . '/sesion.php';

exito([
    "csrf_token"       => $_SESSION['csrf_token'],
    "segundos_activos" => INACTIVIDAD_MAXIMA
]);
