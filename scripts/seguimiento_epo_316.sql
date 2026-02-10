-- =====================================================
-- Base de datos: seguimiento_epo_316
-- Creada para EPO 316 - Sistema de Seguimiento Escolar
-- Fecha: 2026-02-03
-- =====================================================

-- Eliminar la base de datos si existe y crear una nueva
DROP DATABASE IF EXISTS `seguimiento_epo_316`;
CREATE DATABASE `seguimiento_epo_316` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `seguimiento_epo_316`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- =====================================================
-- TABLAS DE USUARIOS POR ROL
-- =====================================================

-- --------------------------------------------------------
-- Tabla: director
-- --------------------------------------------------------
CREATE TABLE `director` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre completo',
  `correo` varchar(255) NOT NULL COMMENT 'Correo electrónico',
  `contraseña` varchar(255) NOT NULL COMMENT 'Contraseña',
  `telefono` varchar(20) DEFAULT NULL COMMENT 'Teléfono de contacto',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'Si está activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de directores';

-- Datos iniciales para director
INSERT INTO `director` (`nombre`, `correo`, `contraseña`, `telefono`, `activo`) VALUES
('Director General', 'director@epo316.edu.mx', 'director123', '5551234567', 1),
('Administrador EPO316', 'admin@epo316.edu.mx', 'admin123', '5551234568', 1);

-- --------------------------------------------------------
-- Tabla: subdirectora
-- --------------------------------------------------------
CREATE TABLE `subdirectora` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre completo',
  `correo` varchar(255) NOT NULL COMMENT 'Correo electrónico',
  `contraseña` varchar(255) NOT NULL COMMENT 'Contraseña',
  `telefono` varchar(20) DEFAULT NULL COMMENT 'Teléfono de contacto',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'Si está activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de subdirectoras';

-- Datos iniciales para subdirectora
INSERT INTO `subdirectora` (`nombre`, `correo`, `contraseña`, `telefono`, `activo`) VALUES
('María González Subdirectora', 'subdirectora@epo316.edu.mx', 'sub123', '5552234567', 1);

-- --------------------------------------------------------
-- Tabla: secretaria
-- --------------------------------------------------------
CREATE TABLE `secretaria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre completo',
  `correo` varchar(255) NOT NULL COMMENT 'Correo electrónico',
  `contraseña` varchar(255) NOT NULL COMMENT 'Contraseña',
  `telefono` varchar(20) DEFAULT NULL COMMENT 'Teléfono de contacto',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'Si está activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de secretarias';

-- Datos iniciales para secretaria
INSERT INTO `secretaria` (`nombre`, `correo`, `contraseña`, `telefono`, `activo`) VALUES
('Ana López Secretaria', 'secretaria@epo316.edu.mx', 'sec123', '5553234567', 1);

-- --------------------------------------------------------
-- Tabla: orientador
-- --------------------------------------------------------
CREATE TABLE `orientador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre completo',
  `correo` varchar(255) NOT NULL COMMENT 'Correo electrónico',
  `contraseña` varchar(255) NOT NULL COMMENT 'Contraseña',
  `telefono` varchar(20) DEFAULT NULL COMMENT 'Teléfono de contacto',
  `especialidad` varchar(100) DEFAULT NULL COMMENT 'Especialidad',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'Si está activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de orientadores';

-- Datos iniciales para orientador
INSERT INTO `orientador` (`nombre`, `correo`, `contraseña`, `telefono`, `especialidad`, `activo`) VALUES
('Carlos Rodríguez Orientador', 'orientador@epo316.edu.mx', 'ori123', '5554234567', 'Orientación Vocacional', 1);

-- --------------------------------------------------------
-- Tabla: profesores (para docentes)
-- --------------------------------------------------------
CREATE TABLE `profesores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre completo del profesor',
  `correo` varchar(255) NOT NULL COMMENT 'Correo electrónico',
  `contraseña` varchar(255) NOT NULL COMMENT 'Contraseña',
  `telefono` varchar(20) DEFAULT NULL COMMENT 'Teléfono de contacto',
  `especialidad` varchar(100) DEFAULT NULL COMMENT 'Especialidad o área',
  `materias_asignadas` text DEFAULT NULL COMMENT 'Materias que imparte (separadas por coma)',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'Si está activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de profesores/docentes';

-- Datos iniciales para profesores
INSERT INTO `profesores` (`nombre`, `correo`, `contraseña`, `telefono`, `especialidad`, `materias_asignadas`, `activo`) VALUES
('Prof. Roberto García', 'rgarcia@epo316.mx', 'profesor123', '5551111111', 'Matemáticas', 'Matemáticas I,Matemáticas II', 1),
('Prof. Laura Martínez', 'lmartinez@epo316.mx', 'profesor123', '5552222222', 'Física', 'Física I,Física II', 1),
('Prof. Carlos Hernández', 'chernandez@epo316.mx', 'profesor123', '5553333333', 'Programación', 'Programación,Sistemas de Información', 1),
('Luis Martínez Docente', 'docente@epo316.edu.mx', 'doc123', '5555234567', 'Ciencias', 'Biología,Química', 1);

-- =====================================================
-- TABLAS DE DATOS ESCOLARES
-- =====================================================

-- --------------------------------------------------------
-- Tabla: estudiantes
-- --------------------------------------------------------
CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre completo del estudiante',
  `correo` varchar(255) DEFAULT NULL COMMENT 'Correo electrónico del estudiante',
  `numero_inscripcion` varchar(50) NOT NULL COMMENT 'Número de inscripción único',
  `grado` varchar(50) DEFAULT NULL COMMENT 'Grado (1ro, 2do, 3ro)',
  `grupo` varchar(50) DEFAULT NULL COMMENT 'Grupo (A, B, C, etc)',
  `fecha_nacimiento` date DEFAULT NULL COMMENT 'Fecha de nacimiento',
  `telefono` varchar(20) DEFAULT NULL COMMENT 'Teléfono de contacto',
  `direccion` text DEFAULT NULL COMMENT 'Dirección del estudiante',
  `municipio` varchar(100) DEFAULT NULL COMMENT 'Municipio',
  `estado` varchar(100) DEFAULT NULL COMMENT 'Estado',
  `codigo_postal` varchar(10) DEFAULT NULL COMMENT 'Código postal',
  `estado_inscripcion` varchar(50) DEFAULT 'activo' COMMENT 'Estado (activo, inactivo, graduado)',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_inscripcion` (`numero_inscripcion`),
  UNIQUE KEY `correo` (`correo`),
  KEY `idx_numero_inscripcion` (`numero_inscripcion`),
  KEY `idx_grado_grupo` (`grado`,`grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de estudiantes';

-- Datos iniciales para estudiantes
INSERT INTO `estudiantes` (`nombre`, `correo`, `numero_inscripcion`, `grado`, `grupo`, `fecha_nacimiento`, `telefono`, `municipio`, `estado`, `codigo_postal`, `estado_inscripcion`) VALUES
('Juan Carlos García López', 'juan.garcia@epo316.mx', '2026-001', '1ro', 'A', '2008-03-15', '5551234567', 'Toluca', 'Estado de México', '50000', 'activo'),
('María Elena Rodríguez Pérez', 'maria.rodriguez@epo316.mx', '2026-002', '1ro', 'B', '2008-05-22', '5551234568', 'Toluca', 'Estado de México', '50000', 'activo'),
('Luis Fernando Martínez Sánchez', 'luis.martinez@epo316.mx', '2026-003', '2do', 'A', '2007-11-08', '5551234569', 'Toluca', 'Estado de México', '50000', 'activo'),
('Ana Patricia González Torres', 'ana.gonzalez@epo316.mx', '2026-004', '3ro', 'C', '2006-09-30', '5551234570', 'Toluca', 'Estado de México', '50000', 'activo'),
('Carlos Alberto López Sánchez', 'carlos.lopez@epo316.mx', '2026-005', '1ro', 'A', '2008-07-12', '5551234571', 'Toluca', 'Estado de México', '50000', 'activo'),
('Diana Sofia Morales Rivera', 'diana.morales@epo316.mx', '2026-006', '2do', 'B', '2007-01-25', '5551234572', 'Toluca', 'Estado de México', '50000', 'activo');

-- --------------------------------------------------------
-- Tabla: calificaciones
-- --------------------------------------------------------
CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante_id` int(11) NOT NULL COMMENT 'ID del estudiante',
  `materia` varchar(100) NOT NULL COMMENT 'Nombre de la materia',
  `grado` varchar(50) NOT NULL COMMENT 'Grado (1ro, 2do, 3ro)',
  `grupo` varchar(50) NOT NULL COMMENT 'Grupo (A, B, C)',
  `ciclo_escolar` varchar(9) NOT NULL COMMENT 'Ciclo escolar (ej: 2025-2026)',
  `profesor_id` int(11) DEFAULT NULL COMMENT 'ID del profesor que captura',
  `calificacion_parcial_1` decimal(5,2) DEFAULT NULL COMMENT 'Calificación del parcial 1 (0-10)',
  `inasistencias_parcial_1` int(11) DEFAULT 0 COMMENT 'Inasistencias en parcial 1',
  `calificacion_parcial_2` decimal(5,2) DEFAULT NULL COMMENT 'Calificación del parcial 2 (0-10)',
  `inasistencias_parcial_2` int(11) DEFAULT 0 COMMENT 'Inasistencias en parcial 2',
  `calificacion_parcial_3` decimal(5,2) DEFAULT NULL COMMENT 'Calificación del parcial 3 (0-10)',
  `inasistencias_parcial_3` int(11) DEFAULT 0 COMMENT 'Inasistencias en parcial 3',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_estudiante` (`estudiante_id`),
  KEY `idx_materia` (`materia`),
  KEY `idx_grado_grupo` (`grado`,`grupo`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de calificaciones con 3 parciales';

-- Datos iniciales para calificaciones
INSERT INTO `calificaciones` (`estudiante_id`, `materia`, `grado`, `grupo`, `ciclo_escolar`, `profesor_id`, `calificacion_parcial_1`, `inasistencias_parcial_1`, `calificacion_parcial_2`, `inasistencias_parcial_2`, `calificacion_parcial_3`, `inasistencias_parcial_3`) VALUES
(2, 'Matemáticas I', '1ro', 'B', '2025-2026', 1, 9.00, 0, 8.50, 1, 9.20, 0),
(2, 'Física I', '1ro', 'B', '2025-2026', 2, 8.50, 1, 9.00, 0, 8.80, 0),
(2, 'Química I', '1ro', 'B', '2025-2026', NULL, 9.00, 0, 8.70, 0, 9.10, 1),
(2, 'Literatura', '1ro', 'B', '2025-2026', NULL, 10.00, 0, 9.50, 0, 9.80, 0),
(2, 'Inglés', '1ro', 'B', '2025-2026', NULL, 9.00, 0, 9.30, 0, 9.50, 0),
(2, 'Educación Física', '1ro', 'B', '2025-2026', NULL, 10.00, 0, 10.00, 0, 10.00, 0),
(3, 'Física II', '2do', 'A', '2025-2026', 2, 8.10, 1, 8.50, 0, 8.30, 1),
(3, 'Programación', '2do', 'A', '2025-2026', 3, 8.90, 0, 9.20, 0, 9.00, 0),
(3, 'Química II', '2do', 'A', '2025-2026', NULL, 7.60, 2, 8.00, 1, 7.80, 1),
(3, 'Matemáticas II', '2do', 'A', '2025-2026', 1, 8.30, 0, 8.70, 0, 8.50, 0);

-- --------------------------------------------------------
-- Tabla: anuncios
-- --------------------------------------------------------
CREATE TABLE `anuncios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL COMMENT 'Título del anuncio',
  `contenido` longtext NOT NULL COMMENT 'Contenido del anuncio',
  `categoria` varchar(100) DEFAULT NULL COMMENT 'Categoría (General, Académico, Administrativo, Actividades)',
  `publicado` tinyint(1) DEFAULT 0 COMMENT 'Si está publicado',
  `autor_id` int(11) DEFAULT NULL COMMENT 'ID del autor (referencia a director)',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_publicado` (`publicado`),
  KEY `idx_categoria` (`categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de anuncios y noticias';

-- Datos iniciales para anuncios
INSERT INTO `anuncios` (`titulo`, `contenido`, `categoria`, `publicado`, `autor_id`) VALUES
('Bienvenida al Ciclo Escolar 2025-2026', 'Te damos la más cordial bienvenida al nuevo ciclo escolar. Esperamos que sea un año lleno de aprendizajes y crecimiento personal. Recuerda que estamos aquí para apoyarte en tu formación académica.', 'General', 1, 1),
('Exámenes Finales Programados', 'Les recordamos que los exámenes finales se llevarán a cabo del 10 al 21 de junio. Consulta tu horario en el portal del estudiante. Se ruega puntualidad.', 'Académico', 1, 1),
('Inscripción a Actividades Extracurriculares', 'Ahora puedes inscribirte en nuestras actividades deportivas y culturales. Disponemos de: fútbol, basquetbol, ajedrez, debate y cine-club. Las inscripciones cierran el 30 de enero.', 'Actividades', 1, 1),
('Día de Descanso - Festividad Nacional', 'El 12 de febrero será día de descanso por festividad nacional. Actividades normales se reanudarán el 13 de febrero.', 'Administrativo', 1, 1),
('Charla sobre Orientación Vocacional', 'Te invitamos a la charla de orientación vocacional que se llevará a cabo el 25 de enero a las 14:00 horas en el auditorio principal. Asistirán profesionales de diversas áreas.', 'Académico', 1, 1),
('Mantenimiento de Plataforma Académica', 'Se realizará mantenimiento de la plataforma académica el sábado 18 de enero de 22:00 a 23:30. Durante este tiempo no habrá acceso al sistema.', 'Administrativo', 1, 1);

-- --------------------------------------------------------
-- Tabla: estadisticas_escuela
-- --------------------------------------------------------
CREATE TABLE `estadisticas_escuela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_estudiantes` int(11) DEFAULT 0 COMMENT 'Total de estudiantes inscritos',
  `total_profesores` int(11) DEFAULT 0 COMMENT 'Total de profesores',
  `total_clases` int(11) DEFAULT 0 COMMENT 'Total de clases',
  `promedio_calificaciones` decimal(5,2) DEFAULT NULL COMMENT 'Promedio general de calificaciones',
  `ano` int(11) DEFAULT NULL COMMENT 'Año de la estadística',
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de estadísticas escolares';

-- Datos iniciales para estadísticas
INSERT INTO `estadisticas_escuela` (`total_estudiantes`, `total_profesores`, `total_clases`, `promedio_calificaciones`, `ano`) VALUES
(450, 30, 18, 8.30, 2026);

-- --------------------------------------------------------
-- Tabla: materias
-- --------------------------------------------------------
CREATE TABLE `materias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL COMMENT 'Nombre de la materia',
  `clave` varchar(20) DEFAULT NULL COMMENT 'Clave de la materia',
  `grado` varchar(50) DEFAULT NULL COMMENT 'Grado donde se imparte',
  `creditos` int(11) DEFAULT NULL COMMENT 'Créditos de la materia',
  `profesor_id` int(11) DEFAULT NULL COMMENT 'Profesor asignado',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'Si está activa',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Catálogo de materias';

-- Datos iniciales para materias
INSERT INTO `materias` (`nombre`, `clave`, `grado`, `creditos`, `profesor_id`, `activo`) VALUES
('Matemáticas I', 'MAT-I', '1ro', 8, 1, 1),
('Matemáticas II', 'MAT-II', '2do', 8, 1, 1),
('Física I', 'FIS-I', '1ro', 6, 2, 1),
('Física II', 'FIS-II', '2do', 6, 2, 1),
('Programación', 'PROG-I', '2do', 6, 3, 1),
('Sistemas de Información', 'SIS-I', '3ro', 6, 3, 1),
('Química I', 'QUI-I', '1ro', 6, NULL, 1),
('Química II', 'QUI-II', '2do', 6, NULL, 1),
('Literatura', 'LIT-I', '1ro', 4, NULL, 1),
('Inglés', 'ING-I', '1ro', 4, NULL, 1),
('Educación Física', 'EDF-I', '1ro', 2, NULL, 1);

-- =====================================================
-- Tabla: evidencias_calificaciones
-- =====================================================
CREATE TABLE `evidencias_calificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calificacion_id` int(11) NOT NULL COMMENT 'ID de la calificación',
  `profesor_id` int(11) NOT NULL COMMENT 'ID del profesor que sube la evidencia',
  `parcial` int(11) NOT NULL COMMENT 'Número del parcial (1, 2, 3)',
  `nombre_archivo` varchar(255) NOT NULL COMMENT 'Nombre del archivo',
  `ruta_archivo` varchar(500) NOT NULL COMMENT 'Ruta del archivo almacenado',
  `tipo_archivo` varchar(50) DEFAULT NULL COMMENT 'Tipo MIME del archivo',
  `tamaño_archivo` int(11) DEFAULT NULL COMMENT 'Tamaño del archivo en bytes',
  `descripcion` text DEFAULT NULL COMMENT 'Descripción de la evidencia',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `calificacion_id` (`calificacion_id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `evidencias_ibfk_1` FOREIGN KEY (`calificacion_id`) REFERENCES `calificaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `evidencias_ibfk_2` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de evidencias de calificaciones';

-- --------------------------------------------------------
-- Tabla: seguimiento_estudiantes (para orientación)
-- --------------------------------------------------------
CREATE TABLE `seguimiento_estudiantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiante_id` int(11) NOT NULL COMMENT 'ID del estudiante',
  `orientador_id` int(11) DEFAULT NULL COMMENT 'ID del orientador',
  `tipo_seguimiento` varchar(100) DEFAULT NULL COMMENT 'Tipo (académico, conductual, emocional)',
  `descripcion` text NOT NULL COMMENT 'Descripción del seguimiento',
  `acciones_tomadas` text DEFAULT NULL COMMENT 'Acciones realizadas',
  `estado` varchar(50) DEFAULT 'abierto' COMMENT 'Estado (abierto, en_proceso, cerrado)',
  `fecha_seguimiento` date DEFAULT NULL COMMENT 'Fecha del seguimiento',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `estudiante_id` (`estudiante_id`),
  KEY `orientador_id` (`orientador_id`),
  CONSTRAINT `seguimiento_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `seguimiento_ibfk_2` FOREIGN KEY (`orientador_id`) REFERENCES `orientador` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de seguimiento de estudiantes';

-- --------------------------------------------------------
-- Tabla: reportes_administrativos
-- --------------------------------------------------------
CREATE TABLE `reportes_administrativos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL COMMENT 'Título del reporte',
  `tipo_reporte` varchar(100) NOT NULL COMMENT 'Tipo de reporte (Académico, Administrativo, Financiero, Recursos Humanos, Infraestructura)',
  `descripcion` text DEFAULT NULL COMMENT 'Descripción del reporte',
  `datos_json` text DEFAULT NULL COMMENT 'Datos adicionales en JSON',
  `estado` varchar(50) DEFAULT 'Generado' COMMENT 'Estado del reporte',
  `fecha_generacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_tipo_reporte` (`tipo_reporte`),
  KEY `idx_estado` (`estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de reportes administrativos';

-- Datos iniciales para reportes_administrativos
INSERT INTO `reportes_administrativos` (`titulo`, `tipo_reporte`, `descripcion`, `datos_json`, `estado`) VALUES
('Reporte de Rendimiento Académico 2025', 'Académico', 'Analisis del rendimiento académico del ciclo escolar 2024-2025, incluyendo promedios por grado y materia.', '{\"total_estudiantes\": 450, \"promedio_general\": 8.3, \"mejor_materia\": \"Matemáticas\", \"peor_materia\": \"Química\"}', 'Generado'),
('Informe Financiero Anual 2025', 'Financiero', 'Estado financiero del año 2025, incluyendo ingresos, gastos y balance general.', '{\"ingresos\": 1500000, \"gastos\": 1200000, \"superavit\": 300000}', 'Generado'),
('Evaluación de Infraestructura', 'Infraestructura', 'Reporte sobre el estado de las instalaciones escolares, auditorio, laboratorios y áreas deportivas.', '{\"salones_actualizados\": 12, \"laboratorios_funcionales\": 4, \"auditorio_capacidad\": 200}', 'Generado'),
('Estadísticas de Asistencia 2025', 'Administrativo', 'Análisis de la asistencia de estudiantes y profesores durante el ciclo escolar 2024-2025.', '{\"asistencia_estudiantes\": 95, \"asistencia_profesores\": 98, \"dias_festivos\": 12}', 'Generado'),
('Evaluación de Personal Docente', 'Recursos Humanos', 'Evaluación del desempeño y satisfacción de los docentes durante el año.', '{\"total_profesores\": 30, \"satisfaccion_docente\": 85, \"turnover\": 10}', 'Generado');

-- =====================================================
-- RESUMEN DE CREDENCIALES DE ACCESO
-- =====================================================
-- 
-- DIRECTOR:
--   Correo: director@epo316.edu.mx | Contraseña: director123
--   Correo: admin@epo316.edu.mx | Contraseña: admin123
--
-- SUBDIRECTORA:
--   Correo: subdirectora@epo316.edu.mx | Contraseña: sub123
--
-- SECRETARIA:
--   Correo: secretaria@epo316.edu.mx | Contraseña: sec123
--
-- ORIENTADOR:
--   Correo: orientador@epo316.edu.mx | Contraseña: ori123
--
-- DOCENTES/PROFESORES:
--   Correo: docente@epo316.edu.mx | Contraseña: doc123
--   Correo: rgarcia@epo316.mx | Contraseña: profesor123
--   Correo: lmartinez@epo316.mx | Contraseña: profesor123
--   Correo: chernandez@epo316.mx | Contraseña: profesor123
--
-- =====================================================

COMMIT;
