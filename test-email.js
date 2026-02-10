const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'infoepo316@gmail.com',
    pass: 'qfvlvownmrwkpnwy',
  },
  connectionTimeout: 10000,
  socketTimeout: 10000,
});

console.log('Intentando verificar conexión...');

transporter.verify()
  .then(success => {
    console.log('✓ Conexión verificada:', success);
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ Error de conexión:', {
      message: err.message,
      code: err.code,
      errno: err.errno,
      syscall: err.syscall,
    });
    process.exit(1);
  });
