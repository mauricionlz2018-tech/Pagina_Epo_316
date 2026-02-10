'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { FileText, TrendingUp, Users, BarChart3 } from 'lucide-react';

interface Reporte {
  id: number;
  titulo: string;
  tipo: string;
  fecha: string;
  estado: string;
}

export default function ReportesPage() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    try {
      // TODO: Implementar API para reportes
      setReportes([
        { id: 1, titulo: 'Reporte de Rendimiento Académico', tipo: 'Académico', fecha: '2024-01-15', estado: 'Generado' },
        { id: 2, titulo: 'Análisis de Casos de Orientación', tipo: 'Orientación', fecha: '2024-01-10', estado: 'En revisión' },
        { id: 3, titulo: 'Estadísticas de Asistencia', tipo: 'Asistencia', fecha: '2024-01-05', estado: 'Pendiente' },
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
      <div className="bg-linear-to-r from-green-600 to-green-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Reportes de Rendimiento</h1>
        <p className="text-green-100">Análisis y reportes detallados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-linear-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Reportes Totales</p>
              <p className="text-3xl font-bold mt-2">{reportes.length}</p>
            </div>
            <FileText size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Generados</p>
              <p className="text-3xl font-bold mt-2">{reportes.filter(r => r.estado === 'Generado').length}</p>
            </div>
            <TrendingUp size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Estudiantes Analizados</p>
              <p className="text-3xl font-bold mt-2">150</p>
            </div>
            <Users size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Tendencias Identificadas</p>
              <p className="text-3xl font-bold mt-2">8</p>
            </div>
            <BarChart3 size={40} opacity={0.8} />
          </div>
        </Card>
      </div>

      {/* Reportes List */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Reportes Disponibles</h2>
        <div className="space-y-4">
          {reportes.map((reporte) => (
            <div key={reporte.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <h3 className="font-semibold">{reporte.titulo}</h3>
                <p className="text-sm text-gray-600">Tipo: {reporte.tipo} - Generado: {reporte.fecha}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  reporte.estado === 'Generado' ? 'bg-green-100 text-green-800' :
                  reporte.estado === 'En revisión' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {reporte.estado}
                </span>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Ver Reporte
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

