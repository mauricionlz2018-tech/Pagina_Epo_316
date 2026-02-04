import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const profesor_id = searchParams.get('profesor_id');

        if (!profesor_id) {
            return NextResponse.json(
                { error: 'profesor_id es requerido' },
                { status: 400 }
            );
        }

        // Obtener materias asignadas al profesor
        const [materias] = await pool.query<RowDataPacket[]>(
            `SELECT id, nombre, clave, grado, creditos 
             FROM materias 
             WHERE profesor_id = ? AND activo = 1
             ORDER BY grado ASC, nombre ASC`,
            [profesor_id]
        );

        return NextResponse.json({ materias });
    } catch (error: any) {
        console.error('Error al obtener materias del docente:', error);
        return NextResponse.json(
            { error: 'Error al obtener materias' },
            { status: 500 }
        );
    }
}
