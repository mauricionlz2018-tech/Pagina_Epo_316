import { NextResponse, NextRequest } from 'next/server';

/**
 * Endpoint para enviar información a WhatsApp usando Twilio
 * NOTA: Necesita configuración de Twilio en variables de entorno
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mensaje, telefono } = body;

    if (!mensaje || !telefono) {
      return NextResponse.json(
        { error: 'Mensaje y teléfono requeridos' },
        { status: 400 }
      );
    }

    // Obtener credenciales de Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      return NextResponse.json(
        { 
          error: 'Configuración de Twilio no completada. Contacta al administrador.',
          info: 'Se necesitan: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER'
        },
        { status: 500 }
      );
    }

    // Enviar mensaje a través de Twilio
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'From': fromNumber,
          'To': `whatsapp:${telefono}`,
          'Body': mensaje,
        }).toString(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar mensaje');
    }

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado a WhatsApp',
      sid: data.sid,
    });
  } catch (error: any) {
    console.error('[WhatsApp] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error al enviar mensaje' },
      { status: 500 }
    );
  }
}
