import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactPayload;
    const { name, email, subject, message } = body;

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Por favor completa todos los campos' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Por favor ingresa un correo válido' },
        { status: 400 }
      );
    }

    const htmlParaAdmin = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin: 0 0 10px 0;">Nuevo Mensaje de Contacto desde el Sitio Web</h2>
          <p style="color: #666; margin: 0;">Escuela Preparatoria Oficial Núm. 316</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 3px solid #007bff; padding-bottom: 10px;">Información del Solicitante</h3>
          <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Correo:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Asunto:</strong> ${subject}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 3px solid #007bff; padding-bottom: 10px;">Mensaje</h3>
          <div style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="border-top: 2px solid #eee; padding-top: 15px; color: #999; font-size: 12px;">
          <p>Este mensaje fue enviado automáticamente desde el formulario de contacto de la página web.</p>
          <p>Por favor, responde al solicitante a través del correo: <a href="mailto:${email}">${email}</a></p>
        </div>
      </div>
    `;

    const htmlParaSolicitante = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <h2 style="color: #333; margin: 0 0 10px 0;">Contacto Recibido ✓</h2>
          <p style="color: #666; margin: 0;">Escuela Preparatoria Oficial Núm. 316</p>
        </div>

        <div style="margin-bottom: 20px;">
          <p>Hola <strong>${name}</strong>,</p>
          <p>Agradecemos tu mensaje. Hemos recibido tu contacto y nos pondremos en contacto con usted pronto.</p>
        </div>

        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333;">Resumen de tu mensaje:</h3>
          <p style="margin: 5px 0;"><strong>Asunto:</strong> ${subject}</p>
          <p style="margin: 5px 0;"><strong>Recibido:</strong> ${new Date().toLocaleDateString('es-MX', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
          })}</p>
        </div>

        <div style="border-top: 2px solid #eee; padding-top: 15px; color: #999; font-size: 12px;">
          <p>En caso de tener dudas, puedes contactarnos:</p>
          <ul style="list-style: none; padding-left: 0;">
            <li>📧 Email: infoepo316@gmail.com</li>
            <li>📧 Email: admisionesepo316@gmail.com</li>
            <li>📞 Teléfono: +52 (555) 123-4567</li>
            <li>📍 Ubicación: San José del Rincón, Estado de México, México</li>
          </ul>
        </div>
      </div>
    `;

    try {
      // Enviar correo a admisiones
      await sendEmail(
        ['infoepo316@gmail.com', 'admisionesepo316@gmail.com'],
        `[CONTACTO WEB] ${subject} - ${name}`,
        htmlParaAdmin,
        email
      );

      // Enviar confirmación al solicitante (sin bloquear si falla)
      sendEmail(
        email,
        '✓ Hemos recibido tu mensaje - EPO 316',
        htmlParaSolicitante
      ).catch(err => {
        console.error('[Contact] Error enviando confirmación:', err.message);
        // No bloquea el flujo
      });

      console.log('[Contact] Mensaje procesado exitosamente:', {
        name,
        email,
        subject,
      });

      return NextResponse.json({
        success: true,
        message: 'Mensaje enviado exitosamente. Te hemos enviado una confirmación a tu correo electrónico.',
      });
    } catch (emailError: any) {
      console.error('[Contact] Error al enviar correos:', emailError.message);
      return NextResponse.json(
        { error: 'Error al procesar tu solicitud: ' + emailError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[Contact] Error general:', error);
    return NextResponse.json(
      { error: 'Error al procesar tu solicitud' },
      { status: 500 }
    );
  }
}
