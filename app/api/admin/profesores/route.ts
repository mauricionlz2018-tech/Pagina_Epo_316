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

    // Crear usuario primero
    const [userResult] = await pool.query<ResultSetHeader>(
      'INSERT INTO usuarios (correo, contraseña, rol, nombre, activo) VALUES (?, ?, ?, ?, ?)',
      [correo, contraseña || 'profesor123', 'profesor', nombre, 1]
    );

    const usuario_id = userResult.insertId;

    // Crear profesor
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO profesores (usuario_id, nombre, correo, telefono, especialidad, materias_asignadas) VALUES (?, ?, ?, ?, ?, ?)',
      [usuario_id, nombre, correo, telefono, especialidad, materias_asignadas]
    );

    return NextResponse.json({
      message: 'Profesor creado exitosamente',
      id: result.insertId
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

    // Obtener usuario_id antes de eliminar
    const [profesor] = await pool.query<RowDataPacket[]>(
      'SELECT usuario_id FROM profesores WHERE id = ?',
      [id]
    );

    // Eliminar profesor
    await pool.query('DELETE FROM profesores WHERE id = ?', [id]);

    // Eliminar usuario asociado
    if (profesor[0]?.usuario_id) {
      await pool.query('DELETE FROM usuarios WHERE id = ?', [profesor[0].usuario_id]);
    }

    return NextResponse.json({ message: 'Profesor eliminado exitosamente' });
  } catch (error: any) {
    console.error('Error al eliminar profesor:', error);
    return NextResponse.json(
      { error: 'Error al eliminar profesor' },
      { status: 500 }
    );
  }
}