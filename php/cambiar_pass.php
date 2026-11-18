<?php
require_once __DIR__ . '/guardia.php';
try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    if (!isset($_POST['token']) || !isset($_POST['password'])) {
        echo json_encode(["success" => false, "error" => "Faltan las credenciales para hacer el cambio."]);
        exit();
    }

    include __DIR__ . '/conexion.php';

    $token = $_POST['token'];
    $nueva_pass = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "SELECT id_usuario FROM tokens_recuperacion WHERE token = ? AND fecha_expiracion > NOW()";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($row = $res->fetch_assoc()) {
        $id_usuario = $row['id_usuario'];

        $update = $conexion->prepare("UPDATE usuarios SET password = ? WHERE id_usuario = ?");
        $update->bind_param("si", $nueva_pass, $id_usuario);
        $update->execute();

        $delete = $conexion->prepare("DELETE FROM tokens_recuperacion WHERE token = ?");
        $delete->bind_param("s", $token);
        $delete->execute();

        echo json_encode(["success" => true, "mensaje" => "¡Contraseña actualizada con éxito!"]);
    } else {
        echo json_encode(["success" => false, "error" => "El enlace es inválido o ya expiró."]);
    }

    $conexion->close();

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => "Error en BD: " . $e->getMessage()
    ]);
}
