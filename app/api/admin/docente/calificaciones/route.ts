import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { notifyGradesChange } from '@/lib/email-notifications';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const profesor_id = searchParams.get('profesor_id');
        const materia = searchParams.get('materia');
        const estudiante_id = searchParams.get('estudiante_id');

        if (!profesor_id) {
            return NextResponse.json(
                { error: 'profesor_id es requerido' },
                { status: 400 }
            );
        }

        let query = `
            SELECT c.* 
            FROM calificaciones c
            INNER JOIN materias m ON m.nombre = c.materia
            WHERE m.profesor_id = ?
        `;
        const params: any[] = [profesor_id];

        if (materia) {
            query += ` AND c.materia = ?`;
            params.push(materia);
        }

        if (estudiante_id) {
            query += ` AND c.estudiante_id = ?`;
            params.push(estudiante_id);
        }

        query += ` ORDER BY c.materia ASC, c.grado ASC`;

        const [calificaciones] = await pool.query<RowDataPacket[]>(query, params);

        return NextResponse.json({ calificaciones });
    } catch (error: any) {
        console.error('Error al obtener calificaciones del docente:', error);
        return NextResponse.json(
            { error: 'Error al obtener calificaciones' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            estudiante_id,
            materia,
            grado,
            grupo,
            profesor_id,
            calificacion_parcial_1,
            inasistencias_parcial_1,
            calificacion_parcial_2,
            inasistencias_parcial_2,
            calificacion_parcial_3,
            inasistencias_parcial_3
        } = body;

        // Verificar que el profesor sea dueño de la materia
        const [materiaCheck] = await pool.query<RowDataPacket[]>(
            `SELECT id FROM materias WHERE nombre = ? AND profesor_id = ?`,
            [materia, profesor_id]
        );

        if (!materiaCheck || materiaCheck.length === 0) {
            return NextResponse.json(
                { error: 'No tienes permiso para calificar esta materia' },
                { status: 403 }
            );
        }

        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO calificaciones 
             (estudiante_id, materia, grado, grupo, profesor_id,
              calificacion_parcial_1, inasistencias_parcial_1,
              calificacion_parcial_2, inasistencias_parcial_2,
              calificacion_parcial_3, inasistencias_parcial_3)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                estudiante_id, materia, grado, grupo, profesor_id,
                calificacion_parcial_1 || null, inasistencias_parcial_1 || 0,
                calificacion_parcial_2 || null, inasistencias_parcial_2 || 0,
                calificacion_parcial_3 || null, inasistencias_parcial_3 || 0
            ]
        );

        // Obtener datos del estudiante y profesor para la notificación
        const [estudianteData] = await pool.query<RowDataPacket[]>(
            `SELECT nombre FROM estudiantes WHERE id = ?`,
            [estudiante_id]
        );
        const [profesorData] = await pool.query<RowDataPacket[]>(
            `SELECT nombre FROM usuarios WHERE id = ? AND rol = 'docente'`,
            [profesor_id]
        );

        const estudianteName = estudianteData?.[0]?.nombre || 'Estudiante desconocido';
        const profesorName = profesorData?.[0]?.nombre || 'Docente desconocido';

        // Enviar notificación a superiores
        notifyGradesChange({
            estudiante_id,
            estudiante_nombre: estudianteName,
            materia,
            grado,
            grupo,
            profesor_id,
            profesor_nombre: profesorName,
            calificacion_parcial_1,
            calificacion_parcial_2,
            calificacion_parcial_3,
            inasistencias_parcial_1,
            inasistencias_parcial_2,
            inasistencias_parcial_3,
            tipo: 'crear',
        }).catch(err => console.error('[Calificaciones] Error notificando:', err));

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

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            id,
            materia,
            grado,
            grupo,
            profesor_id,
            calificacion_parcial_1,
            inasistencias_parcial_1,
            calificacion_parcial_2,
            inasistencias_parcial_2,
            calificacion_parcial_3,
            inasistencias_parcial_3
        } = body;

        // Verificar que el profesor sea dueño de la materia
        const [materiaCheck] = await pool.query<RowDataPacket[]>(
            `SELECT id FROM materias WHERE nombre = ? AND profesor_id = ?`,
            [materia, profesor_id]
        );

        if (!materiaCheck || materiaCheck.length === 0) {
            return NextResponse.json(
                { error: 'No tienes permiso para editar esta calificación' },
                { status: 403 }
            );
        }

        await pool.query(
            `UPDATE calificaciones SET 
             materia = ?, grado = ?, grupo = ?,
             calificacion_parcial_1 = ?, inasistencias_parcial_1 = ?,
             calificacion_parcial_2 = ?, inasistencias_parcial_2 = ?,
             calificacion_parcial_3 = ?, inasistencias_parcial_3 = ?
             WHERE id = ? AND profesor_id = ?`,
            [
                materia, grado, grupo,
                calificacion_parcial_1 || null, inasistencias_parcial_1 || 0,
                calificacion_parcial_2 || null, inasistencias_parcial_2 || 0,
                calificacion_parcial_3 || null, inasistencias_parcial_3 || 0,
                id, profesor_id
            ]
        );

        // Obtener datos del estudiante y profesor para la notificación
        const [estudianteData] = await pool.query<RowDataPacket[]>(
            `SELECT nombre FROM estudiantes WHERE id = ?`,
            [body.estudiante_id]
        );
        const [profesorData] = await pool.query<RowDataPacket[]>(
            `SELECT nombre FROM usuarios WHERE id = ? AND rol = 'docente'`,
            [profesor_id]
        );

        const estudianteName = estudianteData?.[0]?.nombre || 'Estudiante desconocido';
        const profesorName = profesorData?.[0]?.nombre || 'Docente desconocido';

        // Enviar notificación a superiores
        notifyGradesChange({
            id,
            estudiante_id: body.estudiante_id,
            estudiante_nombre: estudianteName,
            materia,
            grado,
            grupo,
            profesor_id,
            profesor_nombre: profesorName,
            calificacion_parcial_1,
            calificacion_parcial_2,
            calificacion_parcial_3,
            inasistencias_parcial_1,
            inasistencias_parcial_2,
            inasistencias_parcial_3,
            tipo: 'actualizar',
        }).catch(err => console.error('[Calificaciones] Error notificando:', err));

        return NextResponse.json({ message: 'Calificación actualizada exitosamente' });
    } catch (error: any) {
        console.error('Error al actualizar calificación:', error);
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
        const profesor_id = searchParams.get('profesor_id');

        if (!id || !profesor_id) {
            return NextResponse.json(
                { error: 'ID y profesor_id son requeridos' },
                { status: 400 }
            );
        }

        // Verificar que el profesor sea el dueño de la calificación
        const [calificacion] = await pool.query<RowDataPacket[]>(
            `SELECT profesor_id FROM calificaciones WHERE id = ?`,
            [id]
        );

        if (!calificacion || calificacion.length === 0 || calificacion[0].profesor_id !== parseInt(profesor_id)) {
            return NextResponse.json(
                { error: 'No tienes permiso para eliminar esta calificación' },
                { status: 403 }
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
