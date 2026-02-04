import { NextRequest, NextResponse } from 'next/server';
import { ejecutarConsulta } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');

    let query = `
      SELECT 
        id,
        titulo,
        tipo_reporte,
        descripcion,
        fecha_generacion,
        estado,
        datos_json
      FROM reportes_administrativos
    `;
    const params: any[] = [];

    if (tipo) {
      query += ' WHERE tipo_reporte = ?';
      params.push(tipo);
    }

    query += ' ORDER BY fecha_generacion DESC';

    const reportes = await ejecutarConsulta(query, params);
    return NextResponse.json({ reportes });
  } catch (error) {
    console.error('[API] Error obteniendo reportes:', error);
    return NextResponse.json(
      { error: 'Error al obtener reportes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      titulo,
      tipo_reporte,
      descripcion,
      datos_json,
    } = body;

    if (!titulo || !tipo_reporte) {
      return NextResponse.json(
        { error: 'Campos requeridos: titulo, tipo_reporte' },
        { status: 400 }
      );
    }

    const result = await ejecutarConsulta(
      `INSERT INTO reportes_administrativos 
       (titulo, tipo_reporte, descripcion, datos_json, fecha_generacion, estado)
       VALUES (?, ?, ?, ?, NOW(), 'Generado')`,
      [
        titulo,
        tipo_reporte,
        descripcion || '',
        datos_json ? JSON.stringify(datos_json) : null,
      ]
    );

    return NextResponse.json(
      { message: 'Reporte creado exitosamente', id: (result as any).insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Error creando reporte:', error);
    return NextResponse.json(
      { error: 'Error al crear reporte' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, titulo, tipo_reporte, descripcion, estado } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID requerido' },
        { status: 400 }
      );
    }

    await ejecutarConsulta(
      `UPDATE reportes_administrativos 
       SET titulo = ?, tipo_reporte = ?, descripcion = ?, estado = ?
       WHERE id = ?`,
      [titulo, tipo_reporte, descripcion, estado, id]
    );

    return NextResponse.json({ message: 'Reporte actualizado exitosamente' });
  } catch (error) {
    console.error('[API] Error actualizando reporte:', error);
    return NextResponse.json(
      { error: 'Error al actualizar reporte' },
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

    await ejecutarConsulta('DELETE FROM reportes_administrativos WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Reporte eliminado exitosamente' });
  } catch (error) {
    console.error('[API] Error eliminando reporte:', error);
    return NextResponse.json(
      { error: 'Error al eliminar reporte' },
      { status: 500 }
    );
  }
}
