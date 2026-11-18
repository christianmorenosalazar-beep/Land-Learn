-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2026 a las 02:23:18
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `integradora_v2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

DROP TABLE IF EXISTS `calificaciones`;
CREATE TABLE `calificaciones` (
  `id_calificacion` int(11) NOT NULL,
  `id_intercambio` int(11) DEFAULT NULL,
  `id_evaluador` int(11) DEFAULT NULL,
  `id_evaluado` int(11) DEFAULT NULL,
  `puntuacion` int(11) NOT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `fecha_calificacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

-- (datos de `calificaciones` omitidos: contenían información de usuarios)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`) VALUES
(1, 'Desarrollo de Software'),
(2, 'Gastronomía y Artes Culinarias'),
(3, 'Diseño y Multimedia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_match`
--

DROP TABLE IF EXISTS `detalles_match`;
CREATE TABLE `detalles_match` (
  `id_match` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `disponibilidad` varchar(100) DEFAULT NULL,
  `match_ideal` varchar(100) DEFAULT NULL,
  `biografia` text DEFAULT NULL,
  `nivel_actual` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_match`
--

-- (datos de `detalles_match` omitidos: contenían información de usuarios)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_intercambio`
--

DROP TABLE IF EXISTS `estado_intercambio`;
CREATE TABLE `estado_intercambio` (
  `id_estado` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_intercambio`
--

INSERT INTO `estado_intercambio` (`id_estado`, `estado`) VALUES
(1, 'Solicitado'),
(2, 'En Progreso'),
(3, 'Finalizado'),
(4, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidades`
--

DROP TABLE IF EXISTS `habilidades`;
CREATE TABLE `habilidades` (
  `id_habilidad` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habilidades`
--

INSERT INTO `habilidades` (`id_habilidad`, `nombre`, `id_categoria`) VALUES
(1, 'Backend en PHP', 1),
(2, 'Frontend con HTML/CSS', 1),
(3, 'Bases de Datos MySQL', 1),
(4, 'Cocina Mexicana', 2),
(5, 'Repostería y Panadería', 2),
(6, 'Diseño UX/UI', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidades_usuario`
--

DROP TABLE IF EXISTS `habilidades_usuario`;
CREATE TABLE `habilidades_usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_habilidad` int(11) NOT NULL,
  `id_nivel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intercambios`
--

DROP TABLE IF EXISTS `intercambios`;
CREATE TABLE `intercambios` (
  `id_intercambio` int(11) NOT NULL,
  `id_solicitante` int(11) DEFAULT NULL,
  `id_aceptante` int(11) DEFAULT NULL,
  `habilidad_ofrecida` varchar(100) NOT NULL,
  `habilidad_buscada` varchar(100) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `id_estado` int(11) DEFAULT NULL,
  `codigo_sala` varchar(10) DEFAULT NULL,
  `tiempo_limite` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `intercambios`
--

-- (datos de `intercambios` omitidos: contenían información de usuarios)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
CREATE TABLE `mensajes` (
  `id_mensaje` int(11) NOT NULL,
  `id_intercambio` int(11) NOT NULL,
  `id_remitente` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

-- (datos de `mensajes` omitidos: contenían información de usuarios)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_sala`
--

DROP TABLE IF EXISTS `mensajes_sala`;
CREATE TABLE `mensajes_sala` (
  `id_mensaje` int(11) NOT NULL,
  `id_intercambio` int(11) NOT NULL,
  `id_remitente` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes_sala`
--

-- (datos de `mensajes_sala` omitidos: contenían información de usuarios)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `niveles_experiencia`
--

DROP TABLE IF EXISTS `niveles_experiencia`;
CREATE TABLE `niveles_experiencia` (
  `id_nivel` int(11) NOT NULL,
  `nomenclatura` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `niveles_experiencia`
--

INSERT INTO `niveles_experiencia` (`id_nivel`, `nomenclatura`) VALUES
(1, 'Espora (Principiante)'),
(2, 'Micelio (Intermedio)'),
(3, 'Fructificación (Experto)');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `tipo`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_trueque`
--

DROP TABLE IF EXISTS `tareas_trueque`;
CREATE TABLE `tareas_trueque` (
  `id_tarea` int(11) NOT NULL,
  `id_intercambio` int(11) NOT NULL,
  `titulo_tarea` varchar(255) NOT NULL,
  `completada` tinyint(1) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas_trueque`
--

-- (datos de `tareas_trueque` omitidos: contenían información de usuarios)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens_recuperacion`
--

DROP TABLE IF EXISTS `tokens_recuperacion`;
CREATE TABLE `tokens_recuperacion` (
  `id_token` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `fecha_expiracion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto_perfil` varchar(255) DEFAULT 'default_avatar.png',
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `id_rol` int(11) DEFAULT NULL,
  `experiencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Puntos XP acumulados por calificaciones'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

-- (datos de `usuarios` omitidos: contenían información de usuarios)

-- --------------------------------------------------------
-- TABLA: reporte
-- Registra denuncias de mala conducta (Botón de Pánico)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `reporte`;
CREATE TABLE `reporte` (
  `id_reporte` int(11) NOT NULL AUTO_INCREMENT,
  `reportador_id` int(11) NOT NULL,
  `reportado_id` int(11) NOT NULL,
  `motivo` text NOT NULL,
  `estado` enum('Pendiente','Revisado') NOT NULL DEFAULT 'Pendiente',
  `fecha_reporte` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_reporte`),
  KEY `reportador_id` (`reportador_id`),
  KEY `reportado_id` (`reportado_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`id_calificacion`),
  ADD KEY `id_intercambio` (`id_intercambio`),
  ADD KEY `id_evaluador` (`id_evaluador`),
  ADD KEY `id_evaluado` (`id_evaluado`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detalles_match`
--
ALTER TABLE `detalles_match`
  ADD PRIMARY KEY (`id_match`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `estado_intercambio`
--
ALTER TABLE `estado_intercambio`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `habilidades`
--
ALTER TABLE `habilidades`
  ADD PRIMARY KEY (`id_habilidad`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `habilidades_usuario`
--
ALTER TABLE `habilidades_usuario`
  ADD PRIMARY KEY (`id_usuario`,`id_habilidad`),
  ADD KEY `id_habilidad` (`id_habilidad`),
  ADD KEY `id_nivel` (`id_nivel`);

--
-- Indices de la tabla `intercambios`
--
ALTER TABLE `intercambios`
  ADD PRIMARY KEY (`id_intercambio`),
  ADD KEY `id_solicitante` (`id_solicitante`),
  ADD KEY `id_aceptante` (`id_aceptante`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `id_intercambio` (`id_intercambio`),
  ADD KEY `id_remitente` (`id_remitente`);

--
-- Indices de la tabla `mensajes_sala`
--
ALTER TABLE `mensajes_sala`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `id_intercambio` (`id_intercambio`),
  ADD KEY `id_remitente` (`id_remitente`);

--
-- Indices de la tabla `niveles_experiencia`
--
ALTER TABLE `niveles_experiencia`
  ADD PRIMARY KEY (`id_nivel`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tareas_trueque`
--
ALTER TABLE `tareas_trueque`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `id_intercambio` (`id_intercambio`);

--
-- Indices de la tabla `tokens_recuperacion`
--
ALTER TABLE `tokens_recuperacion`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `id_calificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `detalles_match`
--
ALTER TABLE `detalles_match`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `estado_intercambio`
--
ALTER TABLE `estado_intercambio`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `habilidades`
--
ALTER TABLE `habilidades`
  MODIFY `id_habilidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `intercambios`
--
ALTER TABLE `intercambios`
  MODIFY `id_intercambio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `mensajes_sala`
--
ALTER TABLE `mensajes_sala`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `niveles_experiencia`
--
ALTER TABLE `niveles_experiencia`
  MODIFY `id_nivel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tareas_trueque`
--
ALTER TABLE `tareas_trueque`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tokens_recuperacion`
--
ALTER TABLE `tokens_recuperacion`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`id_intercambio`) REFERENCES `intercambios` (`id_intercambio`) ON DELETE CASCADE,
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`id_evaluador`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `calificaciones_ibfk_3` FOREIGN KEY (`id_evaluado`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `detalles_match`
--
ALTER TABLE `detalles_match`
  ADD CONSTRAINT `detalles_match_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `habilidades`
--
ALTER TABLE `habilidades`
  ADD CONSTRAINT `habilidades_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `habilidades_usuario`
--
ALTER TABLE `habilidades_usuario`
  ADD CONSTRAINT `habilidades_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `habilidades_usuario_ibfk_2` FOREIGN KEY (`id_habilidad`) REFERENCES `habilidades` (`id_habilidad`) ON DELETE CASCADE,
  ADD CONSTRAINT `habilidades_usuario_ibfk_3` FOREIGN KEY (`id_nivel`) REFERENCES `niveles_experiencia` (`id_nivel`) ON DELETE CASCADE;

--
-- Filtros para la tabla `intercambios`
--
ALTER TABLE `intercambios`
  ADD CONSTRAINT `intercambios_ibfk_1` FOREIGN KEY (`id_solicitante`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `intercambios_ibfk_2` FOREIGN KEY (`id_aceptante`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `intercambios_ibfk_3` FOREIGN KEY (`id_estado`) REFERENCES `estado_intercambio` (`id_estado`) ON DELETE SET NULL;

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_intercambio`) REFERENCES `intercambios` (`id_intercambio`) ON DELETE CASCADE,
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`id_remitente`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `mensajes_sala`
--
ALTER TABLE `mensajes_sala`
  ADD CONSTRAINT `mensajes_sala_ibfk_1` FOREIGN KEY (`id_intercambio`) REFERENCES `intercambios` (`id_intercambio`) ON DELETE CASCADE,
  ADD CONSTRAINT `mensajes_sala_ibfk_2` FOREIGN KEY (`id_remitente`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tareas_trueque`
--
ALTER TABLE `tareas_trueque`
  ADD CONSTRAINT `tareas_trueque_ibfk_1` FOREIGN KEY (`id_intercambio`) REFERENCES `intercambios` (`id_intercambio`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tokens_recuperacion`
--
ALTER TABLE `tokens_recuperacion`
  ADD CONSTRAINT `tokens_recuperacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE SET NULL;

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`reportador_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `reporte_ibfk_2` FOREIGN KEY (`reportado_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;



-- --------------------------------------------------------
-- TABLA: certificaciones
-- Insignias obtenidas al pasar el examen de 150 preguntas.
-- IMPORTANTE: No cambia el rango. Solo es una insignia.
-- El rango Fructificación se gana con XP enseñando.
-- --------------------------------------------------------
DROP TABLE IF EXISTS `certificaciones`;
CREATE TABLE `certificaciones` (
  `id_certificacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `topico` varchar(100) NOT NULL,
  `puntaje` int(11) NOT NULL DEFAULT 0,
  `fecha_certificacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_certificacion`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `cert_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- ─────────────────────────────────────────────────────────
--  AGREGADOS PARA LA SALA DE TRUEQUE
-- ─────────────────────────────────────────────────────────

ALTER TABLE `intercambios`
  ADD COLUMN `categoria_sala` VARCHAR(100) DEFAULT NULL,
  ADD COLUMN `habilidad_sala` VARCHAR(100) DEFAULT NULL,
  ADD COLUMN `enfoque_sala`   VARCHAR(100) DEFAULT NULL,
  ADD COLUMN `cupos`          INT(11) NOT NULL DEFAULT 2;

DROP TABLE IF EXISTS `presencia_sala`;
CREATE TABLE `presencia_sala` (
  `id_intercambio` INT(11) NOT NULL,
  `id_usuario`     INT(11) NOT NULL,
  `ultimo_ping`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_intercambio`,`id_usuario`),
  KEY `idx_ping` (`ultimo_ping`),
  CONSTRAINT `presencia_ibfk_1` FOREIGN KEY (`id_intercambio`)
      REFERENCES `intercambios`(`id_intercambio`) ON DELETE CASCADE,
  CONSTRAINT `presencia_ibfk_2` FOREIGN KEY (`id_usuario`)
      REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `usuarios`
  ADD COLUMN `es_admin` TINYINT(1) NOT NULL DEFAULT 0;

UPDATE `usuarios` SET `es_admin` = 1
  WHERE LOWER(TRIM(`email`)) = 'admin@ejemplo.com';

ALTER TABLE `usuarios`
  ADD COLUMN `intentos_login` INT(11) NOT NULL DEFAULT 0,
  ADD COLUMN `bloqueado_hasta` DATETIME DEFAULT NULL;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
