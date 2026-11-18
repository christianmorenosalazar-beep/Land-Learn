-- ═══════════════════════════════════════════════════════════
--  ACTUALIZACION DE BASE DE DATOS — Land Learn
--
--  Para XAMPP (MariaDB). Se puede correr VARIAS VECES sin
--  romper nada: usa IF NOT EXISTS en todo.
--
--  phpMyAdmin -> selecciona integradora_v2 -> pestana SQL
--  -> pega TODO esto -> Continuar
-- ═══════════════════════════════════════════════════════════


-- 1. TABLA certificaciones (insignias del examen de 150 preguntas)
CREATE TABLE IF NOT EXISTS `certificaciones` (
  `id_certificacion`    INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario`          INT(11) NOT NULL,
  `topico`              VARCHAR(100) NOT NULL,
  `puntaje`             INT(11) NOT NULL DEFAULT 0,
  `fecha_certificacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_certificacion`),
  KEY `idx_cert_usuario` (`id_usuario`),
  CONSTRAINT `cert_ibfk_1` FOREIGN KEY (`id_usuario`)
      REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 2. TABLA reporte (boton de panico)
CREATE TABLE IF NOT EXISTS `reporte` (
  `id_reporte`     INT(11) NOT NULL AUTO_INCREMENT,
  `reportador_id`  INT(11) NOT NULL,
  `reportado_id`   INT(11) NOT NULL,
  `motivo`         TEXT NOT NULL,
  `estado`         ENUM('Pendiente','Revisado') NOT NULL DEFAULT 'Pendiente',
  `fecha_reporte`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_reporte`),
  KEY `idx_rep_reportador` (`reportador_id`),
  KEY `idx_rep_reportado`  (`reportado_id`),
  CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`reportador_id`)
      REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE,
  CONSTRAINT `reporte_ibfk_2` FOREIGN KEY (`reportado_id`)
      REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 3. TABLA presencia_sala (quien esta realmente en la sala)
CREATE TABLE IF NOT EXISTS `presencia_sala` (
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


-- 4. COLUMNAS de la sala de trueque
ALTER TABLE `intercambios`
  ADD COLUMN IF NOT EXISTS `categoria_sala` VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `habilidad_sala` VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `enfoque_sala`   VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `cupos`          INT(11) NOT NULL DEFAULT 2,
  ADD COLUMN IF NOT EXISTS `tiempo_limite`  INT(11) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `codigo_sala`    VARCHAR(10) DEFAULT NULL;


-- 5. COLUMNAS de usuarios (XP, admin, bloqueo de login)
ALTER TABLE `usuarios`
  ADD COLUMN IF NOT EXISTS `experiencia`     INT(11) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `es_admin`        TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `intentos_login`  INT(11) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `bloqueado_hasta` DATETIME DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `foto_perfil`     VARCHAR(255) DEFAULT NULL;


-- 6. COLUMNAS de detalles_match
ALTER TABLE `detalles_match`
  ADD COLUMN IF NOT EXISTS `biografia`      TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `disponibilidad` VARCHAR(150) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `match_ideal`    VARCHAR(150) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `nivel_actual`   VARCHAR(50) DEFAULT 'Espora';


-- 7. Marcar tu cuenta como administrador
UPDATE `usuarios` SET `es_admin` = 1
  WHERE LOWER(TRIM(`email`)) = 'admin@ejemplo.com';


-- ═══════════════════════════════════════════════════════════
--  VERIFICACION
-- ═══════════════════════════════════════════════════════════
SHOW TABLES LIKE 'certificaciones';
SHOW TABLES LIKE 'reporte';
SHOW TABLES LIKE 'presencia_sala';
SELECT `id_usuario`, `email`, `experiencia`, `es_admin` FROM `usuarios`;
