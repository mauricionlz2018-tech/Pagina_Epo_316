import { NextResponse, NextRequest } from 'next/server';
import { ejecutarConsulta } from '@/lib/db';

export async function GET() {
  try {
    const estudiantes = await ejecutarConsulta(
      `SELECT 
        id, 
        nombre, 
        numero_inscripcion, 
        grado, 
        grupo, 
        correo,
        telefono,
        estado_inscripcion
      FROM estudiantes 
      ORDER BY numero_inscripcion ASC`
    );

    return NextResponse.json({ estudiantes });
  } catch (error) {
    console.error('[API] Error obteniendo estudiantes:', error);
    return NextResponse.json(
      { error: 'Error al obtener estudiantes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      correo,
      numero_inscripcion,
      grado,
      grupo,
      telefono,
      municipio,
      estado,
      codigo_postal,
    } = body;

    if (!nombre || !numero_inscripcion || !grado || !grupo) {
      return NextResponse.json(
        { error: 'Campos requeridos: nombre, número de inscripción, grado, grupo' },
        { status: 400 }
      );
    }

    await ejecutarConsulta(
      `INSERT INTO estudiantes 
       (nombre, correo, numero_inscripcion, grado, grupo, telefono, municipio, estado, codigo_postal, estado_inscripcion)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'activo')`,
      [nombre, correo, numero_inscripcion, grado, grupo, telefono, municipio || null, estado || null, codigo_postal || null]
    );

    return NextResponse.json(
      { message: 'Estudiante agregado exitosamente' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API] Error creando estudiante:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'El número de inscripción ya existe' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error al crear estudiante' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, nombre, correo, grado, grupo, telefono, estado_inscripcion } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID del estudiante requerido' },
        { status: 400 }
      );
    }

    await ejecutarConsulta(
      `UPDATE estudiantes 
       SET nombre = ?, correo = ?, grado = ?, grupo = ?, telefono = ?, estado_inscripcion = ?
       WHERE id = ?`,
      [nombre, correo, grado, grupo, telefono, estado_inscripcion, id]
    );

    return NextResponse.json({ message: 'Estudiante actualizado' });
  } catch (error) {
    console.error('[API] Error actualizando estudiante:', error);
    return NextResponse.json(
      { error: 'Error al actualizar estudiante' },
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

    await ejecutarConsulta('DELETE FROM estudiantes WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Estudiante eliminado' });
  } catch (error) {
    console.error('[API] Error eliminando estudiante:', error);
    return NextResponse.json(
      { error: 'Error al eliminar estudiante' },
      { status: 500 }
    );
  }
}
