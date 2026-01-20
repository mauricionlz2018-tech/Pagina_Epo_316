  -- =====================================================
  -- BASE DE DATOS: EPO 316 CRUD
  -- Escuela Preparatoria Oficial Núm. 316
  -- =====================================================

  -- Crear base de datos si no existe
  CREATE DATABASE IF NOT EXISTS epo_316_crud CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE epo_316_crud;

  -- =====================================================
  -- TABLA: USUARIOS (ADMINISTRADORES)
  -- =====================================================
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL COMMENT 'Correo electrónico del usuario',
    contraseña VARCHAR(255) NOT NULL COMMENT 'Contraseña hasheada',
    rol ENUM('administrador', 'profesor', 'estudiante') DEFAULT 'administrador' COMMENT 'Rol del usuario',
    nombre VARCHAR(100) COMMENT 'Nombre del usuario',
    apellido VARCHAR(100) COMMENT 'Apellido del usuario',
    activo BOOLEAN DEFAULT TRUE COMMENT 'Si el usuario está activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_correo (correo)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de usuarios administradores';

  -- =====================================================
  -- TABLA: ESTUDIANTES
  -- =====================================================
  CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT COMMENT 'ID del usuario asociado',
    nombre VARCHAR(255) NOT NULL COMMENT 'Nombre completo del estudiante',
    correo VARCHAR(255) UNIQUE COMMENT 'Correo electrónico del estudiante',
    numero_inscripcion VARCHAR(50) UNIQUE NOT NULL COMMENT 'Número de inscripción único',
    grado VARCHAR(50) COMMENT 'Grado (1ro, 2do, 3ro)',
    grupo VARCHAR(50) COMMENT 'Grupo (A, B, C, etc)',
    fecha_nacimiento DATE COMMENT 'Fecha de nacimiento',
    telefono VARCHAR(20) COMMENT 'Teléfono de contacto',
    direccion TEXT COMMENT 'Dirección del estudiante',
    municipio VARCHAR(100) COMMENT 'Municipio',
    estado VARCHAR(100) COMMENT 'Estado',
    codigo_postal VARCHAR(10) COMMENT 'Código postal',
    estado_inscripcion VARCHAR(50) DEFAULT 'activo' COMMENT 'Estado (activo, inactivo, graduado)',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_numero_inscripcion (numero_inscripcion),
    INDEX idx_grado_grupo (grado, grupo)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de estudiantes';

  -- =====================================================
  -- TABLA: CALIFICACIONES
  -- =====================================================
  CREATE TABLE IF NOT EXISTS calificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT NOT NULL COMMENT 'ID del estudiante',
    materia VARCHAR(100) NOT NULL COMMENT 'Nombre de la materia',
    calificacion DECIMAL(5, 2) COMMENT 'Calificación (0-10)',
    semestre INT COMMENT 'Semestre (1, 2, 3)',
    ciclo_escolar VARCHAR(9) COMMENT 'Ciclo escolar (ej: 2025-2026)',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE,
    INDEX idx_estudiante (estudiante_id),
    INDEX idx_semestre_ciclo (semestre, ciclo_escolar)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de calificaciones';

  -- =====================================================
  -- TABLA: ANUNCIOS Y NOTICIAS
  -- =====================================================
  CREATE TABLE IF NOT EXISTS anuncios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL COMMENT 'Título del anuncio',
    contenido LONGTEXT NOT NULL COMMENT 'Contenido del anuncio',
    categoria VARCHAR(100) COMMENT 'Categoría (General, Académico, Administrativo, Actividades)',
    publicado BOOLEAN DEFAULT FALSE COMMENT 'Si está publicado',
    autor_id INT COMMENT 'ID del usuario que creó el anuncio',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_publicado (publicado),
    INDEX idx_categoria (categoria),
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de anuncios y noticias';

  -- =====================================================
  -- TABLA: ESTADÍSTICAS ESCOLARES
  -- =====================================================
  CREATE TABLE IF NOT EXISTS estadisticas_escuela (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_estudiantes INT DEFAULT 0 COMMENT 'Total de estudiantes inscritos',
    total_profesores INT DEFAULT 0 COMMENT 'Total de profesores',
    total_clases INT DEFAULT 0 COMMENT 'Total de clases',
    promedio_calificaciones DECIMAL(5, 2) COMMENT 'Promedio general de calificaciones',
    ano INT COMMENT 'Año de la estadística',
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de estadísticas escolares';

  -- =====================================================
  -- INSERTAR DATOS INICIALES
  -- =====================================================

  -- Insertar usuario administrador por defecto
  DELETE FROM usuarios WHERE correo = 'admin@epo316.edu.mx';
  INSERT INTO usuarios (correo, contraseña, rol, nombre, apellido, activo) 
  VALUES ('admin@epo316.edu.mx', 'admin123', 'administrador', 'Administrador', 'EPO316', TRUE);

  -- Insertar estadísticas escolares iniciales
  DELETE FROM estadisticas_escuela WHERE ano = 2026;
  INSERT INTO estadisticas_escuela (total_estudiantes, total_profesores, total_clases, promedio_calificaciones, ano)
  VALUES (450, 30, 18, 8.3, 2026);

  -- =====================================================
  -- NOTA: Las políticas RLS son exclusivas de PostgreSQL
  -- MySQL no requiere RLS; la seguridad se maneja en la aplicación
  -- ===================================================== 
