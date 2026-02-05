-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-02-2026 a las 20:02:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `seguimiento_epo_316`
--

USE `seguimiento_epo_316`;

-- =====================================================
-- ADICIONES NECESARIAS PARA COMPLETAR LA BASE DE DATOS
-- =====================================================

-- 1. Agregar campo para mostrar anuncios en página principal
ALTER TABLE `anuncios` ADD COLUMN `mostrar_en_principal` TINYINT(1) DEFAULT 0 COMMENT 'Mostrar en página principal';

-- Actualizar anuncios existentes para mostrar algunos en principal
UPDATE `anuncios` SET `mostrar_en_principal` = 1 WHERE `id` IN (1, 2, 3);

-- 2. Corregir tabla eventos para coincidir con API (cambiar nombre y campos)
DROP TABLE IF EXISTS `eventos`;

CREATE TABLE `eventos_escolares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre del evento',
  `descripcion` longtext NOT NULL COMMENT 'Descripción del evento',
  `fecha_evento` date NOT NULL COMMENT 'Fecha del evento',
  `lugar` varchar(255) DEFAULT NULL COMMENT 'Lugar del evento',
  `tipo_evento` varchar(100) DEFAULT NULL COMMENT 'Tipo (Académico, Administrativo, Social, Deportivo)',
  `estado` varchar(50) DEFAULT 'Programado' COMMENT 'Estado (Programado, En_curso, Finalizado, Cancelado)',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_fecha_evento` (`fecha_evento`),
  KEY `idx_tipo_evento` (`tipo_evento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de eventos escolares para secretaría';

-- Insertar datos de ejemplo para eventos_escolares
INSERT INTO `eventos_escolares` (`nombre`, `descripcion`, `fecha_evento`, `lugar`, `tipo_evento`, `estado`) VALUES
('Reunión de Padres de Familia', 'Reunión informativa con padres de estudiantes de 1ro A', '2026-02-15', 'Auditorio Principal', 'Académico', 'Programado'),
('Día de Convivencia Estudiantil', 'Actividades recreativas y deportivas para todos los estudiantes', '2026-02-20', 'Patio Central', 'Social', 'Programado'),
('Ceremonia de Clausura Semestral', 'Ceremonia de cierre del primer semestre', '2026-02-28', 'Auditorio Principal', 'Académico', 'Programado'),
('Taller de Orientación Vocacional', 'Taller para estudiantes de 3ro sobre opciones de carrera', '2026-02-25', 'Sala de Conferencias', 'Académico', 'Programado');

-- =====================================================
-- INSERTAR ORIENTADORES ADICIONALES
-- =====================================================
INSERT INTO `orientador` (`nombre`, `correo`, `contraseña`, `telefono`, `especialidad`, `activo`) VALUES
('Patricia López Orientadora', 'patricia.lopez@epo316.edu.mx', 'ori456', '5554234568', 'Orientación Psicológica', 1),
('Miguel Sánchez Orientador', 'miguel.sanchez@epo316.edu.mx', 'ori789', '5554234569', 'Orientación Académica', 1)
ON DUPLICATE KEY UPDATE contraseña = VALUES(contraseña);

-- =====================================================
-- INSERTAR MATERIAS COMPLETAS POR GRADO
-- =====================================================
INSERT INTO `materias` (`nombre`, `clave`, `grado`, `creditos`, `profesor_id`, `activo`) VALUES
-- Primer Grado
('Historia I', 'HIS-I', '1ro', 4, NULL, 1),
('Civismo I', 'CIV-I', '1ro', 2, NULL, 1),
('Informática I', 'INF-I', '1ro', 4, 3, 1),
('Biología I', 'BIO-I', '1ro', 4, NULL, 1),

-- Segundo Grado
('Literatura II', 'LIT-II', '2do', 4, NULL, 1),
('Inglés II', 'ING-II', '2do', 4, NULL, 1),
('Educación Física II', 'EDF-II', '2do', 2, NULL, 1),
('Historia II', 'HIS-II', '2do', 4, NULL, 1),
('Civismo II', 'CIV-II', '2do', 2, NULL, 1),
('Biología II', 'BIO-II', '2do', 4, NULL, 1),

-- Tercer Grado
('Matemáticas III', 'MAT-III', '3ro', 8, 1, 1),
('Física III', 'FIS-III', '3ro', 6, 2, 1),
('Química III', 'QUI-III', '3ro', 6, NULL, 1),
('Literatura III', 'LIT-III', '3ro', 4, NULL, 1),
('Inglés III', 'ING-III', '3ro', 4, NULL, 1),
('Educación Física III', 'EDF-III', '3ro', 2, NULL, 1),
('Historia III', 'HIS-III', '3ro', 4, NULL, 1),
('Filosofía', 'FIL-I', '3ro', 2, NULL, 1),
('Biología III', 'BIO-III', '3ro', 4, NULL, 1)
ON DUPLICATE KEY UPDATE profesor_id = VALUES(profesor_id);

-- =====================================================
-- INSERTAR ESTUDIANTES ADICIONALES POR GRUPO
-- =====================================================
INSERT INTO `estudiantes` (`nombre`, `correo`, `numero_inscripcion`, `grado`, `grupo`, `fecha_nacimiento`, `telefono`, `municipio`, `estado`, `codigo_postal`, `estado_inscripcion`) VALUES
-- Grupo Único 1ro U
('Roberto Flores Mendoza', 'roberto.flores@epo316.mx', '2026-007', '1ro', 'U', '2008-04-20', '5551234573', 'Toluca', 'Estado de México', '50000', 'activo'),
('Alejandra Ruiz Martínez', 'alejandra.ruiz@epo316.mx', '2026-008', '1ro', 'U', '2008-06-10', '5551234574', 'Toluca', 'Estado de México', '50000', 'activo'),
('Fernando Gómez Hernández', 'fernando.gomez@epo316.mx', '2026-009', '1ro', 'U', '2008-02-28', '5551234575', 'Toluca', 'Estado de México', '50000', 'activo'),
('Sofía Martínez García', 'sofia.martinez@epo316.mx', '2026-010', '1ro', 'U', '2008-08-14', '5551234576', 'Toluca', 'Estado de México', '50000', 'activo'),
('Valentina López Rodríguez', 'valentina.lopez@epo316.mx', '2026-011', '1ro', 'U', '2008-09-05', '5551234577', 'Toluca', 'Estado de México', '50000', 'activo'),
('Gabriela Sánchez Torres', 'gabriela.sanchez@epo316.mx', '2026-012', '1ro', 'U', '2008-01-30', '5551234578', 'Toluca', 'Estado de México', '50000', 'activo'),
('Mariana Pérez López', 'mariana.perez@epo316.mx', '2026-013', '1ro', 'U', '2008-10-12', '5551234579', 'Toluca', 'Estado de México', '50000', 'activo'),
('Daniela Moreno García', 'daniela.moreno@epo316.mx', '2026-014', '1ro', 'U', '2008-11-08', '5551234580', 'Toluca', 'Estado de México', '50000', 'activo'),
('Camila Rodríguez Martínez', 'camila.rodriguez@epo316.mx', '2026-015', '1ro', 'U', '2008-12-03', '5551234581', 'Toluca', 'Estado de México', '50000', 'activo'),
('Ximena García López', 'ximena.garcia@epo316.mx', '2026-016', '1ro', 'U', '2008-07-25', '5551234582', 'Toluca', 'Estado de México', '50000', 'activo'),
('Natalia Sánchez Pérez', 'natalia.sanchez@epo316.mx', '2026-017', '1ro', 'U', '2008-03-18', '5551234583', 'Toluca', 'Estado de México', '50000', 'activo'),
('Lucía Flores Rodríguez', 'lucia.flores@epo316.mx', '2026-018', '1ro', 'U', '2008-05-09', '5551234584', 'Toluca', 'Estado de México', '50000', 'activo'),

-- Grupo Único 2do U
('Andrés Hernández García', 'andres.hernandez@epo316.mx', '2026-019', '2do', 'U', '2007-09-14', '5551234585', 'Toluca', 'Estado de México', '50000', 'activo'),
('Diego Ramírez López', 'diego.ramirez@epo316.mx', '2026-020', '2do', 'U', '2007-08-22', '5551234586', 'Toluca', 'Estado de México', '50000', 'activo'),
('Javier Morales Sánchez', 'javier.morales@epo316.mx', '2026-021', '2do', 'U', '2007-10-05', '5551234587', 'Toluca', 'Estado de México', '50000', 'activo'),
('Sergio Gutiérrez Martínez', 'sergio.gutierrez@epo316.mx', '2026-022', '2do', 'U', '2007-07-19', '5551234588', 'Toluca', 'Estado de México', '50000', 'activo'),
('Beatriz Castillo Mendoza', 'beatriz.castillo@epo316.mx', '2026-023', '2do', 'U', '2007-02-14', '5551234589', 'Toluca', 'Estado de México', '50000', 'activo'),
('Claudia Vargas Rodríguez', 'claudia.vargas@epo316.mx', '2026-024', '2do', 'U', '2007-03-28', '5551234590', 'Toluca', 'Estado de México', '50000', 'activo'),
('Estefanía Ramos García', 'estefania.ramos@epo316.mx', '2026-025', '2do', 'U', '2007-04-11', '5551234591', 'Toluca', 'Estado de México', '50000', 'activo'),
('Fernanda Jiménez López', 'fernanda.jimenez@epo316.mx', '2026-026', '2do', 'U', '2007-05-30', '5551234592', 'Toluca', 'Estado de México', '50000', 'activo'),
('Graciela Mendoza Sánchez', 'graciela.mendoza@epo316.mx', '2026-027', '2do', 'U', '2007-06-17', '5551234593', 'Toluca', 'Estado de México', '50000', 'activo'),
('Hilda Ortiz García', 'hilda.ortiz@epo316.mx', '2026-028', '2do', 'U', '2007-12-09', '5551234594', 'Toluca', 'Estado de México', '50000', 'activo'),
('Irene Soto Martínez', 'irene.soto@epo316.mx', '2026-029', '2do', 'U', '2007-11-21', '5551234595', 'Toluca', 'Estado de México', '50000', 'activo'),
('Jacqueline Vega López', 'jacqueline.vega@epo316.mx', '2026-030', '2do', 'U', '2007-10-03', '5551234596', 'Toluca', 'Estado de México', '50000', 'activo'),
('Karina Zamora Rodríguez', 'karina.zamora@epo316.mx', '2026-031', '2do', 'U', '2007-09-15', '5551234597', 'Toluca', 'Estado de México', '50000', 'activo'),

-- Grupo Único 3ro U
('Leopoldo Acosta Flores', 'leopoldo.acosta@epo316.mx', '2026-032', '3ro', 'U', '2006-08-12', '5551234598', 'Toluca', 'Estado de México', '50000', 'activo'),
('Mauricio Blanco García', 'mauricio.blanco@epo316.mx', '2026-033', '3ro', 'U', '2006-07-25', '5551234599', 'Toluca', 'Estado de México', '50000', 'activo'),
('Nicolás Carrillo López', 'nicolas.carrillo@epo316.mx', '2026-034', '3ro', 'U', '2006-06-18', '5551234600', 'Toluca', 'Estado de México', '50000', 'activo'),
('Óscar Delgado Martínez', 'oscar.delgado@epo316.mx', '2026-035', '3ro', 'U', '2006-05-09', '5551234601', 'Toluca', 'Estado de México', '50000', 'activo'),
('Patricia Estrada Rodríguez', 'patricia.estrada@epo316.mx', '2026-036', '3ro', 'U', '2006-04-22', '5551234602', 'Toluca', 'Estado de México', '50000', 'activo'),
('Quetzalli Fuentes García', 'quetzalli.fuentes@epo316.mx', '2026-037', '3ro', 'U', '2006-03-14', '5551234603', 'Toluca', 'Estado de México', '50000', 'activo'),
('Rosario Gómez López', 'rosario.gomez@epo316.mx', '2026-038', '3ro', 'U', '2006-02-28', '5551234604', 'Toluca', 'Estado de México', '50000', 'activo'),
('Susana Herrera Martínez', 'susana.herrera@epo316.mx', '2026-039', '3ro', 'U', '2006-01-11', '5551234605', 'Toluca', 'Estado de México', '50000', 'activo'),
('Tatiana Ibáñez Sánchez', 'tatiana.ibanez@epo316.mx', '2026-040', '3ro', 'U', '2005-12-30', '5551234606', 'Toluca', 'Estado de México', '50000', 'activo'),
('Úrsula Jiménez García', 'ursula.jimenez@epo316.mx', '2026-041', '3ro', 'U', '2005-11-19', '5551234607', 'Toluca', 'Estado de México', '50000', 'activo'),
('Verónica Keller López', 'veronica.keller@epo316.mx', '2026-042', '3ro', 'U', '2005-10-08', '5551234608', 'Toluca', 'Estado de México', '50000', 'activo'),
('Wendy López Martínez', 'wendy.lopez@epo316.mx', '2026-043', '3ro', 'U', '2005-09-25', '5551234609', 'Toluca', 'Estado de México', '50000', 'activo'),
('Ximena Morales Rodríguez', 'ximena.morales@epo316.mx', '2026-044', '3ro', 'U', '2005-08-14', '5551234610', 'Toluca', 'Estado de México', '50000', 'activo'),
('Yolanda Navarro García', 'yolanda.navarro@epo316.mx', '2026-045', '3ro', 'U', '2005-07-03', '5551234611', 'Toluca', 'Estado de México', '50000', 'activo')
ON DUPLICATE KEY UPDATE numero_inscripcion = VALUES(numero_inscripcion);

-- =====================================================
-- INSERTAR CALIFICACIONES COMPLETAS POR PARCIAL
-- =====================================================
INSERT INTO `calificaciones` (`estudiante_id`, `materia`, `grado`, `grupo`, `ciclo_escolar`, `profesor_id`, `calificacion_parcial_1`, `inasistencias_parcial_1`, `calificacion_parcial_2`, `inasistencias_parcial_2`, `calificacion_parcial_3`, `inasistencias_parcial_3`) VALUES
-- Estudiante 1 (Juan Carlos García López) - 1ro U
(1, 'Matemáticas I', '1ro', 'U', '2025-2026', 1, 8.50, 0, 8.70, 1, 8.90, 0),
(1, 'Física I', '1ro', 'U', '2025-2026', 2, 7.80, 1, 8.20, 0, 8.50, 0),
(1, 'Química I', '1ro', 'U', '2025-2026', NULL, 8.20, 0, 8.40, 0, 8.60, 1),
(1, 'Literatura', '1ro', 'U', '2025-2026', NULL, 7.90, 0, 8.10, 0, 8.30, 0),
(1, 'Inglés', '1ro', 'U', '2025-2026', NULL, 8.00, 1, 8.20, 0, 8.40, 0),

-- Estudiante 2 (María Elena Rodríguez Pérez) - 1ro U
(2, 'Matemáticas I', '1ro', 'U', '2025-2026', 1, 9.00, 0, 8.50, 1, 9.20, 0),
(2, 'Física I', '1ro', 'U', '2025-2026', 2, 8.50, 1, 9.00, 0, 8.80, 0),
(2, 'Química I', '1ro', 'U', '2025-2026', NULL, 9.00, 0, 8.70, 0, 9.10, 1),
(2, 'Literatura', '1ro', 'U', '2025-2026', NULL, 10.00, 0, 9.50, 0, 9.80, 0),
(2, 'Inglés', '1ro', 'U', '2025-2026', NULL, 9.00, 0, 9.30, 0, 9.50, 0),

-- Estudiante 3 (Luis Fernando Martínez Sánchez) - 2do U
(3, 'Física II', '2do', 'U', '2025-2026', 2, 8.10, 1, 8.50, 0, 8.30, 1),
(3, 'Programación', '2do', 'U', '2025-2026', 3, 8.90, 0, 9.20, 0, 9.00, 0),
(3, 'Química II', '2do', 'U', '2025-2026', NULL, 7.60, 2, 8.00, 1, 7.80, 1),
(3, 'Matemáticas II', '2do', 'U', '2025-2026', 1, 8.30, 0, 8.70, 0, 8.50, 0),
(3, 'Literatura II', '2do', 'U', '2025-2026', NULL, 8.00, 0, 8.20, 0, 8.40, 0),

-- Estudiante 4 (Ana Patricia González Torres) - 3ro U
(4, 'Historia III', '3ro', 'U', '2025-2026', NULL, 8.60, 0, 8.80, 0, 8.70, 0),
(4, 'Filosofía', '3ro', 'U', '2025-2026', NULL, 8.30, 0, 8.50, 0, 8.40, 0),
(4, 'Literatura III', '3ro', 'U', '2025-2026', NULL, 8.70, 0, 8.90, 0, 9.00, 0),
(4, 'Civismo II', '3ro', 'U', '2025-2026', NULL, 8.50, 0, 8.70, 0, 8.60, 0),
(4, 'Inglés III', '3ro', 'U', '2025-2026', NULL, 8.20, 1, 8.40, 0, 8.50, 0),

-- Estudiante 5 (Carlos Alberto López Sánchez) - 1ro U
(5, 'Matemáticas I', '1ro', 'U', '2025-2026', 1, 7.90, 0, 8.10, 0, 8.30, 0),
(5, 'Física I', '1ro', 'U', '2025-2026', 2, 8.10, 1, 8.30, 0, 8.50, 0),
(5, 'Química I', '1ro', 'U', '2025-2026', NULL, 8.00, 0, 8.20, 0, 8.40, 0),
(5, 'Literatura', '1ro', 'U', '2025-2026', NULL, 7.70, 0, 7.90, 0, 8.10, 0),
(5, 'Inglés', '1ro', 'U', '2025-2026', NULL, 7.80, 0, 8.00, 0, 8.20, 0),

-- Estudiante 6 (Diana Sofia Morales Rivera) - 2do U
(6, 'Física II', '2do', 'U', '2025-2026', 2, 8.40, 0, 8.60, 0, 8.80, 0),
(6, 'Programación', '2do', 'U', '2025-2026', 3, 8.70, 0, 8.90, 0, 9.10, 0),
(6, 'Matemáticas II', '2do', 'U', '2025-2026', 1, 8.20, 0, 8.40, 0, 8.60, 0),
(6, 'Literatura II', '2do', 'U', '2025-2026', NULL, 8.30, 0, 8.50, 0, 8.70, 0),
(6, 'Inglés II', '2do', 'U', '2025-2026', NULL, 8.10, 0, 8.30, 0, 8.50, 0)
ON DUPLICATE KEY UPDATE calificacion_parcial_1 = VALUES(calificacion_parcial_1);

-- =====================================================
-- INSERTAR NOTICIAS/ANUNCIOS COMPLETOS
-- =====================================================
INSERT INTO `anuncios` (`titulo`, `contenido`, `categoria`, `publicado`, `autor_id`) VALUES
('Premiación de Excelencia Académica',
 'Felicitamos a todos nuestros estudiantes que han alcanzado un promedio de 9.0 o superior. La ceremonia de premiación se llevará a cabo el 15 de febrero en el auditorio. Tus logros son nuestro orgullo.',
 'Logros', 1, 1),

('Competencia de Robótica EPO 316',
 'Nuestro equipo de robótica participará en la competencia estatal el 20 de febrero. Apoyemos a nuestros compañeros. La competencia será transmitida en vivo en nuestras redes sociales.',
 'Competencias', 1, 1),

('Programa de Becas Disponibles',
 'Se abren nuevas oportunidades de apoyo económico para estudiantes destacados. Las solicitudes se reciben hasta el 28 de enero. Consulta los requisitos en la oficina de administración.',
 'Becas', 1, 1),

('Jornada de Limpieza Ambiental',
 'Estudiantes participarán en actividades de sostenibilidad ambiental el 22 de enero. Juntos cuidamos nuestro planeta. Todos los estudiantes están invitados a participar.',
 'Comunidad', 1, 1)
ON DUPLICATE KEY UPDATE titulo = VALUES(titulo);

-- =====================================================
-- INSERTAR EVENTOS DE SECRETARÍA
-- =====================================================
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL COMMENT 'Título del evento',
  `descripcion` longtext NOT NULL COMMENT 'Descripción del evento',
  `fecha_evento` date NOT NULL COMMENT 'Fecha del evento',
  `hora_inicio` time DEFAULT NULL COMMENT 'Hora de inicio',
  `hora_fin` time DEFAULT NULL COMMENT 'Hora de fin',
  `ubicacion` varchar(255) DEFAULT NULL COMMENT 'Ubicación del evento',
  `tipo_evento` varchar(100) DEFAULT NULL COMMENT 'Tipo (Académico, Administrativo, Social, Deportivo)',
  `responsable_id` int(11) DEFAULT NULL COMMENT 'ID del responsable (secretaria)',
  `estado` varchar(50) DEFAULT 'programado' COMMENT 'Estado (programado, en_curso, finalizado, cancelado)',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `responsable_id` (`responsable_id`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`responsable_id`) REFERENCES `secretaria` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de eventos escolares';

INSERT INTO `eventos` (`titulo`, `descripcion`, `fecha_evento`, `hora_inicio`, `hora_fin`, `ubicacion`, `tipo_evento`, `responsable_id`, `estado`) VALUES
('Reunión de Padres de Familia', 'Reunión informativa con padres de estudiantes de 1ro A', '2026-02-15', '18:00:00', '19:30:00', 'Auditorio Principal', 'Académico', 1, 'programado'),
('Día de Convivencia Estudiantil', 'Actividades recreativas y deportivas para todos los estudiantes', '2026-02-20', '09:00:00', '14:00:00', 'Patio Central', 'Social', 1, 'programado'),
('Ceremonia de Clausura Semestral', 'Ceremonia de cierre del primer semestre', '2026-02-28', '10:00:00', '12:00:00', 'Auditorio Principal', 'Académico', 1, 'programado'),
('Taller de Orientación Vocacional', 'Taller para estudiantes de 3ro sobre opciones de carrera', '2026-02-25', '14:00:00', '16:00:00', 'Sala de Conferencias', 'Académico', 1, 'programado');

-- =====================================================
-- INSERTAR DOCUMENTOS DE SECRETARÍA
-- =====================================================
CREATE TABLE IF NOT EXISTS `documentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL COMMENT 'Título del documento',
  `descripcion` text DEFAULT NULL COMMENT 'Descripción del documento',
  `tipo_documento` varchar(100) DEFAULT NULL COMMENT 'Tipo (Certificado, Constancia, Boleta, Reporte)',
  `estudiante_id` int(11) DEFAULT NULL COMMENT 'ID del estudiante (si aplica)',
  `grado` varchar(50) DEFAULT NULL COMMENT 'Grado del estudiante',
  `grupo` varchar(50) DEFAULT NULL COMMENT 'Grupo del estudiante',
  `fecha_emision` date DEFAULT NULL COMMENT 'Fecha de emisión',
  `estado` varchar(50) DEFAULT 'pendiente' COMMENT 'Estado (pendiente, emitido, entregado)',
  `responsable_id` int(11) DEFAULT NULL COMMENT 'ID del responsable (secretaria)',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `estudiante_id` (`estudiante_id`),
  KEY `responsable_id` (`responsable_id`),
  CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `documentos_ibfk_2` FOREIGN KEY (`responsable_id`) REFERENCES `secretaria` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de documentos escolares';

INSERT INTO `documentos` (`titulo`, `descripcion`, `tipo_documento`, `estudiante_id`, `grado`, `grupo`, `fecha_emision`, `estado`, `responsable_id`) VALUES
('Certificado de Estudios - Juan Carlos García', 'Certificado de estudios del ciclo 2025-2026', 'Certificado', 1, '1ro', 'U', '2026-02-05', 'emitido', 1),
('Constancia de Calificaciones - María Elena Rodríguez', 'Constancia de calificaciones del primer semestre', 'Constancia', 2, '1ro', 'U', '2026-02-05', 'emitido', 1),
('Boleta de Calificaciones - Luis Fernando Martínez', 'Boleta de calificaciones del segundo semestre', 'Boleta', 3, '2do', 'U', '2026-02-05', 'pendiente', 1),
('Reporte de Asistencia - Ana Patricia González', 'Reporte de asistencia del ciclo escolar', 'Reporte', 4, '3ro', 'U', '2026-02-05', 'emitido', 1);

-- =====================================================
-- INSERTAR CASOS DE ORIENTACIÓN
-- =====================================================
CREATE TABLE IF NOT EXISTS `casos_orientacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante_id` int(11) NOT NULL COMMENT 'ID del estudiante',
  `orientador_id` int(11) NOT NULL COMMENT 'ID del orientador',
  `tipo_caso` varchar(100) DEFAULT NULL COMMENT 'Tipo (Académico, Conductual, Emocional, Vocacional)',
  `descripcion` longtext NOT NULL COMMENT 'Descripción del caso',
  `acciones_realizadas` longtext DEFAULT NULL COMMENT 'Acciones realizadas',
  `recomendaciones` longtext DEFAULT NULL COMMENT 'Recomendaciones',
  `estado` varchar(50) DEFAULT 'abierto' COMMENT 'Estado (abierto, en_proceso, cerrado, derivado)',
  `fecha_inicio` date DEFAULT NULL COMMENT 'Fecha de inicio del caso',
  `fecha_cierre` date DEFAULT NULL COMMENT 'Fecha de cierre del caso',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `estudiante_id` (`estudiante_id`),
  KEY `orientador_id` (`orientador_id`),
  CONSTRAINT `casos_orientacion_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `casos_orientacion_ibfk_2` FOREIGN KEY (`orientador_id`) REFERENCES `orientador` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de casos de orientación';

INSERT INTO `casos_orientacion` (`estudiante_id`, `orientador_id`, `tipo_caso`, `descripcion`, `acciones_realizadas`, `recomendaciones`, `estado`, `fecha_inicio`) VALUES
(1, 1, 'Académico', 'Estudiante con dificultades en matemáticas', 'Sesiones de tutoría programadas, seguimiento semanal', 'Continuar con tutoría, evaluar progreso mensualmente', 'en_proceso', '2026-02-01'),
(2, 1, 'Vocacional', 'Estudiante interesado en carreras de ingeniería', 'Charla informativa sobre opciones de carrera', 'Participar en talleres de orientación vocacional', 'abierto', '2026-02-01'),
(3, 2, 'Emocional', 'Estudiante con estrés académico', 'Sesiones de apoyo emocional, técnicas de relajación', 'Seguimiento mensual, comunicación con padres', 'en_proceso', '2026-02-01'),
(4, 3, 'Conductual', 'Comportamiento ejemplar, liderazgo estudiantil', 'Reconocimiento en ceremonia, propuesta para monitor', 'Continuar fomentando liderazgo', 'cerrado', '2026-01-30'),
(5, 1, 'Académico', 'Bajo desempeño en ciencias', 'Derivación a tutoría especializada', 'Evaluación trimestral del progreso', 'en_proceso', '2026-02-01'),
(6, 2, 'Vocacional', 'Interés en programación y tecnología', 'Información sobre carreras tecnológicas', 'Participar en club de programación', 'abierto', '2026-02-01');

-- =====================================================
-- INSERTAR REPORTES DE SUBDIRECCIÓN
-- =====================================================
CREATE TABLE IF NOT EXISTS `reportes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL COMMENT 'Título del reporte',
  `descripcion` longtext NOT NULL COMMENT 'Descripción del reporte',
  `tipo_reporte` varchar(100) DEFAULT NULL COMMENT 'Tipo (Académico, Administrativo, Disciplinario, Estadístico)',
  `grado` varchar(50) DEFAULT NULL COMMENT 'Grado (si aplica)',
  `grupo` varchar(50) DEFAULT NULL COMMENT 'Grupo (si aplica)',
  `periodo` varchar(50) DEFAULT NULL COMMENT 'Período (Mensual, Trimestral, Semestral, Anual)',
  `datos_reporte` longtext DEFAULT NULL COMMENT 'Datos del reporte en JSON',
  `responsable_id` int(11) DEFAULT NULL COMMENT 'ID del responsable (subdirectora)',
  `estado` varchar(50) DEFAULT 'borrador' COMMENT 'Estado (borrador, finalizado, presentado)',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `responsable_id` (`responsable_id`),
  CONSTRAINT `reportes_ibfk_1` FOREIGN KEY (`responsable_id`) REFERENCES `subdirectora` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de reportes académicos y administrativos';

INSERT INTO `reportes` (`titulo`, `descripcion`, `tipo_reporte`, `grado`, `grupo`, `periodo`, `datos_reporte`, `responsable_id`, `estado`) VALUES
('Reporte de Desempeño Académico 1ro U', 'Análisis del desempeño académico del grupo 1ro U', 'Académico', '1ro', 'U', 'Mensual', '{"promedio_grupo": 8.2, "estudiantes_destacados": 3, "estudiantes_bajo_desempeño": 1}', 1, 'finalizado'),
('Reporte de Asistencia Mensual', 'Reporte de asistencia de todos los estudiantes', 'Administrativo', NULL, NULL, 'Mensual', '{"asistencia_promedio": 95.5, "inasistencias_totales": 45}', 1, 'finalizado'),
('Reporte Disciplinario Trimestral', 'Análisis de conducta y disciplina estudiantil', 'Disciplinario', NULL, NULL, 'Trimestral', '{"incidentes_reportados": 5, "estudiantes_sancionados": 2}', 1, 'borrador'),
('Reporte Estadístico de Calificaciones', 'Estadísticas generales de calificaciones del ciclo', 'Estadístico', NULL, NULL, 'Semestral', '{"promedio_general": 8.45, "estudiantes_aprobados": 75, "estudiantes_reprobados": 0}', 1, 'finalizado');

-- =====================================================
-- INSERTAR BOLETAS DE CALIFICACIONES
-- =====================================================
CREATE TABLE IF NOT EXISTS `boletas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante_id` int(11) NOT NULL COMMENT 'ID del estudiante',
  `ciclo_escolar` varchar(9) NOT NULL COMMENT 'Ciclo escolar',
  `semestre` int(11) NOT NULL COMMENT 'Semestre (1, 2, 3)',
  `promedio_general` decimal(5,2) DEFAULT NULL COMMENT 'Promedio general del semestre',
  `total_inasistencias` int(11) DEFAULT 0 COMMENT 'Total de inasistencias',
  `estado_boleta` varchar(50) DEFAULT 'pendiente' COMMENT 'Estado (pendiente, generada, impresa, entregada)',
  `fecha_generacion` date DEFAULT NULL COMMENT 'Fecha de generación',
  `fecha_entrega` date DEFAULT NULL COMMENT 'Fecha de entrega',
  `observaciones` text DEFAULT NULL COMMENT 'Observaciones generales',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `estudiante_id` (`estudiante_id`),
  CONSTRAINT `boletas_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de boletas de calificaciones';

INSERT INTO `boletas` (`estudiante_id`, `ciclo_escolar`, `semestre`, `promedio_general`, `total_inasistencias`, `estado_boleta`, `fecha_generacion`, `observaciones`) VALUES
(1, '2025-2026', 1, 8.30, 2, 'generada', '2026-02-05', 'Buen desempeño académico'),
(2, '2025-2026', 1, 9.50, 0, 'generada', '2026-02-05', 'Excelente desempeño, estudiante destacado'),
(3, '2025-2026', 2, 8.50, 3, 'generada', '2026-02-05', 'Desempeño satisfactorio'),
(4, '2025-2026', 3, 8.65, 1, 'generada', '2026-02-05', 'Buen desempeño general'),
(5, '2025-2026', 1, 8.10, 1, 'generada', '2026-02-05', 'Desempeño satisfactorio'),
(6, '2025-2026', 2, 8.70, 0, 'generada', '2026-02-05', 'Excelente desempeño en programación');

-- =====================================================
-- ACTUALIZAR ESTADÍSTICAS
-- =====================================================
UPDATE `estadisticas_escuela` 
SET total_estudiantes = 75, total_profesores = 4, total_clases = 30, promedio_calificaciones = 8.45
WHERE ano = 2026;

-- =====================================================
-- CONSULTAS ÚTILES PARA VERIFICAR LOS DATOS
-- =====================================================
-- Ver todos los orientadores
-- SELECT nombre, correo, especialidad FROM orientador WHERE activo = 1;

-- Ver todas las materias por grado
-- SELECT nombre, clave, grado, creditos FROM materias WHERE activo = 1 ORDER BY grado, nombre;

-- Ver estudiantes por grupo
-- SELECT nombre, numero_inscripcion, grado, grupo FROM estudiantes WHERE estado_inscripcion = 'activo' ORDER BY grado, grupo;

-- Ver eventos programados
-- SELECT titulo, fecha_evento, hora_inicio, ubicacion FROM eventos WHERE estado = 'programado' ORDER BY fecha_evento;

-- Ver documentos pendientes
-- SELECT d.titulo, e.nombre, d.tipo_documento FROM documentos d LEFT JOIN estudiantes e ON d.estudiante_id = e.id WHERE d.estado = 'pendiente';

-- Ver casos de orientación abiertos
-- SELECT e.nombre, o.nombre as orientador, c.tipo_caso FROM casos_orientacion c JOIN estudiantes e ON c.estudiante_id = e.id JOIN orientador o ON c.orientador_id = o.id WHERE c.estado = 'abierto';

-- Ver reportes finalizados
-- SELECT titulo, tipo_reporte, periodo FROM reportes WHERE estado = 'finalizado' ORDER BY fecha_actualizacion DESC;

-- Ver boletas generadas
-- SELECT e.nombre, b.ciclo_escolar, b.semestre, b.promedio_general FROM boletas b JOIN estudiantes e ON b.estudiante_id = e.id WHERE b.estado_boleta = 'generada';

-- Ver anuncios publicados
-- SELECT titulo, categoria, fecha_creacion FROM anuncios WHERE publicado = TRUE ORDER BY fecha_creacion DESC;

-- Ver estadísticas
-- SELECT * FROM estadisticas_escuela;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
