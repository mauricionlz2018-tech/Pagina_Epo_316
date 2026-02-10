'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Target, Calendar, Users, CheckCircle } from 'lucide-react';

interface Evaluacion {
  id: number;
  titulo: string;
  materia: string;
  fecha: string;
  estudiantes: number;
  estado: string;
}

export default function EvaluacionesPage() {
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEvaluaciones();
  }, []);

  const cargarEvaluaciones = async () => {
    try {
      // TODO: Implementar API para evaluaciones
      setEvaluaciones([
        { id: 1, titulo: 'Examen Parcial Matemáticas', materia: 'Matemáticas', fecha: '2024-01-15', estudiantes: 25, estado: 'Pendiente' },
        { id: 2, titulo: 'Tarea Español', materia: 'Español', fecha: '2024-01-10', estudiantes: 22, estado: 'Calificada' },
        { id: 3, titulo: 'Proyecto Historia', materia: 'Historia', fecha: '2024-01-20', estudiantes: 28, estado: 'En revisión' },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 to-orange-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Evaluaciones</h1>
        <p className="text-orange-100">Gestión de exámenes y actividades evaluativas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-linear-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Evaluaciones Totales</p>
              <p className="text-3xl font-bold mt-2">{evaluaciones.length}</p>
            </div>
            <Target size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Pendientes</p>
              <p className="text-3xl font-bold mt-2">{evaluaciones.filter(e => e.estado === 'Pendiente').length}</p>
            </div>
            <Calendar size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Estudiantes Evaluados</p>
              <p className="text-3xl font-bold mt-2">{evaluaciones.reduce((acc, e) => acc + e.estudiantes, 0)}</p>
            </div>
            <Users size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Calificadas</p>
              <p className="text-3xl font-bold mt-2">{evaluaciones.filter(e => e.estado === 'Calificada').length}</p>
            </div>
            <CheckCircle size={40} opacity={0.8} />
          </div>
        </Card>
      </div>

      {/* Evaluaciones List */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Mis Evaluaciones</h2>
        <div className="space-y-4">
          {evaluaciones.map((evaluacion) => (
            <div key={evaluacion.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <h3 className="font-semibold">{evaluacion.titulo}</h3>
                <p className="text-sm text-gray-600">{evaluacion.materia} - {evaluacion.fecha} - {evaluacion.estudiantes} estudiantes</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  evaluacion.estado === 'Calificada' ? 'bg-green-100 text-green-800' :
                  evaluacion.estado === 'En revisión' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {evaluacion.estado}
                </span>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  Gestionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

