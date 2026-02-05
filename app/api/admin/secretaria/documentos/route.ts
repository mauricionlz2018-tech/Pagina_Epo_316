import { NextRequest, NextResponse } from 'next/server';
import { ejecutarConsulta } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');

    let query = `
      SELECT 
        id,
        estudiante_id,
        tipo_documento,
        descripcion,
        estado,
        fecha_creacion,
        fecha_emision
      FROM documentos
    `;
    const params: any[] = [];

    if (tipo) {
      query += ' WHERE tipo_documento = ?';
      params.push(tipo);
    }

    query += ' ORDER BY fecha_creacion DESC';

    const documentos = await ejecutarConsulta(query, params);
    return NextResponse.json({ documentos });
  } catch (error) {
    console.error('[API] Error obteniendo documentos:', error);
    return NextResponse.json(
      { error: 'Error al obtener documentos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      estudiante_id,
      tipo_documento,
      descripcion,
      estado,
    } = body;

    if (!estudiante_id || !tipo_documento) {
      return NextResponse.json(
        { error: 'Campos requeridos: estudiante_id, tipo_documento' },
        { status: 400 }
      );
    }

    const result = await ejecutarConsulta(
      `INSERT INTO documentos 
       (estudiante_id, tipo_documento, descripcion, estado, fecha_creacion)
       VALUES (?, ?, ?, ?, NOW())`,
      [
        estudiante_id,
        tipo_documento,
        descripcion || '',
        estado || 'Pendiente',
      ]
    );

    return NextResponse.json(
      { message: 'Documento creado exitosamente', id: (result as any).insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Error creando documento:', error);
    return NextResponse.json(
      { error: 'Error al crear documento' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, tipo_documento, descripcion, estado } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID requerido' },
        { status: 400 }
      );
    }

    await ejecutarConsulta(
      `UPDATE documentos 
       SET tipo_documento = ?, descripcion = ?, estado = ?, fecha_emision = NOW()
       WHERE id = ?`,
      [tipo_documento, descripcion, estado, id]
    );

    return NextResponse.json({ message: 'Documento actualizado exitosamente' });
  } catch (error) {
    console.error('[API] Error actualizando documento:', error);
    return NextResponse.json(
      { error: 'Error al actualizar documento' },
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

    await ejecutarConsulta('DELETE FROM documentos WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Documento eliminado exitosamente' });
  } catch (error) {
    console.error('[API] Error eliminando documento:', error);
    return NextResponse.json(
      { error: 'Error al eliminar documento' },
      { status: 500 }
    );
  }
}
