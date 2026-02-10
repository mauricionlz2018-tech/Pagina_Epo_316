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

console.log('Conectando a SMTP con IPv4...');

transporter.verify()
  .then(success => {
    console.log('✓ Conexión EXITOSA (IPv4, puerto 465)');
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ Error de conexión:', {
      message: err.message,
      code: err.code,
    });
    process.exit(1);
  });
