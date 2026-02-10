const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  family: 4, // Forzar IPv4
  auth: {
    user: 'infoepo316@gmail.com',
    pass: 'qfvlvownmrwkpnwy',
  },
  connectionTimeout: 10000,
  socketTimeout: 10000,
});

const mailOptions = {
  from: 'infoepo316@gmail.com',
  to: 'infoepo316@gmail.com', // Enviarse a sí mismo para prueba
  subject: '✓ TEST: Sistema de correos EPO 316',
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2>✓ Sistema de Correos Funcionando</h2>
      <p>Este es un correo de prueba del sistema de notificaciones de EPO 316.</p>
      <p><strong>Configuración:</strong></p>
      <ul>
        <li>SMTP: smtp.gmail.com:465 (SSL)</li>
        <li>IPv4: Forzado</li>
        <li>Timestamp: ${new Date().toISOString()}</li>
      </ul>
      <p style="color: green;"><strong>✓ Si recibes este correo, TODO FUNCIONA CORRECTAMENTE</strong></p>
    </div>
  `,
};

console.log('Enviando correo de prueba...');

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('✗ Error al enviar:', {
      message: error.message,
      code: error.code,
    });
    process.exit(1);
  } else {
    console.log('✓ Correo enviado exitosamente');
    console.log('📧 Message ID:', info.messageId);
    console.log('Para: infoepo316@gmail.com');
    console.log('\n⏱ El correo debería llegar en 5-30 segundos');
    process.exit(0);
  }
});
