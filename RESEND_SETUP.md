# 📧 Configuración de Resend para Formulario de Contacto

## 🚨 Problema Actual
El formulario de contacto en Railway está fallando porque **`RESEND_API_KEY` no está configurada**.

```
❌ [Email] RESEND_API_KEY actual: undefined
❌ [Email] Clave API de Resend no configurada
```

## ✅ Solución (Paso a Paso)

### Paso 1: Obtener API Key de Resend
1. Ve a https://resend.com
2. Si no tienes cuenta, **crea una GRATIS** (no requiere tarjeta)
3. Inicia sesión
4. Ve a **Settings → API Keys** (o en Dashboard → API Keys)
5. Copia tu clave (comienza con `re_`)
   - Ejemplo: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Paso 2: Configurar en Railway ⚙️

#### **OPCIÓN A: Interfaz Web (Recomendado)**
1. Abre https://railway.app
2. Ve a tu proyecto "Pagina_Epo_316"
3. Click en la pestaña **Variables**
4. Click en **+ Add Variable**
5. Configura:
   ```
   Nombre: RESEND_API_KEY
   Valor: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
6. Click en **Add**
7. **IMPORTANTE**: Baja a la parte inferior y click en **Deploy**
8. Espera a que se complete el redeploy

#### **OPCIÓN B: CLI (si lo prefieres)**
```bash
# Instala Railway CLI si no lo has hecho
npm install -g @railway/cli

# Login
railway login

# Ve a tu proyecto
railway project select

# Agrega la variable
railway variables set RESEND_API_KEY=re_tu_clave_aqui

# Redeploy
railway deployment create --environment production
```

### Paso 3: (Opcional) Agregar EMAIL_FROM
Si quieres cambiar el email de respuesta:

1. En Railway → Variables
2. Agrega otra variable:
   ```
   Nombre: EMAIL_FROM
   Valor: noreply@resend.dev
   ```
   (O tu dominio si lo tienes verificado en Resend)

### Paso 4: Verificar que Funciona
1. Abre tu aplicación en https://pagina-epo-316.up.railway.app (o tu URL)
2. Ve al formulario de contacto
3. Envía un mensaje de prueba
4. Revisa los logs en Railway:
   - Dashboard → Logs
   - Busca `[Email]` para ver los mensajes

Deberías ver:
```
✓ [Email] ============================================
✓ [Email] RESEND_API_KEY configurada: ✓ Sí
✓ [Email] Enviado a infoepo316@gmail.com: ...
```

## 🔍 Troubleshooting

### Error: "RESEND_API_KEY actual: undefined"
**Solución**: No hiciste redeploy después de agregar la variable. 
- Ve a Railway
- Variables → verifica que RESEND_API_KEY esté ahí
- Click en **Deploy** (en la sección de Deployments también)
- Espera a que termine

### Error: "Error al enviar correo"
1. Verifica que tu API Key sea correcta (comienza con `re_`)
2. Ve a https://resend.com y confirma que tu cuenta está activa
3. Revisa los logs en Railway para más detalles

### ¿De dónde saco la API Key?
- Crea cuenta GRATIS en https://resend.com
- No necesita tarjeta de crédito
- Una vez creada la cuenta, ve a Settings → API Keys

## 🚀 Desarrollo Local

Si quieres probar localmente, crea un archivo `.env.local`:

```bash
RESEND_API_KEY=re_tu_clave_aqui
DATABASE_URL=mysql://user:pass@localhost:3306/tuBD
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Luego:
```bash
npm run dev
```

## 📚 Recursos

- **Documentación de Resend**: https://resend.com/docs
- **Dashboard de Resend**: https://resend.com/emails
- **Railway Docs**: https://docs.railway.app
- **Nuestro código de email**: [lib/email.ts](lib/email.ts)

---

**¿Aún tienes problemas?** 
Revisa los logs en Railway → Logs y busca mensajes con `[Email]`
