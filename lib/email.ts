import nodemailer from 'nodemailer';

/**
 * Función centralizada para enviar correos
 * Evita problemas de fetches internos en producción (Railway)
 */
async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
  replyTo?: string
) {
  try {
    // Verificar y normalizar destinatarios
    if (!to || (Array.isArray(to) && to.length === 0)) {
      throw new Error('Destinatario(s) no especificado(s)');
    }

    const toArray = Array.isArray(to) ? to : [to];
    const validEmails = toArray.filter(email => email && email.includes('@'));
    
    if (validEmails.length === 0) {
      throw new Error('No hay correos válidos para enviar');
    }

    console.log('[Email] Enviando a:', validEmails);

    // Verificar credenciales
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error('[Email] Credenciales no configuradas:', {
        hasUser: !!emailUser,
        hasPassword: !!emailPassword,
        userLength: emailUser?.length,
        passLength: emailPassword?.length,
      });
      throw new Error('Credenciales de correo no configuradas o inválidas');
    }

    // Validar credenciales no contengan espacios
    if (emailPassword.includes(' ')) {
      console.error('[Email] ALERTA: La contraseña contiene espacios');
      throw new Error('Credenciales de correo inválidas (espacios detectados)');
    }

    // Crear transporte - Simplificado para nodemailer v8+
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // Enviar correos de uno en uno para mejor control de errores
    const resultados = [];
    for (const destinatario of validEmails) {
      try {
        console.log(`[Email] Enviando a ${destinatario}...`);
        const info = await transporter.sendMail({
          from: emailUser,
          to: destinatario,
          subject,
          html,
          ...(replyTo && { replyTo }),
        });
        
        console.log(`[Email] ✓ Enviado a ${destinatario}: ${info.messageId}`);
        resultados.push({ email: destinatario, success: true, messageId: info.messageId });
      } catch (singleError: any) {
        console.error(`[Email] ✗ Error enviando a ${destinatario}:`, singleError.message);
        resultados.push({ email: destinatario, success: false, error: singleError.message });
      }
    }

    // Verificar si al menos uno fue exitoso
    const exitosos = resultados.filter(r => r.success);
    if (exitosos.length === 0) {
      throw new Error(`No se pudo enviar a ningún destinatario. Detalles: ${JSON.stringify(resultados)}`);
    }

    console.log('[Email] Envío completado:', {
      total: validEmails.length,
      exitosos: exitosos.length,
      subject,
    });

    return {
      success: true,
      sentTo: exitosos.map(r => r.email),
      messageIds: exitosos.map(r => r.messageId),
    };
  } catch (error: any) {
    console.error('[Email] Error al enviar correo:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      stack: error.stack,
    });
    throw new Error(`SendEmail Error: ${error.message} (${error.code || 'UNKNOWN'})`);
  }
}

export { sendEmail };
