import { NextResponse, NextRequest } from 'next/server';
import { ejecutarConsulta } from '@/lib/db';

export async function GET() {
  try {
    const noticias = await ejecutarConsulta(
      `SELECT 
        id,
        titulo,
        contenido,
        categoria,
        publicado,
        fecha_creacion
      FROM anuncios
      ORDER BY fecha_creacion DESC`
    );

    return NextResponse.json({ noticias });
  } catch (error) {
    console.error('[API] Error obteniendo noticias:', error);
    return NextResponse.json(
      { error: 'Error al obtener noticias' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, contenido, categoria, publicado } = body;

    if (!titulo || !contenido) {
      return NextResponse.json(
        { error: 'Título y contenido requeridos' },
        { status: 400 }
      );
    }

    const result = await ejecutarConsulta(
      `INSERT INTO anuncios (titulo, contenido, categoria, publicado)
       VALUES (?, ?, ?, ?)`,
      [titulo, contenido, categoria || 'General', publicado ? 1 : 0]
    );

    return NextResponse.json(
      { message: 'Noticia creada', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Error creando noticia:', error);
    return NextResponse.json(
      { error: 'Error al crear noticia' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, titulo, contenido, categoria, publicado } = body;

    if (!id || !titulo || !contenido) {
      return NextResponse.json(
        { error: 'ID, título y contenido requeridos' },
        { status: 400 }
      );
    }

    await ejecutarConsulta(
      `UPDATE anuncios 
       SET titulo = ?, contenido = ?, categoria = ?, publicado = ?
       WHERE id = ?`,
      [titulo, contenido, categoria || 'General', publicado ? 1 : 0, id]
    );

    return NextResponse.json({ message: 'Noticia actualizada' });
  } catch (error) {
    console.error('[API] Error actualizando noticia:', error);
    return NextResponse.json(
      { error: 'Error al actualizar noticia' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requerido' },
        { status: 400 }
      );
    }

    await ejecutarConsulta('DELETE FROM anuncios WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Noticia eliminada' });
  } catch (error) {
    console.error('[API] Error eliminando noticia:', error);
    return NextResponse.json(
      { error: 'Error al eliminar noticia' },
      { status: 500 }
    );
  }
}
