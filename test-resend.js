require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
  console.log('=== PRUEBA DE RESEND ===');
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Configurada' : 'No configurada');
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM || 'info@epo316.com');

  try {
    const { data, error } = await resend.emails.send({
      from: 'info@resend.dev',
      to: 'infoepo316@gmail.com',
      subject: 'Prueba de Resend',
      html: '<p>Este es un email de prueba enviado con Resend</p>',
      text: 'Este es un email de prueba enviado con Resend'
    });

    if (error) {
      console.error('❌ Error al enviar email:', error);
      return;
    }

    console.log('✅ Correo enviado exitosamente');
    console.log('Message ID:', data.id);
    console.log('URL para verificar:', `https://resend.com/emails/${data.id}`);
  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

testResend();
