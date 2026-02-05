import { NextRequest, NextResponse } from 'next/server';
import { ejecutarConsulta } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orientador_id = searchParams.get('orientador_id');

    let query = `
      SELECT 
        id,
        estudiante_id,
        tipo_caso,
        descripcion,
        estado,
        prioridad,
        fecha_creacion,
        fecha_inicio
      FROM casos_orientacion
    `;
    const params: any[] = [];

    if (orientador_id) {
      query += ' WHERE orientador_id = ?';
      params.push(orientador_id);
    }

    query += ' ORDER BY fecha_creacion DESC';

    const casos = await ejecutarConsulta(query, params);
    return NextResponse.json({ casos });
  } catch (error) {
    console.error('[API] Error obteniendo casos:', error);
    return NextResponse.json(
      { error: 'Error al obtener casos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      estudiante_id,
      tipo_caso,
      descripcion,
      prioridad,
      estado,
    } = body;

    if (!estudiante_id || !tipo_caso) {
      return NextResponse.json(
        { error: 'Campos requeridos: estudiante_id, tipo_caso' },
        { status: 400 }
      );
    }

    const result = await ejecutarConsulta(
      `INSERT INTO casos_orientacion
       (estudiante_id, orientador_id, tipo_caso, descripcion, prioridad, estado, fecha_creacion)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        estudiante_id,
        1, // Default orientador_id (first orientador)
        tipo_caso,
        descripcion || '',
        prioridad || 'Media',
        estado || 'Nuevo',
      ]
    );

    return NextResponse.json(
      { message: 'Caso creado exitosamente', id: (result as any).insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Error creando caso:', error);
    return NextResponse.json(
      { error: 'Error al crear caso' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, tipo_caso, descripcion, prioridad, estado } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID requerido' },
        { status: 400 }
      );
    }

    await ejecutarConsulta(
      `UPDATE casos_orientacion 
       SET tipo_caso = ?, descripcion = ?, prioridad = ?, estado = ?, fecha_inicio = NOW()
       WHERE id = ?`,
      [tipo_caso, descripcion, prioridad, estado, id]
    );

    return NextResponse.json({ message: 'Caso actualizado exitosamente' });
  } catch (error) {
    console.error('[API] Error actualizando caso:', error);
    return NextResponse.json(
      { error: 'Error al actualizar caso' },
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

    await ejecutarConsulta('DELETE FROM casos_orientacion WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Caso eliminado exitosamente' });
  } catch (error) {
    console.error('[API] Error eliminando caso:', error);
    return NextResponse.json(
      { error: 'Error al eliminar caso' },
      { status: 500 }
    );
  }
}
