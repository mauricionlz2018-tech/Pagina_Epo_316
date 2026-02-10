'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Users, AlertTriangle, TrendingUp } from 'lucide-react';

interface CasoOrientacion {
  id: number;
  estudiante: string;
  tipo: string;
  prioridad: string;
  estado: string;
}

export default function OrientacionPage() {
  const [casos, setCasos] = useState<CasoOrientacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCasos();
  }, []);

  const cargarCasos = async () => {
    try {
      // TODO: Implementar API para casos de orientación
      setCasos([
        { id: 1, estudiante: 'Juan Pérez', tipo: 'Académico', prioridad: 'Alta', estado: 'En seguimiento' },
        { id: 2, estudiante: 'María García', tipo: 'Personal', prioridad: 'Media', estado: 'Resuelto' },
        { id: 3, estudiante: 'Carlos López', tipo: 'Social', prioridad: 'Baja', estado: 'Nuevo' },
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
      <div className="bg-linear-to-r from-purple-600 to-purple-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Orientación Educativa</h1>
        <p className="text-purple-100">Apoyo y seguimiento estudiantil</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-linear-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Casos Activos</p>
              <p className="text-3xl font-bold mt-2">{casos.filter(c => c.estado !== 'Resuelto').length}</p>
            </div>
            <Heart size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Prioridad Alta</p>
              <p className="text-3xl font-bold mt-2">{casos.filter(c => c.prioridad === 'Alta').length}</p>
            </div>
            <AlertTriangle size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Estudiantes Asesorados</p>
              <p className="text-3xl font-bold mt-2">{new Set(casos.map(c => c.estudiante)).size}</p>
            </div>
            <Users size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-linear-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Casos Resueltos</p>
              <p className="text-3xl font-bold mt-2">{casos.filter(c => c.estado === 'Resuelto').length}</p>
            </div>
            <TrendingUp size={40} opacity={0.8} />
          </div>
        </Card>
      </div>

      {/* Casos List */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Casos de Orientación</h2>
        <div className="space-y-4">
          {casos.map((caso) => (
            <div key={caso.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <h3 className="font-semibold">{caso.estudiante}</h3>
                <p className="text-sm text-gray-600">Tipo: {caso.tipo} - Prioridad: {caso.prioridad}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  caso.estado === 'Resuelto' ? 'bg-green-100 text-green-800' :
                  caso.estado === 'En seguimiento' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {caso.estado}
                </span>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

