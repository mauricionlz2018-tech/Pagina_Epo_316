import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as EmailPayload;
    const { to, subject, html, replyTo } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: to, subject, html' },
        { status: 400 }
      );
    }

    // Validar que la clave API esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('Clave API de Resend no configurada');
      return NextResponse.json(
        { error: 'Servicio de correo no configurado' },
        { status: 500 }
      );
    }

    // Inicializar Resend dentro del handler para evitar errores de build
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Enviar email con Resend (usa el email verificado o dominio de prueba)
    const { data, error } = await resend.emails.send({
      from: 'info@resend.dev', // Dominio de prueba de Resend (válido sin verificación)
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo && { reply_to: replyTo }),
    });

    if (error) {
      console.error('[Resend] Error al enviar correo:', error);
      return NextResponse.json({
        success: false,
        error: 'Error al enviar el correo',
        detail: error.message,
      }, { status: 500 });
    }

    console.log('[Resend] Correo enviado exitosamente:', {
      to,
      subject,
      messageId: data?.id,
    });

    return NextResponse.json({
      success: true,
      message: 'Correo enviado exitosamente',
      messageId: data?.id,
    });
  } catch (error: any) {
    console.error('[Resend] Error completo al enviar correo:', JSON.stringify(error, null, 2));
    console.error('[Resend] Stack trace:', error.stack);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al enviar el correo',
        detail: error.message,
        fullError: JSON.stringify(error, null, 2),
      },
      { status: 500 }
    );
  }
}
