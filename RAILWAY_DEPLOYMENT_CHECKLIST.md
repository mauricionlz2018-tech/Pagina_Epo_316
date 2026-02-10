# ✅ RAILWAY DEPLOYMENT CHECKLIST

## 🎯 PARA QUE EL FORMULARIO DE CONTACTO FUNCIONE EN RAILWAY

### Parte 1: API Key de Resend (OBLIGATORIO)
- [ ] Visita https://resend.com
- [ ] Crea cuenta GRATIS (si no tienes)
- [ ] Ve a Settings → API Keys
- [ ] Copia tu API Key (comienza con `re_`)
  ```
  Ejemplo: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ```

### Parte 2: Configurar en Railway
- [ ] Abre https://railway.app
- [ ] Selecciona proyecto "Pagina_Epo_316"
- [ ] Click en pestaña **Variables**
- [ ] Click en **Add Variable**

#### Variable 1: RESEND_API_KEY (CRÍTICO)
```
Nombre: RESEND_API_KEY
Valor: re_tu_api_key_aqui
```
- [ ] Pego el valor correctamente
- [ ] Click en **Add**

#### Variable 2: EMAIL_FROM (Opcional pero recomendado)
```
Nombre: EMAIL_FROM
Valor: noreply@resend.dev
```
- [ ] Click en **Add**

#### Variable 3: NODE_ENV (Verificar)
```
Nombre: NODE_ENV
Valor: production
```
- [ ] Está configurado

### Parte 3: Redeploy (IMPORTANTE!)
- [ ] Baja en Railway a sección **Deployments**
- [ ] Click en **Deploy** o **Redeploy**
- [ ] Espera a que termine (deberías ver ✓ Ready)
- [ ] ⚠️ Sin este paso los cambios NO se aplican

### Parte 4: Verificar que Funciona
- [ ] Abre tu sitio en Railway (URL en dashboard)
- [ ] Ve a página de **Contacto**
- [ ] Llena el formulario y envía
- [ ] Deberías recibir correo en `infoepo316@gmail.com`

### Debugging (si no funciona)
1. Abre Railway Dashboard → Logs
2. Busca mensajes con `[Email]`
3. Deberías ver:
   ```
   ✓ [Email] RESEND_API_KEY configurada: ✓ Sí
   ✓ [Email] Enviado a infoepo316@gmail.com
   ```

Si ves:
```
❌ [Email] RESEND_API_KEY actual: undefined
```
Significa que NO configaste la variable. Vuelve al **Paso 2**.

---

## 🚨 PROBLEMAS COMUNES

### "RESEND_API_KEY actual: undefined"
**Causa**: No agregaste la variable en Railway  
**Solución**: Parte 2 paso 1

### "Error al enviar correo"
**Causa 1**: API Key incorrecta  
**Solución**: Verifica que comience con `re_` en Railway

**Causa 2**: No hiciste redeploy  
**Solución**: Parte 3 - Redeploy

**Causa 3**: Resend account no activa  
**Solución**: Verifica https://resend.com - intenta enviar desde su dashboard primero

### "401 Unauthorized"
**Causa**: API Key inválida o expirada  
**Solución**: Copia una NUEVA key de https://resend.com/settings/integrations

---

## ✨ CHECKLIST RÁPIDO ANTES DE REDEPLOY

```
¿Tengo API Key de Resend?                    ☐ Sí
¿Está agregada en Railway Variables?          ☐ Sí
¿La variable se llama RESEND_API_KEY?         ☐ Sí
¿El valor comienza con "re_"?                 ☐ Sí
¿Hice Click en Add Variable?                  ☐ Sí
¿Bajé y hice Redeploy?                       ☐ Sí
¿Esperé a que termine el despliegue?         ☐ Sí
¿Probé el formulario en mi sitio?             ☐ Sí
¿Verifiqué los logs de Railway?               ☐ Sí
```

## 📞 SOPORTE

Si aún tienen problemas:
1. Revisa [RESEND_SETUP.md](RESEND_SETUP.md) para instrucciones detalladas
2. Lee los logs en Railway → Logs (busca `[Email]`)
3. Verifica tu cuenta de Resend en https://resend.com

---

**Actual**: Febrero 2026  
**Status**: En producción  
✅ Resend configurado  
✅ Railway listo  
✅ Server de emails funcionando
