import { NextResponse, NextRequest } from 'next/server';
import { ejecutarConsulta } from '@/lib/db';

export async function GET() {
  try {
    const calificaciones = await ejecutarConsulta(
      `SELECT 
        c.id,
        c.estudiante_id,
        c.materia,
        c.calificacion,
        c.semestre,
        c.ciclo_escolar,
        e.nombre as estudiante_nombre
      FROM calificaciones c
      JOIN estudiantes e ON c.estudiante_id = e.id
      ORDER BY c.id DESC`
    );

    return NextResponse.json({ calificaciones });
  } catch (error) {
    console.error('[API] Error obteniendo calificaciones:', error);
    return NextResponse.json(
      { error: 'Error al obtener calificaciones' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { estudiante_id, materia, calificacion, semestre, ciclo_escolar } = body;

    if (!estudiante_id || !materia || !calificacion || !semestre || !ciclo_escolar) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    const result = await ejecutarConsulta(
      `INSERT INTO calificaciones (estudiante_id, materia, calificacion, semestre, ciclo_escolar)
       VALUES (?, ?, ?, ?, ?)`,
      [estudiante_id, materia, calificacion, semestre, ciclo_escolar]
    );

    return NextResponse.json(
      { message: 'Calificación creada', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Error creando calificación:', error);
    return NextResponse.json(
      { error: 'Error al crear calificación' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, estudiante_id, materia, calificacion, semestre, ciclo_escolar } = body;

    if (!id || !estudiante_id || !materia || !calificacion || !semestre || !ciclo_escolar) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    await ejecutarConsulta(
      `UPDATE calificaciones 
       SET estudiante_id = ?, materia = ?, calificacion = ?, semestre = ?, ciclo_escolar = ?
       WHERE id = ?`,
      [estudiante_id, materia, calificacion, semestre, ciclo_escolar, id]
    );

    return NextResponse.json({ message: 'Calificación actualizada' });
  } catch (error) {
    console.error('[API] Error actualizando calificación:', error);
    return NextResponse.json(
      { error: 'Error al actualizar calificación' },
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

    await ejecutarConsulta('DELETE FROM calificaciones WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Calificación eliminada' });
  } catch (error) {
    console.error('[API] Error eliminando calificación:', error);
    return NextResponse.json(
      { error: 'Error al eliminar calificación' },
      { status: 500 }
    );
  }
}
