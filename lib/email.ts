import { Resend } from 'resend';

/**
 * Función centralizada para enviar correos
 * Usa Resend API para entornos cloud (Railway)
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

    // Verificar credenciales de Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[Email] Clave API de Resend no configurada');
      throw new Error('Clave API de correo no configurada');
    }

    // Inicializar Resend
    const resend = new Resend(resendApiKey);

    // Enviar correos de uno en uno para mejor control de errores
    const resultados = [];
    for (const destinatario of validEmails) {
      try {
        console.log(`[Email] Enviando a ${destinatario}...`);
        const { data, error } = await resend.emails.send({
          from: 'info@resend.dev',
          to: destinatario,
          subject,
          html,
          ...(replyTo && { reply_to: replyTo }),
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        console.log(`[Email] ✓ Enviado a ${destinatario}: ${data?.id}`);
        resultados.push({ email: destinatario, success: true, messageId: data?.id });
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
