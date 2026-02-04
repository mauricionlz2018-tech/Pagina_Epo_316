'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, Newspaper, BarChart3, UserCheck, FileText, GraduationCap, Settings, ClipboardList, Award, Target } from 'lucide-react';

export default function DocentePanel() {
  const [stats, setStats] = useState({
    estudiantes: 0,
    calificaciones: 0,
    materias: 0,
    evaluaciones: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const [resEst, resCal] = await Promise.all([
        fetch('/api/admin/estudiantes'),
        fetch('/api/admin/calificaciones'),
      ]);

      const dataEst = await resEst.json();
      const dataCal = await resCal.json();

      setStats({
        estudiantes: dataEst.estudiantes?.length || 0,
        calificaciones: dataCal.calificaciones?.length || 0,
        materias: 5, // TODO: Implementar materias asignadas
        evaluaciones: 0, // TODO: Implementar evaluaciones
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Mis Calificaciones',
      description: 'Ingresar notas y evaluaciones',
      icon: BookOpen,
      href: '/admin/docente/calificaciones',
      color: 'from-green-500 to-green-600',
      count: stats.calificaciones,
    },
    {
      title: 'Materias Asignadas',
      description: 'Ver cursos a cargo',
      icon: GraduationCap,
      href: '/admin/materias',
      color: 'from-purple-500 to-purple-600',
      count: stats.materias,
    },
    {
      title: 'Evaluaciones',
      description: 'Crear y gestionar exámenes',
      icon: Target,
      href: '/admin/evaluaciones',
      color: 'from-orange-500 to-orange-600',
      count: stats.evaluaciones,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Panel del Docente</h1>
        <p className="text-emerald-100">Gestión académica y evaluación estudiantil</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {menuItems.map((item, idx) => (
          <Link key={idx} href={item.href}>
            <Card className={`p-6 bg-gradient-to-br ${item.color} text-white rounded-xl cursor-pointer hover:shadow-lg transition`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{item.title}</p>
                  <p className="text-3xl font-bold mt-2">{loading ? '-' : item.count}</p>
                </div>
                <item.icon size={40} opacity={0.8} />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Teaching Actions */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Acciones Docentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white flex-shrink-0">
                <ClipboardList size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg">Planificación de Clases</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">Organizar contenido semanal</p>
                <div className="text-blue-600 font-semibold text-xs md:text-sm mt-3">Planificar →</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white flex-shrink-0">
                <Award size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg">Retroalimentación</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">Comentarios y correcciones</p>
                <div className="text-green-600 font-semibold text-xs md:text-sm mt-3">Revisar →</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white flex-shrink-0">
                <BarChart3 size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg">Análisis de Rendimiento</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">Evaluar progreso grupal</p>
                <div className="text-purple-600 font-semibold text-xs md:text-sm mt-3">Analizar →</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <h3 className="font-bold text-lg mb-3">Indicadores Académicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Estudiantes a Cargo</p>
            <p className="text-3xl font-bold text-blue-600">{loading ? '-' : stats.estudiantes}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Calificaciones Registradas</p>
            <p className="text-3xl font-bold text-green-600">{loading ? '-' : stats.calificaciones}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Materias Impartidas</p>
            <p className="text-3xl font-bold text-purple-600">{loading ? '-' : stats.materias}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Evaluaciones Creadas</p>
            <p className="text-3xl font-bold text-orange-600">{loading ? '-' : stats.evaluaciones}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
