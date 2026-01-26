-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-01-2026 a las 03:11:09
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
-- Base de datos: `epo_316_crud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncios`
--

CREATE TABLE `anuncios` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL COMMENT 'Título del anuncio',
  `contenido` longtext NOT NULL COMMENT 'Contenido del anuncio',
  `categoria` varchar(100) DEFAULT NULL COMMENT 'Categoría (General, Académico, Administrativo, Actividades)',
  `publicado` tinyint(1) DEFAULT 0 COMMENT 'Si está publicado',
  `autor_id` int(11) DEFAULT NULL COMMENT 'ID del usuario que creó el anuncio',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de anuncios y noticias';

--
-- Volcado de datos para la tabla `anuncios`
--

INSERT INTO `anuncios` (`id`, `titulo`, `contenido`, `categoria`, `publicado`, `autor_id`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Bienvenida al Ciclo Escolar 2025-2026', 'Te damos la más cordial bienvenida al nuevo ciclo escolar. Esperamos que sea un año lleno de aprendizajes y crecimiento personal. Recuerda que estamos aquí para apoyarte en tu formación académica.', 'General', 1, NULL, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(2, 'Exámenes Finales Programados', 'Les recordamos que los exámenes finales se llevarán a cabo del 10 al 21 de junio. Consulta tu horario en el portal del estudiante. Se ruega puntualidad.', 'Académico', 1, NULL, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(3, 'Inscripción a Actividades Extracurriculares', 'Ahora puedes inscribirte en nuestras actividades deportivas y culturales. Disponemos de: fútbol, basquetbol, ajedrez, debate y cine-club. Las inscripciones cierran el 30 de enero.', 'Actividades', 1, NULL, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(4, 'Día de Descanso - Festividad Nacional', 'El 12 de febrero será día de descanso por festividad nacional. Actividades normales se reanudarán el 13 de febrero.', 'Administrativo', 1, NULL, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(5, 'Charla sobre Orientación Vocacional', 'Te invitamos a la charla de orientación vocacional que se llevará a cabo el 25 de enero a las 14:00 horas en el auditorio principal. Asistirán profesionales de diversas áreas.', 'Académico', 1, NULL, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(6, 'Mantenimiento de Plataforma Académica', 'Se realizará mantenimiento de la plataforma académica el sábado 18 de enero de 22:00 a 23:30. Durante este tiempo no habrá acceso al sistema.', 'Administrativo', 1, NULL, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(7, 'Prueba', 'Hola Mundo', 'General', 1, NULL, '2026-01-20 14:38:05', '2026-01-20 14:38:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL,
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
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de calificaciones con 3 parciales';

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`id`, `estudiante_id`, `materia`, `grado`, `grupo`, `ciclo_escolar`, `profesor_id`, `calificacion_parcial_1`, `inasistencias_parcial_1`, `calificacion_parcial_2`, `inasistencias_parcial_2`, `calificacion_parcial_3`, `inasistencias_parcial_3`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 2, 'Matemáticas I', '1ro', 'B', '2025-2026', NULL, 9.00, 0, 8.50, 1, 9.20, 0, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(2, 2, 'Física I', '1ro', 'B', '2025-2026', NULL, 8.50, 1, 9.00, 0, 8.80, 0, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(3, 2, 'Química I', '1ro', 'B', '2025-2026', NULL, 9.00, 0, 8.70, 0, 9.10, 1, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(4, 2, 'Literatura', '1ro', 'B', '2025-2026', NULL, 10.00, 0, 9.50, 0, 9.80, 0, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(5, 2, 'Inglés', '1ro', 'B', '2025-2026', NULL, 9.00, 0, 9.30, 0, 9.50, 0, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(6, 2, 'Educación Física', '1ro', 'B', '2025-2026', NULL, 10.00, 0, 10.00, 0, 10.00, 0, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(7, 3, 'Física II', '2do', 'A', '2025-2026', NULL, 8.10, 1, 8.50, 0, 8.30, 1, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(8, 3, 'Programación', '2do', 'A', '2025-2026', NULL, 8.90, 0, 9.20, 0, 9.00, 0, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(9, 3, 'Química II', '2do', 'A', '2025-2026', NULL, 7.60, 2, 8.00, 1, 7.80, 1, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(10, 3, 'Matemáticas II', '2do', 'A', '2025-2026', NULL, 8.30, 0, 8.70, 0, 8.50, 0, '2026-01-21 15:56:31', '2026-01-21 15:56:31'),
(11, 3, 'FÍSICA II', '2do', 'A', '2025-2026', NULL, NULL, 0, NULL, 3, NULL, 0, '2026-01-21 21:13:42', '2026-01-21 21:13:42'),
(12, 4, 'Pensamiento Matemático V', '3ro', 'C', '', NULL, 8.00, 2, NULL, 0, NULL, 0, '2026-01-22 01:49:36', '2026-01-22 01:49:36'),
(13, 4, 'Ciencias Naturales, Experimentales y Tecnología V', '3ro', 'C', '', NULL, 9.00, 2, NULL, 0, NULL, 0, '2026-01-22 03:02:57', '2026-01-22 03:02:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadisticas_escuela`
--

CREATE TABLE `estadisticas_escuela` (
  `id` int(11) NOT NULL,
  `total_estudiantes` int(11) DEFAULT 0 COMMENT 'Total de estudiantes inscritos',
  `total_profesores` int(11) DEFAULT 0 COMMENT 'Total de profesores',
  `total_clases` int(11) DEFAULT 0 COMMENT 'Total de clases',
  `promedio_calificaciones` decimal(5,2) DEFAULT NULL COMMENT 'Promedio general de calificaciones',
  `ano` int(11) DEFAULT NULL COMMENT 'Año de la estadística',
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de estadísticas escolares';

--
-- Volcado de datos para la tabla `estadisticas_escuela`
--

INSERT INTO `estadisticas_escuela` (`id`, `total_estudiantes`, `total_profesores`, `total_clases`, `promedio_calificaciones`, `ano`, `fecha_actualizacion`) VALUES
(2, 450, 30, 18, 8.30, 2026, '2026-01-20 04:20:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL COMMENT 'ID del usuario asociado',
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
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de estudiantes';

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `usuario_id`, `nombre`, `correo`, `numero_inscripcion`, `grado`, `grupo`, `fecha_nacimiento`, `telefono`, `direccion`, `municipio`, `estado`, `codigo_postal`, `estado_inscripcion`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, NULL, 'Juan Carlos García López', 'juan.garcia@epo316.mx', '2026-001', '1ro', 'A', '2008-03-15', '5551234567', NULL, 'Toluca', 'Estado de México', '50000', 'activo', '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(2, NULL, 'María Elena Rodríguez Pérez', 'maria.rodriguez@epo316.mx', '2026-002', '1ro', 'B', '2008-05-22', '5551234568', NULL, 'Toluca', 'Estado de México', '50000', 'activo', '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(3, NULL, 'Luis Fernando Martínez Sánchez', 'luis.martinez@epo316.mx', '2026-003', '2do', 'A', '2007-11-08', '5551234569', NULL, 'Toluca', 'Estado de México', '50000', 'activo', '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(4, NULL, 'Ana Patricia González Torres', 'ana.gonzalez@epo316.mx', '2026-004', '3ro', 'C', '2006-09-30', '5551234570', NULL, 'Toluca', 'Estado de México', '50000', 'activo', '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(5, NULL, 'Carlos Alberto López Sánchez', 'carlos.lopez@epo316.mx', '2026-005', '1ro', 'A', '2008-07-12', '5551234571', NULL, 'Toluca', 'Estado de México', '50000', 'activo', '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(6, NULL, 'Diana Sofia Morales Rivera', 'diana.morales@epo316.mx', '2026-006', '2do', 'B', '2007-01-25', '5551234572', NULL, 'Toluca', 'Estado de México', '50000', 'activo', '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(7, NULL, 'Daniel Benitez', 'danyyyws@gmail.com', '2025-002', '1ro', 'A', NULL, '1234567890', NULL, NULL, NULL, NULL, 'activo', '2026-01-20 05:08:27', '2026-01-20 05:08:27'),
(8, NULL, 'Mauricio Nolazco Lonjino', 'maurinkz@gmail.com', '2023-001', '2do', 'A', NULL, '1234567899', NULL, NULL, NULL, NULL, 'activo', '2026-01-20 16:40:38', '2026-01-20 16:40:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL COMMENT 'ID del usuario asociado',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre completo del profesor',
  `correo` varchar(255) NOT NULL COMMENT 'Correo electrónico',
  `telefono` varchar(20) DEFAULT NULL COMMENT 'Teléfono de contacto',
  `especialidad` varchar(100) DEFAULT NULL COMMENT 'Especialidad o área',
  `materias_asignadas` text DEFAULT NULL COMMENT 'Materias que imparte (separadas por coma)',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'Si está activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de profesores';

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id`, `usuario_id`, `nombre`, `correo`, `telefono`, `especialidad`, `materias_asignadas`, `activo`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, NULL, 'Prof. Roberto García', 'rgarcia@epo316.mx', '5551111111', 'Matemáticas', 'Matemáticas I,Matemáticas II', 1, '2026-01-21 15:56:30', '2026-01-21 15:56:30'),
(2, NULL, 'Prof. Laura Martínez', 'lmartinez@epo316.mx', '5552222222', 'Física', 'Física I,Física II', 1, '2026-01-21 15:56:30', '2026-01-21 15:56:30'),
(3, NULL, 'Prof. Carlos Hernández', 'chernandez@epo316.mx', '5553333333', 'Programación', 'Programación,Sistemas de Información', 1, '2026-01-21 15:56:30', '2026-01-21 15:56:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL COMMENT 'Correo electrónico del usuario',
  `contraseña` varchar(255) NOT NULL COMMENT 'Contraseña hasheada',
  `rol` enum('administrador','profesor','estudiante') DEFAULT 'administrador',
  `nombre` varchar(100) DEFAULT NULL COMMENT 'Nombre del usuario',
  `apellido` varchar(100) DEFAULT NULL COMMENT 'Apellido del usuario',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'Si el usuario está activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de usuarios administradores';

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`, `contraseña`, `rol`, `nombre`, `apellido`, `activo`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(2, 'admin@epo316.edu.mx', 'admin123', 'director', 'Administrador', 'EPO316', 1, '2026-01-20 04:20:30', '2026-01-20 04:20:30'),
(3, 'director@epo316.edu.mx', 'director123', 'director', 'Director', 'Académico', 1, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(4, 'soporte@epo316.edu.mx', 'soporte123', 'director', 'Soporte', 'Técnico', 1, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(5, 'subdirectora@epo316.edu.mx', 'sub123', 'subdirectora', 'María', 'González', 1, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(6, 'secretaria@epo316.edu.mx', 'sec123', 'secretaria', 'Ana', 'López', 1, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(7, 'orientador@epo316.edu.mx', 'ori123', 'orientador', 'Carlos', 'Rodríguez', 1, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(8, 'docente@epo316.edu.mx', 'doc123', 'docente', 'Luis', 'Martínez', 1, '2026-01-20 04:21:17', '2026-01-20 04:21:17'),
(9, 'rgarcia@epo316.mx', 'profesor123', 'profesor', 'Roberto', 'García', 1, '2026-01-21 15:56:30', '2026-01-21 15:56:30'),
(10, 'lmartinez@epo316.mx', 'profesor123', 'profesor', 'Laura', 'Martínez', 1, '2026-01-21 15:56:30', '2026-01-21 15:56:30'),
(11, 'chernandez@epo316.mx', 'profesor123', 'profesor', 'Carlos', 'Hernández', 1, '2026-01-21 15:56:30', '2026-01-21 15:56:30');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_publicado` (`publicado`),
  ADD KEY `idx_categoria` (`categoria`),
  ADD KEY `autor_id` (`autor_id`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_estudiante` (`estudiante_id`),
  ADD KEY `idx_materia` (`materia`),
  ADD KEY `idx_grado_grupo` (`grado`,`grupo`),
  ADD KEY `profesor_id` (`profesor_id`);

--
-- Indices de la tabla `estadisticas_escuela`
--
ALTER TABLE `estadisticas_escuela`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_inscripcion` (`numero_inscripcion`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `idx_numero_inscripcion` (`numero_inscripcion`),
  ADD KEY `idx_grado_grupo` (`grado`,`grupo`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `idx_correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `estadisticas_escuela`
--
ALTER TABLE `estadisticas_escuela`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD CONSTRAINT `anuncios_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
