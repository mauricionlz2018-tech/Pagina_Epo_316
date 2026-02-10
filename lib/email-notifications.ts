import pool from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { RowDataPacket } from 'mysql2';

interface CalificacionNotifi {
  estudiante_id: number;
  estudiante_nombre: string;
  materia: string;
  grado: string;
  grupo: string;
  profesor_id: number;
  profesor_nombre: string;
  calificacion_parcial_1?: number;
  calificacion_parcial_2?: number;
  calificacion_parcial_3?: number;
  inasistencias_parcial_1?: number;
  inasistencias_parcial_2?: number;
  inasistencias_parcial_3?: number;
  tipo: 'crear' | 'actualizar';
}

/**
 * Envía notificación de calificación a los superiores
 * Función centralizada para evitar duplicación de código
 */
export async function notifyGradesChange(data: CalificacionNotifi) {
  try {
    const {
      estudiante_nombre,
      materia,
      grado,
      grupo,
      profesor_nombre,
      calificacion_parcial_1,
      calificacion_parcial_2,
      calificacion_parcial_3,
      inasistencias_parcial_1,
      inasistencias_parcial_2,
      inasistencias_parcial_3,
      tipo,
    } = data;

    // Obtener correos de superiores
    const [superiores] = await pool.query<RowDataPacket[]>(
      `SELECT DISTINCT email FROM usuarios 
       WHERE rol IN ('director', 'subdirectora', 'orientador') 
       AND email IS NOT NULL AND email != ''`,
    );

    const correosSuperiores = superiores
      .map((s) => s.email)
      .filter((email) => email && email.includes('@'));

    if (correosSuperiores.length === 0) {
      console.log('[Grades] No hay superiores configurados');
      return { success: true, notificados: 0 };
    }

    // Construir HTML
    const promedioP1 = calificacion_parcial_1 ? `${calificacion_parcial_1.toFixed(2)}` : 'Sin calificar';
    const promedioP2 = calificacion_parcial_2 ? `${calificacion_parcial_2.toFixed(2)}` : 'Sin calificar';
    const promedioP3 = calificacion_parcial_3 ? `${calificacion_parcial_3.toFixed(2)}` : 'Sin calificar';

    const htmlNotificacion = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 5px 0;">Notificación de ${tipo === 'crear' ? 'Nueva' : 'Actualización de'} Calificación</h2>
          <p style="margin: 0; opacity: 0.9;">Sistema de Gestión - EPO 316</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #667eea; border-radius: 4px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 16px;">
            Se ha <strong>${tipo === 'crear' ? 'registrado una nueva' : 'actualizado una'}</strong> calificación en el sistema.
          </p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 0;">Detalles de la Calificación</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">Estudiante:</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${estudiante_nombre}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">Materia:</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${materia}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">Grado/Grupo:</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${grado}° - Grupo ${grupo}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">Docente:</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${profesor_nombre}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 0;">Calificaciones por Parcial</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #667eea; color: white;">
                <th style="padding: 10px; text-align: left; border: 1px solid #667eea;">Parcial</th>
                <th style="padding: 10px; text-align: center; border: 1px solid #667eea;">Calificación</th>
                <th style="padding: 10px; text-align: center; border: 1px solid #667eea;">Inasistencias</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; background: #f5f5f5; border: 1px solid #ddd;">Parcial 1</td>
                <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${promedioP1}</td>
                <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${inasistencias_parcial_1 || 0}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f5f5f5; border: 1px solid #ddd;">Parcial 2</td>
                <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${promedioP2}</td>
                <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${inasistencias_parcial_2 || 0}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f5f5f5; border: 1px solid #ddd;">Parcial 3</td>
                <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${promedioP3}</td>
                <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${inasistencias_parcial_3 || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: #e8f4f8; padding: 15px; border-radius: 4px; border-left: 4px solid #00bcd4;">
          <p style="margin: 0; color: #00695c;"><strong>Nota:</strong> Esta es una notificación automática del sistema.</p>
        </div>

        <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px; color: #999; font-size: 12px;">
          <p style="margin: 5px 0;">Fecha: ${new Date().toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}</p>
        </div>
      </div>
    `;

    const mensajeAccion = tipo === 'crear' ? 'registrada' : 'actualizada';
    const asunto = `[CALIFICACIONES] ${estudiante_nombre} - ${materia} (${mensajeAccion})`;

    // Enviar a todos
    let enviados = 0;
    for (const correo of correosSuperiores) {
      try {
        await sendEmail(correo, asunto, htmlNotificacion);
        enviados++;
      } catch (error) {
        console.error(`[Grades] Error enviando a ${correo}:`, error);
      }
    }

    console.log('[Grades] Notificaciones enviadas:', {
      estudiante: estudiante_nombre,
      materia,
      tipo,
      enviados,
    });

    return { success: true, notificados: enviados };
  } catch (error: any) {
    console.error('[Grades] Error en notifyGradesChange:', error);
    return { success: false, notificados: 0, error: error.message };
  }
}
