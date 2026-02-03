'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';

export default function EstadisticasPage() {
  const [stats, setStats] = useState({
    estudiantes: 450,
    profesores: 30,
    promedio: 8.3,
    asistencia: 92,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      // TODO: Implementar API para estadísticas
      setTimeout(() => setLoading(false), 1000);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Estadísticas Institucionales</h1>
        <p className="text-blue-100">Análisis de rendimiento escolar</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Estudiantes Matriculados</p>
              <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.estudiantes}</p>
            </div>
            <Users size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Personal Docente</p>
              <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.profesores}</p>
            </div>
            <BookOpen size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Promedio General</p>
              <p className="text-3xl font-bold mt-2">{loading ? '-' : stats.promedio}</p>
            </div>
            <TrendingUp size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Asistencia Promedio</p>
              <p className="text-3xl font-bold mt-2">{loading ? '-' : `${stats.asistencia}%`}</p>
            </div>
            <BarChart3 size={40} opacity={0.8} />
          </div>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Gráficos de Rendimiento</h2>
        <div className="text-center py-12 text-gray-500">
          <BarChart3 size={64} className="mx-auto mb-4 opacity-50" />
          <p>Gráficos interactivos próximamente</p>
        </div>
      </Card>
    </div>
  );
}
