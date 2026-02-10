# Configuración de Envío de Correos - EPO 316

## 📧 Resumen de cambios

Se ha implementado un sistema automático de envío de correos con las siguientes funcionalidades:

### 1. **Formulario de Contacto Automático** (`/contact`)
- ✅ Usuarios envían mensaje desde la página pública
- ✅ Correo automático a: `infoepo316@gmail.com` y `admisionesepo316@gmail.com`
- ✅ Confirmación automática enviada al usuario
- ✅ Integración con API `/api/admin/contact`

### 2. **Notificaciones de Calificaciones**
- ✅ Cuando un docente **agrega** una calificación → Notificación a superiores
- ✅ Cuando un docente **actualiza** una calificación → Notificación a superiores
- ✅ Notificados: Director, Subdirectora, Orientador
- ✅ Detalles: Estudiante, Materia, Grado, Grupo, Calificaciones por parcial
- ✅ Integración con API `/api/admin/notifications/grades`

### 3. **Gestión de Boletas en Secretaria** (`/admin/secretaria/boletas`)
- ✅ Nueva página creada para secretaria
- ✅ Búsqueda de estudiantes por: nombre, inscripción, grado, grupo
- ✅ Ver boleta de calificaciones
- ✅ Descargar boleta en PDF
- ✅ Tabla con detalles de todos los parciales

---

## ⚙️ Configuración Requerida

### Paso 1: Configurar Gmail

#### Opción A: Con Autenticación de 2 Factores (RECOMENDADO)

1. Ve a tu cuenta de Google: https://myaccount.google.com/app-passwords
2. Selecciona:
   - App: **Mail**
   - Dispositivo: **Windows (o tu dispositivo)**
3. Google te generará una contraseña de 16 caracteres
4. Copia esa contraseña

#### Opción B: Sin Autenticación de 2 Factores

1. Ve a: https://myaccount.google.com/lesssecureapps
2. Activa "Permitir aplicaciones menos seguras"
3. Usa tu contraseña normal de Gmail

### Paso 2: Configurar Variables de Entorno

1. En la raíz del proyecto, crea un archivo `.env.local` (o edita si ya existe):

```env
# Base de Datos
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=tu_contraseña
MYSQLDATABASE=seguimiento_epo_316
MYSQLPORT=3306

# Correos
EMAIL_USER=infoepo316@gmail.com
EMAIL_PASSWORD=tu_contraseña_de_16_caracteres
NEXT_PUBLIC_API_URL=http://localhost:3000
```

2. **Reemplaza**:
   - `EMAIL_PASSWORD` con la contraseña que Google te generó o tu contraseña real
   - Asegúrate de que `EMAIL_USER` es la cuenta de Gmail correcta

### Paso 3: Instalar Dependencias (Ya hecho ✅)

Las dependencias necesarias ya han sido instaladas:
```bash
npm install nodemailer @types/nodemailer
```

### Paso 4: Probar la Configuración

1. Inicia el servidor:
```bash
npm run dev
```

2. Prueba el formulario de contacto:
   - Ve a `/contact`
   - Llena el formulario y envía
   - Verifica que recibas un correo de confirmación

3. Prueba notificación de calificaciones:
   - Inicia sesión como docente
   - Ve a "Calificaciones"
   - Agrega una nueva calificación
   - Los superiores deberían recibir un correo

---

## 📁 Archivos Creados/Modificados

### Nuevos Archivos:
- ✅ `/app/api/send-email/route.ts` - API general de envío de correos
- ✅ `/app/api/admin/contact/route.ts` - API para formulario de contacto
- ✅ `/app/api/admin/notifications/grades/route.ts` - API para notificaciones de calificaciones
- ✅ `/app/admin/secretaria/boletas/page.tsx` - Nueva página de gestión de boletas

### Archivos Modificados:
- ✅ `/app/contact/page.tsx` - Integrado con API de correos
- ✅ `/app/api/admin/docente/calificaciones/route.ts` - Agregadas notificaciones
- ✅ Archivos de admin - Corregidos errores de CSS y lucide-react

### Archivos de Configuración:
- ✅ `.env.example` - Ejemplo de variables de entorno

---

## 🔌 APIs Disponibles

### 1. Envío General de Correos
```
POST /api/send-email

Body:
{
  "to": "usuario@email.com" | ["email1@gmail.com", "email2@gmail.com"],
  "subject": "Asunto del correo",
  "html": "<html>contenido HTML</html>",
  "replyTo": "opcional@email.com"
}

Response:
{
  "success": true,
  "message": "Correo enviado exitosamente",
  "messageId": "..."
}
```

### 2. Contacto Público
```
POST /api/admin/contact

Body:
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "subject": "Admisiones",
  "message": "Tengo dudas sobre..."
}

Response:
{
  "success": true,
  "message": "Mensaje enviado exitosamente..."
}
```

### 3. Notificación de Calificaciones
```
POST /api/admin/notifications/grades

Body:
{
  "id": 123,
  "estudiante_id": 456,
  "estudiante_nombre": "María García",
  "materia": "Matemáticas",
  "grado": "1",
  "grupo": "A",
  "profesor_id": 789,
  "profesor_nombre": "Dr. López",
  "calificacion_parcial_1": 85.5,
  "calificacion_parcial_2": 88.0,
  "calificacion_parcial_3": 90.5,
  "inasistencias_parcial_1": 0,
  "inasistencias_parcial_2": 1,
  "inasistencias_parcial_3": 0,
  "tipo": "crear" | "actualizar"
}

Response:
{
  "success": true,
  "message": "Notificación enviada a los superiores",
  "notificados": 3
}
```

---

## 🐛 Solución de Problemas

### "Error: connect ENETUNREACH" o "IPv6"
- **Causa**: Sistema intentando conectar por IPv6 pero falla (común en Railway)
- **Solución**: ✅ RESUELTA - Sistema ahora fuerza IPv4 automáticamente (puerto 465 + `family: 4`)
- **Si persiste**: 
  1. Verifica variables en Railway console
  2. Ejecuta: `echo $EMAIL_USER` y `echo $EMAIL_PASSWORD`
  3. Si están vacías, Railway no las está leyendo correctamente

### "Error: EAUTH"
- **Causa**: Contraseña incorrecta o Gmail rechaza la contraseña
- **Solución**: 
  1. Verifica que copiaste correctamente: `qfvlvownmrwkpnwy` (SIN ESPACIOS)
  2. Si usas 2FA, asegúrate de usar contraseña de app ("Mail" en Google)
  3. Espera 10 minutos y prueba de nuevo

### "Timeout al enviar correo"
- **Causa**: Problemas de conexión a Gmail SMTP o timeout muy corto
- **Solución**:
  1. Verifica tu conexión a internet
  2. Espera unos minutos y prueba de nuevo
  3. En Railway/producción, verifica que el servidor tiene acceso a SMTP

### "No recibo confirmación de contacto"
- **Causa**: El email del usuario podría estar en spam o no configurado
- **Solución**:
  1. Revisa la carpeta de spam
  2. Verifica que el formulario envió el correo correctamente en el servidor

---

## 🚀 Despliegue en Producción (Railway, Vercel, etc.)

### Para Railway:
1. Ve a tu proyecto en Railway Dashboard
2. Variables → Add Variable
3. Agrega estas variables EXACTAMENTE:
```
EMAIL_USER=infoepo316@gmail.com
EMAIL_PASSWORD=qfvlvownmrwkpnwy
MYSQL_HOST=trolley.proxy.rlwy.net
MYSQL_USER=root
MYSQL_PASSWORD=dbhaHVNLAIsggTWtgGQTvNQAezAbQUlD
MYSQL_DATABASE=railway
MYSQL_PORT=42796
NEXT_PUBLIC_API_URL=https://tu-dominio.railway.app
```

⚠️ **CRÍTICO**:
- **La contraseña de correo NO tiene espacios** - Gmail la muestra con espacios, pero sin usar espacios
- **Las variables DEBEN coincidir exactamente** con `.env.local`
- **Después de agregar variables, Railway puede necesitar redeploy automático**
- Si aún falla, ejecuta en Railway console: `echo $EMAIL_USER` para verificar

### Para Vercel:
1. Ve a Settings → Environment Variables
2. Agrega las mismas variables (incluyendo MYSQL)
3. Redeploy después de crear las variables

---

## 📝 Notas Importantes

1. **NUNCA hagas commit de `.env.local`** - Ya está en `.gitignore`
2. **Gmail permite 3000 correos/día** - Suficiente para la mayoría de instituciones
3. **Los correos tardan 5-30 segundos** en llegar
4. **Para nombres de correo automáticos**: Genera automáticamente para nuevos usuarios en el sistema
5. **Cambios de nombre de orientador**: El sistema enviará a "Orientación" siempre, asegúrate de que el correo del orientador esté registrado

---

## ✅ Checklist de Verificación

- [ ] `.env.local` configurado con credenciales de Gmail
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor de desarrollo iniciado (`npm run dev`)
- [ ] Formulario de contacto probado
- [ ] Notificación de calificaciones probada
- [ ] Página de boletas en secretaria funciona
- [ ] Correos recibidos en la bandeja
- [ ] Para producción: Variables configuradas en servidor

---

## 📧 Correos por Defecto

- **Info General**: `infoepo316@gmail.com`
- **Admisiones**: `admisionesepo316@gmail.com`

Para cambiar estos correos, edita:
- `/app/api/admin/contact/route.ts` (línea con los correos hardcoded)

---

¿Preguntas? Consulta la sección de API disponibles para ver cómo integrar más funcionalidades.
