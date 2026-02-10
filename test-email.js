const nodemailer = require('nodemailer');
require('dotenv').config({ path: './.env.local' });

async function testEmail() {
  console.log('=== PRUEBA DE ENVÍO DE CORREO ===');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Configurada' : 'NO CONFIGURADA');
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    console.log('Transporte creado exitosamente');

    // Verificar conexión
    await transporter.verify();
    console.log('Conexión SMTP verificada');

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'PRUEBA DE CORREO - Página Web EPO 316',
      text: 'Este es un correo de prueba desde el sistema de la página web',
      html: '<h3>Prueba Exitosa!</h3><p>Este correo confirma que el sistema de envío de correos está funcionando.</p><p>Fecha: ' + new Date().toString() + '</p>'
    });

    console.log('Correo enviado exitosamente');
    console.log('Message ID:', info.messageId);
    console.log('URL para verificar:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('=== ERROR ===');
    console.error('Mensaje:', error.message);
    if (error.code) {
      console.error('Código:', error.code);
    }
    if (error.response) {
      console.error('Respuesta:', error.response);
    }
  }
}

testEmail().then(() => process.exit(0)).catch(() => process.exit(1));
