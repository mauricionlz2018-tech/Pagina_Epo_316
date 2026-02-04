import { NextResponse } from 'next/server';
import { ejecutarConsulta, verificarConexion } from '@/lib/db';

export async function GET() {
  try {
    // Verificar conexión
    console.log('[Test DB] Verificando conexión...');
    const conexionOk = await verificarConexion();
    
    if (!conexionOk) {
      return NextResponse.json({
        success: false,
        message: 'No se pudo conectar a la base de datos',
        hint: 'Verifica que XAMPP esté corriendo y la base de datos seguimiento_epo_316 exista'
      }, { status: 500 });
    }

    // Probar consulta a cada tabla
    const tablas = ['director', 'subdirectora', 'secretaria', 'orientador', 'profesores'];
    const resultados: any = {};

    for (const tabla of tablas) {
      try {
        const datos = await ejecutarConsulta(`SELECT id, nombre, correo FROM ${tabla} LIMIT 5`);
        resultados[tabla] = {
          success: true,
          count: datos.length,
          data: datos
        };
      } catch (error: any) {
        resultados[tabla] = {
          success: false,
          error: error.message
        };
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Conexión exitosa a seguimiento_epo_316',
      tablas: resultados
    });

  } catch (error: any) {
    console.error('[Test DB] Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al conectar',
      error: error.message
    }, { status: 500 });
  }
}
