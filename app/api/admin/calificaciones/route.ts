import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET - Obtener todas las calificaciones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const estudiante_id = searchParams.get('estudiante_id');
    const materia = searchParams.get('materia');

    let query = 'SELECT * FROM calificaciones';
    const params: any[] = [];

    if (estudiante_id) {
      query += ' WHERE estudiante_id = ?';
      params.push(estudiante_id);
    } else if (materia) {
      query += ' WHERE materia = ?';
      params.push(materia);
    }

    query += ' ORDER BY materia ASC';

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return NextResponse.json({ calificaciones: rows });
  } catch (error: any) {
    console.error('Error al obtener calificaciones:', error);
    return NextResponse.json(
      { error: 'Error al obtener calificaciones' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva calificación
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      estudiante_id,
      materia,
      grado,
      grupo,
      ciclo_escolar,
      profesor_id,
      calificacion_parcial_1,
      inasistencias_parcial_1,
      calificacion_parcial_2,
      inasistencias_parcial_2,
      calificacion_parcial_3,
      inasistencias_parcial_3
    } = body;

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO calificaciones 
       (estudiante_id, materia, grado, grupo, ciclo_escolar, profesor_id,
        calificacion_parcial_1, inasistencias_parcial_1,
        calificacion_parcial_2, inasistencias_parcial_2,
        calificacion_parcial_3, inasistencias_parcial_3)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        estudiante_id, materia, grado, grupo, ciclo_escolar, profesor_id || null,
        calificacion_parcial_1 || null, inasistencias_parcial_1 || 0,
        calificacion_parcial_2 || null, inasistencias_parcial_2 || 0,
        calificacion_parcial_3 || null, inasistencias_parcial_3 || 0
      ]
    );

    return NextResponse.json({
      message: 'Calificación creada exitosamente',
      id: result.insertId
    });
  } catch (error: any) {
    console.error('Error al crear calificación:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear calificación' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar calificación
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      materia,
      grado,
      grupo,
      ciclo_escolar,
      calificacion_parcial_1,
      inasistencias_parcial_1,
      calificacion_parcial_2,
      inasistencias_parcial_2,
      calificacion_parcial_3,
      inasistencias_parcial_3
    } = body;

    await pool.query(
      `UPDATE calificaciones SET 
       materia = ?, grado = ?, grupo = ?, ciclo_escolar = ?,
       calificacion_parcial_1 = ?, inasistencias_parcial_1 = ?,
       calificacion_parcial_2 = ?, inasistencias_parcial_2 = ?,
       calificacion_parcial_3 = ?, inasistencias_parcial_3 = ?
       WHERE id = ?`,
      [
        materia, grado, grupo, ciclo_escolar,
        calificacion_parcial_1 || null, inasistencias_parcial_1 || 0,
        calificacion_parcial_2 || null, inasistencias_parcial_2 || 0,
        calificacion_parcial_3 || null, inasistencias_parcial_3 || 0,
        id
      ]
    );

    return NextResponse.json({ message: 'Calificación actualizada exitosamente' });
  } catch (error: any) {
    console.error('Error al actualizar calificación:', error);
    return NextResponse.json(
      { error: 'Error al actualizar calificación' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar calificación
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID no proporcionado' },
        { status: 400 }
      );
    }

    await pool.query('DELETE FROM calificaciones WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Calificación eliminada exitosamente' });
  } catch (error: any) {
    console.error('Error al eliminar calificación:', error);
    return NextResponse.json(
      { error: 'Error al eliminar calificación' },
      { status: 500 }
    );
  }
}