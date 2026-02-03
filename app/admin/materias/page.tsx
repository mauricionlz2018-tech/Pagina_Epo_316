'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Users, Calendar, Award } from 'lucide-react';

export default function MateriasPage() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    try {
      // TODO: Implementar API para materias
      setMaterias([
        { id: 1, nombre: 'Matemáticas', grado: '1ro', grupo: 'A', estudiantes: 25 },
        { id: 2, nombre: 'Español', grado: '2do', grupo: 'B', estudiantes: 22 },
        { id: 3, nombre: 'Historia', grado: '3ro', grupo: 'A', estudiantes: 28 },
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Materias Asignadas</h1>
        <p className="text-blue-100">Gestión de cursos y asignaturas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Materias Activas</p>
              <p className="text-3xl font-bold mt-2">{materias.length}</p>
            </div>
            <BookOpen size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Estudiantes Totales</p>
              <p className="text-3xl font-bold mt-2">{materias.reduce((acc, m) => acc + m.estudiantes, 0)}</p>
            </div>
            <Users size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Grupos</p>
              <p className="text-3xl font-bold mt-2">{new Set(materias.map(m => m.grupo)).size}</p>
            </div>
            <Calendar size={40} opacity={0.8} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Evaluaciones</p>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <Award size={40} opacity={0.8} />
          </div>
        </Card>
      </div>

      {/* Materias List */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Mis Materias</h2>
        <div className="space-y-4">
          {materias.map((materia) => (
            <div key={materia.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <h3 className="font-semibold">{materia.nombre}</h3>
                <p className="text-sm text-gray-600">{materia.grado} {materia.grupo} - {materia.estudiantes} estudiantes</p>
              </div>
              <div className="text-right">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
