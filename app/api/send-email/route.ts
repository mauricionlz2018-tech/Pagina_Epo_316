import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Configura el transporte de correo
 * Usa Gmail SMTP con opciones de conexión robustas
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER || 'infoepo316@gmail.com',
    pass: process.env.EMAIL_PASSWORD || '',
  },
  tls: {
    rejectUnauthorized: false, // Evita errores de certificado en cloud
  },
  connectionTimeout: 10000, // Aumenta el tiempo de espera
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

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

    // Validar que haya credenciales configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Credenciales de correo no configuradas');
      return NextResponse.json(
        { error: 'Servicio de correo no configurado' },
        { status: 500 }
      );
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'infoepo316@gmail.com',
      to: Array.isArray(to) ? to.join(',') : to,
      subject,
      html,
      ...(replyTo && { replyTo }),
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('[Email] Correo enviado exitosamente:', {
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
    console.error('[Email] Error completo al enviar correo:', JSON.stringify(error, null, 2));
    console.error('[Email] Stack trace:', error.stack);
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
