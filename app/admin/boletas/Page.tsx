'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BoletaGenerator } from '@/components/boleta-generator';

interface Estudiante {
  id: number;
  nombre: string;
  numero_inscripcion: string;
  grado: string;
  grupo: string;
  estado_inscripcion: string;
}

interface CalificacionDB {
  id: number;
  estudiante_id: number;
  materia: string;
  calificacion: number;
  semestre: number;
  ciclo_escolar: string;
}

export default function BoletasPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [calificaciones, setCalificaciones] = useState<CalificacionDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroGrado, setFiltroGrado] = useState<string>('');
  const [boletaEstudianteId, setBoletaEstudianteId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');
      const [resEst, resCal] = await Promise.all([
        fetch('/api/admin/estudiantes'),
        fetch('/api/admin/calificaciones'),
      ]);

      if (!resEst.ok || !resCal.ok) {
        throw new Error('Error al cargar datos');
      }

      const dataEst = await resEst.json();
      const dataCal = await resCal.json();

      setEstudiantes(dataEst.estudiantes || []);
      setCalificaciones(dataCal.calificaciones || []);
    } catch (error: any) {
      setError(`Error al cargar datos: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generarDatosBoletaParaEstudiante = (estudianteId: number) => {
    const estudiante = estudiantes.find(e => e.id === estudianteId);
    if (!estudiante) return null;

    const calificacionesEstudiante = calificaciones.filter(c => c.estudiante_id === estudianteId);

    const materiasPorNombre: { [key: string]: any } = {};
    
    calificacionesEstudiante.forEach(cal => {
      if (!materiasPorNombre[cal.materia]) {
        materiasPorNombre[cal.materia] = {
          materia: cal.materia,
          calificacion_1: 0,
          calificacion_2: 0,
          calificacion_3: 0,
          inasistencias_1: 0,
          inasistencias_2: 0,
          inasistencias_3: 0,
        };
      }
      
      // CONVERTIR A NÚMERO para evitar errores
      const calificacionNum = parseFloat(String(cal.calificacion)) || 0;
      const semestreNum = parseInt(String(cal.semestre)) || 0;
      
      if (semestreNum === 1) {
        materiasPorNombre[cal.materia].calificacion_1 = calificacionNum;
      } else if (semestreNum === 2) {
        materiasPorNombre[cal.materia].calificacion_2 = calificacionNum;
      } else if (semestreNum === 3) {
        materiasPorNombre[cal.materia].calificacion_3 = calificacionNum;
      }
    });

    const materiasConCalificaciones = Object.values(materiasPorNombre);

    if (materiasConCalificaciones.length === 0) {
      const materiasPredeterminadas = [
        'TEMAS SELECTOS DE IGUALDAD',
        'PRACTICA Y COLABORACION CIUDADANA',
        'PROBABILIDAD Y ESTADÍSTICA',
        'INGLÉS',
        'PSICOLOGÍA',
        'ACTIVIDADES ARTÍSTICAS Y CULTURALES',
        'DERECHO Y SOCIEDAD',
        'LA ENERGÍA Y LOS PROCESOS DE LA VIDA',
        'SISTEMAS DE INFORMACIÓN',
        'PROGRAMACIÓN',
        'HABILIDADES SOCIOEMOCIONALES',
        'CONCIENCIA HISTÓRICA'
      ];

      materiasConCalificaciones.push(...materiasPredeterminadas.map(materia => ({
        materia,
        calificacion_1: 0,
        calificacion_2: 0,
        calificacion_3: 0,
        inasistencias_1: 0,
        inasistencias_2: 0,
        inasistencias_3: 0,
      })));
    }
    
    return {
      nombre_estudiante: estudiante.nombre,
      grado: estudiante.grado,
      grupo: estudiante.grupo || 'A',
      semestre: String(calificacionesEstudiante[0]?.semestre || '5'),
      ciclo_escolar: calificacionesEstudiante[0]?.ciclo_escolar || '2024-2025',
      calificaciones: materiasConCalificaciones,
    };
  };

  const estudiantesFiltrados = filtroGrado
    ? estudiantes.filter(est => est.grado === filtroGrado)
    : estudiantes;

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Gestión de Boletas</h1>
        <div className="p-8 text-center text-gray-500">Cargando estudiantes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Boletas</h1>
        <Button onClick={cargarDatos} className="bg-gray-600 hover:bg-gray-700">
          Actualizar
        </Button>
      </div>

      <Dialog open={!!boletaEstudianteId} onOpenChange={(open) => !open && setBoletaEstudianteId(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Boleta del Estudiante</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            {boletaEstudianteId && generarDatosBoletaParaEstudiante(boletaEstudianteId) && (
              <BoletaGenerator data={generarDatosBoletaParaEstudiante(boletaEstudianteId)!} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Card className="p-4 bg-white">
        <label className="block text-sm font-medium mb-2">Filtrar por Grado:</label>
        <select
          value={filtroGrado}
          onChange={(e) => setFiltroGrado(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todos los grados</option>
          <option value="1ro">1ro</option>
          <option value="2do">2do</option>
          <option value="3ro">3ro</option>
        </select>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Card className="overflow-hidden">
        {estudiantesFiltrados.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay estudiantes registrados
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                  <th className="px-4 py-3 text-left font-semibold">Inscripción</th>
                  <th className="px-4 py-3 text-left font-semibold">Grado</th>
                  <th className="px-4 py-3 text-left font-semibold">Grupo</th>
                  <th className="px-4 py-3 text-left font-semibold">Estado</th>
                  <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantesFiltrados.map((est) => (
                  <tr key={est.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium">{est.nombre}</td>
                    <td className="px-4 py-3 font-mono text-sm">{est.numero_inscripcion}</td>
                    <td className="px-4 py-3">{est.grado}</td>
                    <td className="px-4 py-3">{est.grupo}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          est.estado_inscripcion === 'activo'
                            ? 'bg-green-100 text-green-700'
                            : est.estado_inscripcion === 'inactivo'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {est.estado_inscripcion}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setBoletaEstudianteId(est.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                      >
                        📥 Generar Boleta
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
