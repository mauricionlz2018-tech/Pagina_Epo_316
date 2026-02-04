import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'evidencias');

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const calificacion_id = searchParams.get('calificacion_id');
        const profesor_id = searchParams.get('profesor_id');

        if (!calificacion_id || !profesor_id) {
            return NextResponse.json(
                { error: 'calificacion_id y profesor_id son requeridos' },
                { status: 400 }
            );
        }

        // Verificar que el profesor sea el dueño de la calificación
        const [calificacion] = await pool.query<RowDataPacket[]>(
            `SELECT profesor_id FROM calificaciones WHERE id = ?`,
            [calificacion_id]
        );

        if (!calificacion || calificacion.length === 0 || calificacion[0].profesor_id !== parseInt(profesor_id)) {
            return NextResponse.json(
                { error: 'No tienes permiso para ver estas evidencias' },
                { status: 403 }
            );
        }

        const [evidencias] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM evidencias_calificaciones 
             WHERE calificacion_id = ? 
             ORDER BY parcial ASC, fecha_creacion DESC`,
            [calificacion_id]
        );

        return NextResponse.json({ evidencias });
    } catch (error: any) {
        console.error('Error al obtener evidencias:', error);
        return NextResponse.json(
            { error: 'Error al obtener evidencias' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const calificacion_id = formData.get('calificacion_id') as string;
        const profesor_id = formData.get('profesor_id') as string;
        const parcial = formData.get('parcial') as string;
        const descripcion = formData.get('descripcion') as string;

        if (!file || !calificacion_id || !profesor_id || !parcial) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Verificar que el profesor sea el dueño de la calificación
        const [calificacion] = await pool.query<RowDataPacket[]>(
            `SELECT profesor_id FROM calificaciones WHERE id = ?`,
            [calificacion_id]
        );

        if (!calificacion || calificacion.length === 0 || calificacion[0].profesor_id !== parseInt(profesor_id)) {
            return NextResponse.json(
                { error: 'No tienes permiso para subir evidencias' },
                { status: 403 }
            );
        }

        // Crear directorio si no existe
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }

        // Generar nombre único para el archivo
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const fileExtension = file.name.split('.').pop();
        const fileName = `evidencia_${calificacion_id}_p${parcial}_${timestamp}_${randomStr}.${fileExtension}`;
        const filePath = join(UPLOAD_DIR, fileName);

        // Guardar archivo
        const bytes = await file.arrayBuffer();
        await writeFile(filePath, Buffer.from(bytes));

        // Guardar registro en base de datos
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO evidencias_calificaciones 
             (calificacion_id, profesor_id, parcial, nombre_archivo, ruta_archivo, tipo_archivo, tamaño_archivo, descripcion)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                calificacion_id,
                profesor_id,
                parcial,
                file.name,
                `/uploads/evidencias/${fileName}`,
                file.type,
                file.size,
                descripcion || null
            ]
        );

        return NextResponse.json({
            message: 'Evidencia subida exitosamente',
            id: result.insertId,
            ruta: `/uploads/evidencias/${fileName}`
        });
    } catch (error: any) {
        console.error('Error al subir evidencia:', error);
        return NextResponse.json(
            { error: error.message || 'Error al subir evidencia' },
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
                { error: 'id y profesor_id son requeridos' },
                { status: 400 }
            );
        }

        // Verificar que el profesor sea el dueño de la evidencia
        const [evidencia] = await pool.query<RowDataPacket[]>(
            `SELECT profesor_id, ruta_archivo FROM evidencias_calificaciones WHERE id = ?`,
            [id]
        );

        if (!evidencia || evidencia.length === 0 || evidencia[0].profesor_id !== parseInt(profesor_id)) {
            return NextResponse.json(
                { error: 'No tienes permiso para eliminar esta evidencia' },
                { status: 403 }
            );
        }

        // Eliminar archivo del servidor
        const rutaArchivo = evidencia[0].ruta_archivo;
        const filePath = join(process.cwd(), 'public', rutaArchivo);
        
        try {
            const fs = require('fs');
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error('Error al eliminar archivo físico:', err);
        }

        // Eliminar registro de base de datos
        await pool.query('DELETE FROM evidencias_calificaciones WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Evidencia eliminada exitosamente' });
    } catch (error: any) {
        console.error('Error al eliminar evidencia:', error);
        return NextResponse.json(
            { error: 'Error al eliminar evidencia' },
            { status: 500 }
        );
    }
}
