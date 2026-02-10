# EPO 316 - Escuela Preparatoria Oficial Página Web

Sitio web de la Escuela Preparatoria Oficial Núm. 316 construido con **Next.js 14** y desplegado en **Railway**.

## 🚀 Acceso Rápido

### Desarrollo Local
```bash
npm install
npm run dev
# http://localhost:3000
```

### Producción (Railway)
**URL**: https://pagina-epo-316.up.railway.app

## ⚙️ Configuración Requerida

### 1. **Variables de Entorno** (LOCAL)
Crea un archivo `.env.local`:

```bash
# Base de Datos
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=seguimiento_epo_316
MYSQLPORT=3306

# Emails (Resend)
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL_FROM=noreply@resend.dev

# App
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### 2. **Variables de Entorno** (RAILWAY)
⚠️ **IMPORTANTE**: Debes configurar esto en Railway para que funcione:

1. Ve a https://railway.app
2. Abre tu proyecto
3. Pestaña **Variables** → **Add Variable**
4. Agrega estas variables:

| Nombre | Valor | Ejemplo |
|--------|-------|---------|
| `MYSQLHOST` | Tu host MySQL | `your-db-host.railway.internal` |
| `MYSQLUSER` | Usuario | `root` |
| `MYSQLPASSWORD` | Contraseña | `tu_contraseña` |
| `MYSQLDATABASE` | Base de datos | `seguimiento_epo_316` |
| `MYSQLPORT` | Puerto | `3306` |
| `RESEND_API_KEY` | Tu API Key de Resend | `re_xxxxxxxxxx` |
| `EMAIL_FROM` | Email para envios | `noreply@resend.dev` |
| `NODE_ENV` | Ambiente | `production` |

**Después de agregar variables, debes hacer redeploy!**

### 3. **Configuración de Resend** (Para Emails)

#### Obtener API Key
1. Ve a https://resend.com (crea cuenta GRATIS, no requiere tarjeta)
2. Settings → API Keys
3. Copia tu clave (comienza con `re_`)
4. Pegala en Railway como `RESEND_API_KEY`

#### ¿Por qué Resend?
- ✅ Envios confiables
- ✅ Gratis para nuevas cuentas
- ✅ Easy de usar
- ✅ Funciona en Railway

Ver: [`RESEND_SETUP.md`](RESEND_SETUP.md) para instrucciones detalladas.

## 📊 Estructura del Proyecto

```
.
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── admin/         # Admin endpoints
│   │   ├── chatbot/       # Chatbot API
│   │   └── send-email/    # Email endpoints
│   ├── admin/             # Dashboard administrativo
│   ├── [página]/          # Páginas públicas
│   └── layout.tsx         # Layout principal
│
├── components/            # Componentes React
│   └── ui/               # Componentes base (Button, Card, etc)
│
├── lib/                   # Utilidades
│   ├── db.ts             # Conexión MySQL
│   ├── email.ts          # Servicio de emails (Resend)
│   └── utils.ts          # Helpers
│
├── public/               # Assets estáticos
├── scripts/              # Scripts SQL
└── styles/              # CSS global
```

## 🔐 Panel Administrativo

**URL**: `/admin/login`  
**Usuario**: `admin@epo316.edu.mx`  
**Contraseña**: `admin123`

Funcionalidades:
- 📊 Dashboard con estadísticas
- 👥 Gestión de estudiantes
- 📝 Calificaciones
- 📢 Noticias y anuncios
- 📧 Contacto (emails)
- 📊 Reportes

## 📧 Formulario de Contacto

- Ubicado en `/contact`
- Envía correos a `infoepo316@gmail.com` y al usuario
- Usa **Resend** para entrega confiable

## 🗄️ Base de Datos

**Motor**: MySQL  
**Driver**: mysql2  

### Crear BD (primera vez)
```bash
# 1. Abre phpMyAdmin en http://localhost/phpmyadmin
# 2. Ejecuta scripts en este orden:
#    - scripts/setup-database.sql
#    - scripts/ejemplo_datos.sql
```

## 🛠️ Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes
- **DB**: MySQL 8
- **Email**: Resend
- **Hosting**: Railway
- **UI Components**: shadcn/ui

## 📋 Dependencias Principales

```json
{
  "next": "^14.2.13",
  "react": "^18.2.0",
  "typescript": "^5.3.3",
  "mysql2": "^3.9.8",
  "resend": "^6.9.1",
  "tailwindcss": "^4.0.0",
  "@radix-ui/*": "latest"
}
```

## 🚨 Troubleshooting

### ❌ Formulario de contacto no envía correos
**Problema**: `RESEND_API_KEY no configurada`  
**Solución**: Ver [`RESEND_SETUP.md`](RESEND_SETUP.md)

### ❌ No se conecta a la base de datos
**Solución**:
1. Verifica que MySQL está corriendo
2. Verifica credenciales en `.env.local`
3. Revisa los logs: `npm run dev`

### ❌ Error de build en Railway
1. Revisa variables de entorno en Dashboard → Variables
2. Asegúrate de haber hecho redeploy después de agregar variables
3. Revisa Logs → Build Logs

## 📚 Documentación

- [`RESEND_SETUP.md`](RESEND_SETUP.md) - Configuración de emails
- [`DATABASE_SETUP.md`](DATABASE_SETUP.md) - Setup de base de datos
- [`WHATSAPP_SETUP.md`](WHATSAPP_SETUP.md) - Integración WhatsApp (si aplica)
- [`SETUP_EMAILS.md`](SETUP_EMAILS.md) - Email adicional setup
- [`TODO.md`](TODO.md) - Features pendientes

## 🔄 Deploy en Railway

### Automático (recomendado)
1. Conecta tu repo GitHub a Railway
2. Cada push a main se deploya automáticamente
3. Configura variables en Dashboard

### Manual
```bash
railway login
railway project select  # Selecciona "Pagina_Epo_316"
git push                # Railway auto-deploya desde GitHub
```

## 👥 Soporte

¿Problemas? Revisa:
1. Logs de Railway → Logs
2. Archivo de configuración `.env.local` (desarrollo)
3. Variables en Railway Dashboard
4. Documentación de [`RESEND_SETUP.md`](RESEND_SETUP.md)

---

**Última actualización**: Febrero 2026  
**Versión**: 0.1.0  
**Status**: 🟢 En producción
