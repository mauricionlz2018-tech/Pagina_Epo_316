'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, Newspaper, BarChart3, UserCheck, FileText, GraduationCap, Settings, Heart, TrendingUp, AlertTriangle } from 'lucide-react';

export default function OrientadorPanel() {
  const [stats, setStats] = useState({
    estudiantes: 0,
    calificaciones: 0,
    casos: 0,
    reportes: 0,
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
        casos: 0, // TODO: Implementar casos de orientación
        reportes: 0, // TODO: Implementar reportes
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Seguimiento Estudiantil',
      description: 'Monitorear rendimiento académico',
      icon: TrendingUp,
      href: '/admin/estudiantes',
      color: 'from-blue-500 to-blue-600',
      count: stats.estudiantes,
    },
    {
      title: 'Análisis de Calificaciones',
      description: 'Revisar tendencias y patrones',
      icon: BarChart3,
      href: '/admin/calificaciones',
      color: 'from-green-500 to-green-600',
      count: stats.calificaciones,
    },
    {
      title: 'Casos de Orientación',
      description: 'Gestionar casos individuales',
      icon: Heart,
      href: '/admin/orientador/casos',
      color: 'from-purple-500 to-purple-600',
      count: stats.casos,
    },
    {
      title: 'Reportes de Rendimiento',
      description: 'Generar reportes detallados',
      icon: FileText,
      href: '/admin/reportes',
      color: 'from-orange-500 to-orange-600',
      count: stats.reportes,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-purple-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Panel del Orientador</h1>
        <p className="text-purple-100">Apoyo educativo y orientación estudiantil</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {menuItems.map((item, idx) => (
          <Link key={idx} href={item.href}>
            <Card className={`p-6 bg-linear-to-br ${item.color} text-white rounded-xl cursor-pointer hover:shadow-lg transition`}>
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Acciones de Orientación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <button onClick={() => window.location.href = '/admin/calificaciones'} className="w-full">
            <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-linear-to-br from-red-500 to-red-600 rounded-lg text-white shrink-0">
                  <AlertTriangle size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg">Alertas Académicas</h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">Estudiantes con bajo rendimiento</p>
                  <div className="text-red-600 font-semibold text-xs md:text-sm mt-3">Revisar</div>
                </div>
              </div>
            </Card>
          </button>

          <button onClick={() => window.location.href = '/admin/orientador/casos'} className="w-full">
            <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg text-white shrink-0">
                  <Users size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg">Entrevistas Individuales</h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">Programar sesiones de orientación</p>
                  <div className="text-blue-600 font-semibold text-xs md:text-sm mt-3">Agendar</div>
                </div>
              </div>
            </Card>
          </button>

          <button onClick={() => window.location.href = '/admin/orientador/casos'} className="w-full">
            <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-linear-to-br from-green-500 to-green-600 rounded-lg text-white shrink-0">
                  <TrendingUp size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg">Seguimiento de Progreso</h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">Monitorear mejora estudiantil</p>
                  <div className="text-green-600 font-semibold text-xs md:text-sm mt-3">Analizar</div>
                </div>
              </div>
            </Card>
          </button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-linear-to-r from-gray-50 to-gray-100 border-gray-200">
        <h3 className="font-bold text-lg mb-3">Indicadores de Orientación</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Estudiantes Asesorados</p>
            <p className="text-3xl font-bold text-blue-600">{loading ? '-' : stats.estudiantes}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Calificaciones Analizadas</p>
            <p className="text-3xl font-bold text-green-600">{loading ? '-' : stats.calificaciones}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Casos Activos</p>
            <p className="text-3xl font-bold text-purple-600">{loading ? '-' : stats.casos}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Reportes Generados</p>
            <p className="text-3xl font-bold text-orange-600">{loading ? '-' : stats.reportes}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

