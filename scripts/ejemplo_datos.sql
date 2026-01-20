

USE epo_316_crud;

-- =====================================================
-- INSERTAR USUARIOS ADICIONALES
-- =====================================================
INSERT INTO usuarios (correo, contraseña, rol, nombre, apellido, activo) 
VALUES 
  ('admin@epo316.edu.mx', 'admin123', 'administrador', 'Administrador', 'Principal', TRUE),
  ('director@epo316.edu.mx', 'director123', 'administrador', 'Director', 'Académico', TRUE),
  ('soporte@epo316.edu.mx', 'soporte123', 'administrador', 'Soporte', 'Técnico', TRUE)
ON DUPLICATE KEY UPDATE contraseña = VALUES(contraseña);

-- =====================================================
-- INSERTAR ESTUDIANTES
-- =====================================================
INSERT INTO estudiantes (nombre, correo, numero_inscripcion, grado, grupo, fecha_nacimiento, telefono, municipio, estado, codigo_postal, estado_inscripcion)
VALUES
  ('Juan Carlos García López', 'juan.garcia@epo316.mx', '2026-001', '1ro', 'A', '2008-03-15', '5551234567', 'Toluca', 'Estado de México', '50000', 'activo'),
  ('María Elena Rodríguez Pérez', 'maria.rodriguez@epo316.mx', '2026-002', '1ro', 'B', '2008-05-22', '5551234568', 'Toluca', 'Estado de México', '50000', 'activo'),
  ('Luis Fernando Martínez Sánchez', 'luis.martinez@epo316.mx', '2026-003', '2do', 'A', '2007-11-08', '5551234569', 'Toluca', 'Estado de México', '50000', 'activo'),
  ('Ana Patricia González Torres', 'ana.gonzalez@epo316.mx', '2026-004', '3ro', 'C', '2006-09-30', '5551234570', 'Toluca', 'Estado de México', '50000', 'activo'),
  ('Carlos Alberto López Sánchez', 'carlos.lopez@epo316.mx', '2026-005', '1ro', 'A', '2008-07-12', '5551234571', 'Toluca', 'Estado de México', '50000', 'activo'),
  ('Diana Sofia Morales Rivera', 'diana.morales@epo316.mx', '2026-006', '2do', 'B', '2007-01-25', '5551234572', 'Toluca', 'Estado de México', '50000', 'activo');

-- =====================================================
-- INSERTAR CALIFICACIONES
-- =====================================================
INSERT INTO calificaciones (estudiante_id, materia, calificacion, semestre, ciclo_escolar)
VALUES
  -- Estudiante 1 - Primer semestre
  (1, 'Matemáticas I', 8.5, 1, '2025-2026'),
  (1, 'Física I', 7.8, 1, '2025-2026'),
  (1, 'Química I', 8.2, 1, '2025-2026'),
  (1, 'Literatura', 7.9, 1, '2025-2026'),
  (1, 'Historia', 8.0, 1, '2025-2026'),
  
  -- Estudiante 2 - Primer semestre
  (2, 'Matemáticas I', 9.0, 1, '2025-2026'),
  (2, 'Física I', 8.5, 1, '2025-2026'),
  (2, 'Química I', 8.8, 1, '2025-2026'),
  (2, 'Literatura', 9.2, 1, '2025-2026'),
  (2, 'Historia', 8.6, 1, '2025-2026'),
  
  -- Estudiante 3 - Segundo semestre
  (3, 'Física II', 8.1, 2, '2025-2026'),
  (3, 'Programación', 8.9, 2, '2025-2026'),
  (3, 'Química II', 7.6, 2, '2025-2026'),
  (3, 'Matemáticas II', 8.3, 2, '2025-2026'),
  
  -- Estudiante 4 - Tercer semestre
  (4, 'Historia', 8.6, 3, '2025-2026'),
  (4, 'Filosofía', 8.3, 3, '2025-2026'),
  (4, 'Literatura Contemporánea', 8.7, 3, '2025-2026'),
  (4, 'Civismo', 8.5, 3, '2025-2026'),
  
  -- Estudiante 5 - Primer semestre
  (5, 'Matemáticas I', 7.9, 1, '2025-2026'),
  (5, 'Física I', 8.1, 1, '2025-2026'),
  (5, 'Química I', 8.0, 1, '2025-2026'),
  
  -- Estudiante 6 - Segundo semestre
  (6, 'Física II', 8.4, 2, '2025-2026'),
  (6, 'Programación', 8.7, 2, '2025-2026'),
  (6, 'Matemáticas II', 8.2, 2, '2025-2026');

-- =====================================================
-- INSERTAR ANUNCIOS
-- =====================================================
INSERT INTO anuncios (titulo, contenido, categoria, publicado)
VALUES
  ('Bienvenida al Ciclo Escolar 2025-2026', 
   'Te damos la más cordial bienvenida al nuevo ciclo escolar. Esperamos que sea un año lleno de aprendizajes y crecimiento personal. Recuerda que estamos aquí para apoyarte en tu formación académica.',
   'General', TRUE),
  
  ('Exámenes Finales Programados', 
   'Les recordamos que los exámenes finales se llevarán a cabo del 10 al 21 de junio. Consulta tu horario en el portal del estudiante. Se ruega puntualidad.',
   'Académico', TRUE),
  
  ('Inscripción a Actividades Extracurriculares', 
   'Ahora puedes inscribirte en nuestras actividades deportivas y culturales. Disponemos de: fútbol, basquetbol, ajedrez, debate y cine-club. Las inscripciones cierran el 30 de enero.',
   'Actividades', TRUE),
  
  ('Día de Descanso - Festividad Nacional', 
   'El 12 de febrero será día de descanso por festividad nacional. Actividades normales se reanudarán el 13 de febrero.',
   'Administrativo', TRUE),
  
  ('Charla sobre Orientación Vocacional', 
   'Te invitamos a la charla de orientación vocacional que se llevará a cabo el 25 de enero a las 14:00 horas en el auditorio principal. Asistirán profesionales de diversas áreas.',
   'Académico', TRUE),
  
  ('Mantenimiento de Plataforma Académica', 
   'Se realizará mantenimiento de la plataforma académica el sábado 18 de enero de 22:00 a 23:30. Durante este tiempo no habrá acceso al sistema.',
   'Administrativo', TRUE);

-- =====================================================
-- ACTUALIZAR ESTADÍSTICAS
-- =====================================================
UPDATE estadisticas_escuela 
SET total_estudiantes = 450, total_profesores = 30, total_clases = 18, promedio_calificaciones = 8.3
WHERE ano = 2026;

-- =====================================================
-- CONSULTAS ÚTILES PARA VERIFICAR LOS DATOS
-- =====================================================
-- Ver todos los usuarios
-- SELECT correo, rol, nombre, apellido FROM usuarios;

-- Ver estudiantes activos
-- SELECT nombre, numero_inscripcion, grado, grupo FROM estudiantes WHERE estado_inscripcion = 'activo';

-- Ver calificaciones por estudiante
-- SELECT e.nombre, c.materia, c.calificacion, c.semestre FROM calificaciones c JOIN estudiantes e ON c.estudiante_id = e.id WHERE e.numero_inscripcion = '2026-001';

-- Ver promedio de calificaciones por estudiante
-- SELECT e.nombre, AVG(c.calificacion) as promedio FROM calificaciones c JOIN estudiantes e ON c.estudiante_id = e.id GROUP BY e.id ORDER BY promedio DESC;

-- Ver anuncios publicados
-- SELECT titulo, categoria, fecha_creacion FROM anuncios WHERE publicado = TRUE ORDER BY fecha_creacion DESC;

-- Ver estadísticas
-- SELECT * FROM estadisticas_escuela;
