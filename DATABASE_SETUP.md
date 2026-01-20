# 🗄️ Configuración de Base de Datos MySQL - EPO 316

## Características
✅ Base de datos completamente en español
✅ Conexión segura con pool de conexiones
✅ Manejo robusto de errores
✅ Compatible con Xampp

---

## 📋 Requisitos Previos

1. **Xampp instalado** - Descárgalo desde https://www.apachefriends.org/
2. **npm packages** - Ya instalados (mysql2)

---

## 🚀 Instrucciones de Instalación

### PASO 1: Iniciar Servicios Xampp

1. Abre **Xampp Control Panel**
2. Inicia los siguientes servicios:
   - ✅ **Apache** (webserver)
   - ✅ **MySQL** (base de datos)

Ambos deben mostrar el estado **"Running"** en color verde.

### PASO 2: Acceder a phpMyAdmin

1. En tu navegador, ve a: `http://localhost/phpmyadmin`
2. Inicia sesión con:
   - **Usuario:** `root`
   - **Contraseña:** *(dejar vacío por defecto)*

### PASO 3: Crear la Base de Datos

1. En phpMyAdmin, haz clic en **"Nueva"** (esquina superior izquierda)
2. Nombre de la base de datos: `epo_316_crud`
3. Collation: `utf8mb4_unicode_ci`
4. Haz clic en **"Crear"**

### PASO 4: Ejecutar Script SQL

1. Selecciona la base de datos `epo_316_crud`
2. Ve a la pestaña **"SQL"**
3. Copia TODO el contenido de: `scripts/setup-database.sql`
4. Pégalo en el editor SQL
5. Haz clic en **"Ejecutar"**

✅ La base de datos estará lista con todas las tablas creadas.

### PASO 5: Agregar Datos de Ejemplo (Opcional)

1. Nuevamente en la pestaña **SQL** de `epo_316_crud`
2. Copia y pega el contenido de: `scripts/ejemplo_datos.sql`
3. Haz clic en **"Ejecutar"**

Ahora tendrás estudiantes, calificaciones y anuncios de ejemplo.

### PASO 6: Configurar Variables de Entorno

El archivo `.env.local` está preconfigurado con:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=epo_316_crud
MYSQL_PORT=3306
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Si tu MySQL de Xampp tiene contraseña**, edita `.env.local` y añade:
```env
MYSQL_PASSWORD=tu_contraseña_aqui
```

---

## 🔐 Credenciales de Prueba

**Usuario Administrador Predeterminado:**
- 📧 **Correo:** `admin@epo316.edu.mx`
- 🔑 **Contraseña:** `admin123`

---

## ✅ Verificar que Todo Funciona

1. En VS Code, abre una terminal en el proyecto
2. Ejecuta el servidor:
   ```bash
   npm run dev
   ```
3. Ve a: `http://localhost:3000/admin/login`
4. Intenta iniciar sesión con las credenciales de prueba

Si ves el dashboard, ¡todo está funcionando correctamente! ✨

---

## 📊 Estructura de Tablas

### Tabla: `usuarios`
Almacena administradores y personal.
- `id` - ID único
- `correo` - Email del usuario
- `contraseña` - Contraseña
- `rol` - Tipo de usuario (administrador, profesor, estudiante)
- `nombre` - Nombre
- `apellido` - Apellido
- `activo` - Si está activo

### Tabla: `estudiantes`
Almacena información de estudiantes.
- `id` - ID único
- `nombre` - Nombre completo
- `numero_inscripcion` - Matrícula
- `grado` - Grado (1ro, 2do, 3ro)
- `grupo` - Grupo (A, B, C)
- `estado_inscripcion` - Estado (activo, inactivo)

### Tabla: `calificaciones`
Almacena todas las calificaciones.
- `estudiante_id` - ID del estudiante
- `materia` - Nombre de la materia
- `calificacion` - Nota (0-10)
- `semestre` - Semestre (1, 2, 3)
- `ciclo_escolar` - Ciclo escolar

### Tabla: `anuncios`
Almacena noticias y avisos.
- `titulo` - Título del anuncio
- `contenido` - Contenido
- `categoria` - Categoría
- `publicado` - Si está publicado

### Tabla: `estadisticas_escuela`
Almacena datos de estadísticas.
- `total_estudiantes` - Total de estudiantes
- `total_profesores` - Total de profesores
- `promedio_calificaciones` - Promedio académico

---

## 🛠️ Solucionar Problemas

### ❌ Error: "No se puede conectar a MySQL"
**Solución:** Verifica que:
1. Xampp MySQL está corriendo (verde)
2. Puerto 3306 no está bloqueado
3. Credenciales en `.env.local` son correctas

### ❌ Error: "Base de datos no existe"
**Solución:**
1. Verifica que creaste `epo_316_crud` en phpMyAdmin
2. Ejecuta nuevamente `setup-database.sql`

### ❌ Error: "Tabla no existe"
**Solución:**
1. Selecciona `epo_316_crud` en phpMyAdmin
2. Ejecuta completo el script `setup-database.sql`

### ❌ Login no funciona
**Solución:**
1. Verifica que la tabla `usuarios` tiene datos
2. Abre phpMyAdmin y ejecuta:
   ```sql
   SELECT * FROM usuarios;
   ```
3. Debe haber al menos un registro

---

## 🔄 Crear Más Usuarios Administradores

En phpMyAdmin, tabla `usuarios`, inserta:

```sql
INSERT INTO usuarios (correo, contraseña, rol, nombre, apellido, activo) 
VALUES ('nuevo@epo316.edu.mx', 'contraseña123', 'administrador', 'Nombre', 'Apellido', TRUE);
```

---

## 📝 Notas Importantes

⚠️ **En producción:**
- Usa contraseñas hasheadas con bcrypt
- No guardes contraseñas en texto plano
- Usa credenciales fuertes
- Configura HTTPS

⚠️ **Backup:**
- Realiza backups regulares de la BD
- Exporta desde phpMyAdmin > Exportar

✅ **Para más ayuda**, revisa los archivos SQL comentados.

---

¡Tu base de datos está lista para usar! 🎉
