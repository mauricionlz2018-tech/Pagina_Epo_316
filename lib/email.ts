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
    // Verificar credenciales
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error('[Email] Credenciales no configuradas:', {
        hasUser: !!emailUser,
        hasPassword: !!emailPassword,
      });
      throw new Error('Credenciales de correo no configuradas');
    }

    // Crear transporte
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // Enviar correo
    const info = await transporter.sendMail({
      from: emailUser,
      to: Array.isArray(to) ? to.join(',') : to,
      subject,
      html,
      ...(replyTo && { replyTo }),
    });

    console.log('[Email] Correo enviado:', {
      to,
      subject,
      messageId: info.messageId,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error('[Email] Error al enviar correo:', error.message);
    throw error;
  }
}

export { sendEmail };
