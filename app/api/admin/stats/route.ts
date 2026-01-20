import { NextResponse } from 'next/server';
import { ejecutarConsulta } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Verificar token de autorización
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener estadísticas de la base de datos
    const estadisticas = await ejecutarConsulta(
      'SELECT total_estudiantes, total_profesores, total_clases, promedio_calificaciones FROM estadisticas_escuela ORDER BY ano DESC LIMIT 1',
      []
    ) as any[];

    if (!estadisticas || estadisticas.length === 0) {
      return NextResponse.json(
        { 
          total_estudiantes: 0,
          total_profesores: 0,
          total_clases: 0,
          promedio_calificaciones: 0 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(estadisticas[0]);
  } catch (error) {
    console.error('[Admin] Error obteniendo estadísticas:', error);
    return NextResponse.json(
      { message: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}
