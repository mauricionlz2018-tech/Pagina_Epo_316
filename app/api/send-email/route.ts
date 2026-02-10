import nodemailer from 'nodemailer';
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

    // Validar que las credenciales estén configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Credenciales de email no configuradas');
      return NextResponse.json(
        { error: 'Servicio de correo no configurado' },
        { status: 500 }
      );
    }

    // Configurar transporte SMTP con Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Enviar email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo && { replyTo }),
    });

    console.log('[Nodemailer] Correo enviado exitosamente:', {
      to,
      subject,
      messageId: info.messageId,
    });

    return NextResponse.json({
      success: true,
      message: 'Correo enviado exitosamente',
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error('[Nodemailer] Error completo al enviar correo:', JSON.stringify(error, null, 2));
    console.error('[Nodemailer] Stack trace:', error.stack);
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
