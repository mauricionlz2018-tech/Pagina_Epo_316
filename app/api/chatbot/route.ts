import { NextResponse } from 'next/server';

const RESPONSES = {
  programas: 'Ofrecemos Bachillerato General con especialidades en Ciencias, Humanidades y Técnicas. Puedes conocer más en la sección de Académico.',
  biblioteca: 'Tenemos acceso a bibliotecas digitales como UNAM Global, IPN, Google Scholar y Dominio Público. Consulta la sección de Orientación para más detalles.',
  ubicacion: 'Estamos ubicados en el Estado de México. En la sección de Ubicación encontrarás nuestro mapa interactivo y dirección completa.',
  inscripcion: 'Para inscribirte necesitas: Certificado de Educación Secundaria, CURP, Acta de Nacimiento y aprobar el examen de admisión.',
  horario: 'Nuestro horario de atención es de lunes a viernes de 8:00 a 16:00 hrs. Viernes cerramos a las 15:00.',
  transporte: 'Contáctanos directamente al teléfono o email para información sobre disponibilidad de transporte escolar.',
  noticias: 'Puedes ver las noticias más recientes en la sección de Noticias del sitio web.',
  orientacion: 'Contamos con un departamento de orientación dedicado a tu bienestar académico y personal. Consulta la sección de Orientación.',
  default: 'Gracias por tu pregunta. Para obtener información más específica, por favor contacta directamente con la escuela al teléfono (555) 123-4567 o email info@epo316.gmail.com'
};

function getResponse(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes('programa') || msg.includes('académico') || msg.includes('carrera')) {
    return RESPONSES.programas;
  }
  if (msg.includes('biblioteca') || msg.includes('digital') || msg.includes('libro')) {
    return RESPONSES.biblioteca;
  }
  if (msg.includes('ubicación') || msg.includes('dónde') || msg.includes('dirección')) {
    return RESPONSES.ubicacion;
  }
  if (msg.includes('inscrib') || msg.includes('admisión') || msg.includes('registro')) {
    return RESPONSES.inscripcion;
  }
  if (msg.includes('horario') || msg.includes('atención') || msg.includes('abierto')) {
    return RESPONSES.horario;
  }
  if (msg.includes('transporte') || msg.includes('camión') || msg.includes('autobús')) {
    return RESPONSES.transporte;
  }
  if (msg.includes('noticia') || msg.includes('evento') || msg.includes('anuncio')) {
    return RESPONSES.noticias;
  }
  if (msg.includes('orientación') || msg.includes('orientador') || msg.includes('apoyo')) {
    return RESPONSES.orientacion;
  }
  
  return RESPONSES.default;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = getResponse(message);

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error('[Chatbot] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
