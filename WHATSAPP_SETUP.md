# 🤖 Guía de Configuración de WhatsApp con Twilio

## ¿Qué es Twilio?
Twilio es un servicio que permite enviar mensajes de WhatsApp automáticamente desde tu aplicación.

## Pasos para Configurar:

### 1. Crear Cuenta en Twilio
- Ve a https://www.twilio.com/
- Haz clic en "Sign Up" (arriba a la derecha)
- Completa el formulario (email, contraseña, etc.)
- Verifica tu email

### 2. Obtener Credenciales
Después de crear la cuenta:
- Ve al **Dashboard** (home de Twilio)
- Busca tu **Account SID** (empieza con "AC...")
- Busca tu **Auth Token** (contraseña de la API)
- Copia ambos valores

### 3. Configurar WhatsApp Business
- En el Dashboard, ve a **Messaging → WhatsApp**
- Haz clic en **Try WhatsApp**
- Sigue el asistente para:
  - Conectar tu número de WhatsApp Business (o crear uno)
  - Obtener el número de Twilio para WhatsApp

### 4. Agregar Variables de Entorno
En tu archivo `.env.local`, agrega:

```
TWILIO_ACCOUNT_SID=tu_account_sid_aqui
TWILIO_AUTH_TOKEN=tu_auth_token_aqui
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
```

**Ejemplo:**
```
TWILIO_ACCOUNT_SID=ACa1b2c3d4e5f6g7h8i9j0k
TWILIO_AUTH_TOKEN=asdfghjklzxcvbnmasdfgh
TWILIO_WHATSAPP_NUMBER=whatsapp:+573001234567
```

### 5. Reiniciar el Servidor
```bash
npm run dev
```

## ¿Cómo Usar en la Aplicación?

### Desde Calificaciones:
Cuando guardes una calificación, habrá un botón "📱 Enviar a WhatsApp"

### Desde Estudiantes:
Cuando crees/edites un estudiante, habrá una opción para notificar por WhatsApp

## Costos
- **Prueba gratis:** Twilio ofrece $15 de crédito inicial
- **Después:** Típicamente $0.007 USD por SMS / mensaje de WhatsApp

## Prueba Gratis
Si quieres probar sin gastar dinero:
1. Usa los números de prueba de Twilio
2. Agrega números autorizados en el panel de control
3. La prueba funciona durante 30 días

## ¿Problemas?
- ❌ "Configuración no completada": Revisa que todas las variables estén en `.env.local`
- ❌ "Número inválido": Asegúrate que el teléfono tenga formato +XXXXXXXXXX
- ❌ "Saldo insuficiente": Recarga crédito en Twilio

## Más Información
- Documentación: https://www.twilio.com/docs/whatsapp
- Contacto: support@twilio.com
