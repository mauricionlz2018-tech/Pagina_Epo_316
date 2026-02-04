import { NextRequest, NextResponse } from 'next/server';
import { ejecutarConsulta } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const eventos = await ejecutarConsulta(
      `SELECT 
        id,
        nombre,
        descripcion,
        fecha_evento,
        lugar,
        tipo_evento,
        estado,
        fecha_creacion
      FROM eventos_escolares
      ORDER BY fecha_evento ASC`
    );

    return NextResponse.json({ eventos });
  } catch (error) {
    console.error('[API] Error obteniendo eventos:', error);
    return NextResponse.json(
      { error: 'Error al obtener eventos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      descripcion,
      fecha_evento,
      lugar,
      tipo_evento,
      estado,
    } = body;

    if (!nombre || !fecha_evento) {
      return NextResponse.json(
        { error: 'Campos requeridos: nombre, fecha_evento' },
        { status: 400 }
      );
    }

    const result = await ejecutarConsulta(
      `INSERT INTO eventos_escolares 
       (nombre, descripcion, fecha_evento, lugar, tipo_evento, estado, fecha_creacion)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        nombre,
        descripcion || '',
        fecha_evento,
        lugar || '',
        tipo_evento || 'General',
        estado || 'Programado',
      ]
    );

    return NextResponse.json(
      { message: 'Evento creado exitosamente', id: (result as any).insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Error creando evento:', error);
    return NextResponse.json(
      { error: 'Error al crear evento' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, nombre, descripcion, fecha_evento, lugar, tipo_evento, estado } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID requerido' },
        { status: 400 }
      );
    }

    await ejecutarConsulta(
      `UPDATE eventos_escolares 
       SET nombre = ?, descripcion = ?, fecha_evento = ?, lugar = ?, tipo_evento = ?, estado = ?
       WHERE id = ?`,
      [nombre, descripcion, fecha_evento, lugar, tipo_evento, estado, id]
    );

    return NextResponse.json({ message: 'Evento actualizado exitosamente' });
  } catch (error) {
    console.error('[API] Error actualizando evento:', error);
    return NextResponse.json(
      { error: 'Error al actualizar evento' },
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

    await ejecutarConsulta('DELETE FROM eventos_escolares WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    console.error('[API] Error eliminando evento:', error);
    return NextResponse.json(
      { error: 'Error al eliminar evento' },
      { status: 500 }
    );
  }
}
