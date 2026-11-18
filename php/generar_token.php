<?php
require_once __DIR__ . '/guardia.php';
try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    if (!isset($_POST['email'])) {
        echo json_encode(["success" => false, "error" => "Petición vacía. No llegó el correo por POST."]);
        exit();
    }

    include __DIR__ . '/conexion.php';

    $correo_ingresado = trim($_POST['email']);

    $sql_user = "SELECT id_usuario FROM usuarios WHERE email = ?";
    $stmt_user = $conexion->prepare($sql_user);
    $stmt_user->bind_param("s", $correo_ingresado);
    $stmt_user->execute();
    $res_user = $stmt_user->get_result();

    if ($row = $res_user->fetch_assoc()) {
        $id_usuario = $row['id_usuario'];

        $token = bin2hex(random_bytes(32)); 
        $fecha_expiracion = date("Y-m-d H:i:s", strtotime("+1 hour"));

        $sql_token = "INSERT INTO tokens_recuperacion (id_usuario, token, fecha_expiracion) VALUES (?, ?, ?)";
        $stmt_token = $conexion->prepare($sql_token);
        $stmt_token->bind_param("iss", $id_usuario, $token, $fecha_expiracion);
        $stmt_token->execute();

        $link_prueba = "reset_pass.html?token=" . $token;
        echo json_encode(["success" => true, "link" => $link_prueba]);

    } else {

        echo json_encode(["success" => true, "link" => "#"]);
    }

    $conexion->close();

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => "Error en BD: " . $e->getMessage()
    ]);
}
