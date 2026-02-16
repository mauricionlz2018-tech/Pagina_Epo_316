import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET - Obtener todos los profesores
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM profesores ORDER BY nombre ASC'
    );
    return NextResponse.json({ profesores: rows });
  } catch (error: any) {
    console.error('Error al obtener profesores:', error);
    return NextResponse.json(
      { error: 'Error al obtener profesores' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo profesor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, correo, telefono, especialidad, materias_asignadas, contraseña } = body;

    // Crear profesor directamente en la tabla profesores
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO profesores (nombre, correo, telefono, especialidad, materias_asignadas, contraseña, activo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, correo, telefono, especialidad, materias_asignadas, contraseña || 'profesor123', 1]
    );

    const profesor_id = result.insertId;

    // Asignar materias al profesor en la tabla materias
    if (materias_asignadas && materias_asignadas.trim()) {
      // Parsear las materias (separadas por coma)
      const materias = materias_asignadas
        .split(',')
        .map((m: string) => m.trim())
        .filter((m: string) => m.length > 0);

      // Asignar cada materia al profesor
      for (const materia of materias) {
        await pool.query(
          'UPDATE materias SET profesor_id = ? WHERE nombre = ? AND activo = 1',
          [profesor_id, materia]
        );
      }
    }

    return NextResponse.json({
      message: 'Profesor creado exitosamente',
      id: profesor_id
    });
  } catch (error: any) {
    console.error('Error al crear profesor:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear profesor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar profesor
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, nombre, correo, telefono, especialidad, materias_asignadas, activo } = body;

    // Primero, desasignar todas las materias actuales del profesor
    await pool.query(
      'UPDATE materias SET profesor_id = NULL WHERE profesor_id = ?',
      [id]
    );

    // Si hay materias asignadas, asignarlas
    if (materias_asignadas && materias_asignadas.trim()) {
      // Parsear las materias (separadas por coma)
      const materias = materias_asignadas
        .split(',')
        .map((m: string) => m.trim())
        .filter((m: string) => m.length > 0);

      // Asignar cada materia al profesor
      for (const materia of materias) {
        await pool.query(
          'UPDATE materias SET profesor_id = ? WHERE nombre = ? AND activo = 1',
          [id, materia]
        );
      }
    }

    // Actualizar datos del profesor en tabla profesores
    await pool.query(
      'UPDATE profesores SET nombre = ?, correo = ?, telefono = ?, especialidad = ?, materias_asignadas = ?, activo = ? WHERE id = ?',
      [nombre, correo, telefono, especialidad, materias_asignadas, activo, id]
    );

    // Actualizar también el usuario
    await pool.query(
      'UPDATE usuarios SET correo = ?, nombre = ?, activo = ? WHERE id = (SELECT usuario_id FROM profesores WHERE id = ?)',
      [correo, nombre, activo, id]
    );

    return NextResponse.json({ message: 'Profesor actualizado exitosamente' });
  } catch (error: any) {
    console.error('Error al actualizar profesor:', error);
    return NextResponse.json(
      { error: 'Error al actualizar profesor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar profesor
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

    // Desasignar todas las materias del profesor
    await pool.query(
      'UPDATE materias SET profesor_id = NULL WHERE profesor_id = ?',
      [id]
    );

    // Eliminar profesor
    await pool.query('DELETE FROM profesores WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Profesor eliminado exitosamente' });
  } catch (error: any) {
    console.error('Error al eliminar profesor:', error);
    return NextResponse.json(
      { error: 'Error al eliminar profesor' },
      { status: 500 }
    );
  }
}