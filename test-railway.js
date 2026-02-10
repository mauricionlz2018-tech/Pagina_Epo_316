const { Resend } = require('resend');
const resend = new Resend('re_DF7A4nto_MYYEY2TwVLhmZnbSBrXwXSET');

async function testRailway() {
  console.log('=== PRUEBA DIRECTA DE RESEND ===');
  console.log('API Key:', 're_DF7A4nto_MYYEY2TwVLhmZnbSBrXwXSET');
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'info@resend.dev',
      to: 'infoepo316@gmail.com',
      subject: 'Prueba DIRECTA desde Railway',
      html: '<p>Este email se envió DIRECTAMENTE desde el servidor Railway usando Resend</p>',
      text: 'Prueba DIRECTA desde Railway'
    });
    
    if (error) {
      console.error('❌ Error:', JSON.stringify(error, null, 2));
      return;
    }
    
    console.log('✅ Success!');
    console.log('Message ID:', data.id);
    console.log('View:', `https://resend.com/emails/${data.id}`);
  } catch (error) {
    console.error('❌ Exception:', JSON.stringify(error, null, 2));
  }
}

testRailway();
