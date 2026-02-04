import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const profesor_id = searchParams.get('profesor_id');
        const materia = searchParams.get('materia');

        if (!profesor_id) {
            return NextResponse.json(
                { error: 'profesor_id es requerido' },
                { status: 400 }
            );
        }

        let query = `
            SELECT DISTINCT e.id, e.nombre, e.numero_inscripcion, e.grado, e.grupo
            FROM estudiantes e
            INNER JOIN calificaciones c ON e.id = c.estudiante_id
            INNER JOIN materias m ON m.nombre = c.materia
            WHERE m.profesor_id = ? AND e.estado_inscripcion = 'activo'
        `;
        const params: any[] = [profesor_id];

        if (materia) {
            query += ` AND c.materia = ?`;
            params.push(materia);
        }

        query += ` ORDER BY e.grado ASC, e.grupo ASC, e.nombre ASC`;

        const [estudiantes] = await pool.query<RowDataPacket[]>(query, params);

        return NextResponse.json({ estudiantes });
    } catch (error: any) {
        console.error('Error al obtener estudiantes del docente:', error);
        return NextResponse.json(
            { error: 'Error al obtener estudiantes' },
            { status: 500 }
        );
    }
}
