'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, Newspaper, BarChart3, UserCheck, FileText, GraduationCap, Settings, Shield, TrendingUp, FileCheck } from 'lucide-react';

export default function SubdirectoraPanel() {
  const [stats, setStats] = useState({
    estudiantes: 0,
    profesores: 0,
    calificaciones: 0,
    documentos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const [resEst, resProf, resCal, resNot] = await Promise.all([
        fetch('/api/admin/estudiantes'),
        fetch('/api/admin/profesores'),
        fetch('/api/admin/calificaciones'),
        fetch('/api/admin/noticias'),
      ]);

      const dataEst = await resEst.json();
      const dataProf = await resProf.json();
      const dataCal = await resCal.json();
      const dataNot = await resNot.json();

      setStats({
        estudiantes: dataEst.estudiantes?.length || 0,
        profesores: dataProf.profesores?.length || 0,
        calificaciones: dataCal.calificaciones?.length || 0,
        documentos: dataNot.noticias?.length || 0,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Gestión Académica',
      description: 'Supervisar procesos académicos',
      icon: GraduationCap,
      href: '/admin/calificaciones',
      color: 'from-blue-500 to-blue-600',
      count: stats.calificaciones,
    },
    {
      title: 'Recursos Humanos',
      description: 'Gestionar personal docente',
      icon: UserCheck,
      href: '/admin/profesores',
      color: 'from-green-500 to-green-600',
      count: stats.profesores,
    },
    {
      title: 'Estadísticas Institucionales',
      description: 'Análisis de rendimiento escolar',
      icon: BarChart3,
      href: '/admin/estadisticas',
      color: 'from-purple-500 to-purple-600',
      count: stats.estudiantes,
    },
    {
      title: 'Reportes Administrativos',
      description: 'Generar reportes ejecutivos',
      icon: FileCheck,
      href: '/admin/subdirectora/reportes',
      color: 'from-orange-500 to-orange-600',
      count: stats.documentos,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Panel de la Subdirectora</h1>
        <p className="text-indigo-100">Gestión administrativa y supervisión académica</p>
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

      {/* Administrative Actions */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Acciones Administrativas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <button onClick={() => window.location.href = '/admin/profesores'} className="w-full">
            <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg text-white shrink-0">
                  <Shield size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg">Políticas Institucionales</h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">Revisar y actualizar normativas</p>
                  <div className="text-blue-600 font-semibold text-xs md:text-sm mt-3">Gestionar</div>
                </div>
              </div>
            </Card>
          </button>

          <button onClick={() => window.location.href = '/admin/estadisticas'} className="w-full">
            <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-linear-to-br from-green-500 to-green-600 rounded-lg text-white shrink-0">
                  <TrendingUp size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg">Evaluación de Desempeño</h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">Monitorear indicadores clave</p>
                  <div className="text-green-600 font-semibold text-xs md:text-sm mt-3">Analizar</div>
                </div>
              </div>
            </Card>
          </button>

          <button onClick={() => window.location.href = '/admin/subdirectora/reportes'} className="w-full">
            <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg text-white shrink-0">
                  <FileText size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg">Reportes Ejecutivos</h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">Generar informes estratégicos</p>
                  <div className="text-purple-600 font-semibold text-xs md:text-sm mt-3">Crear</div>
                </div>
              </div>
            </Card>
          </button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-linear-to-r from-gray-50 to-gray-100 border-gray-200">
        <h3 className="font-bold text-lg mb-3">Indicadores Administrativos</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Estudiantes Matriculados</p>
            <p className="text-3xl font-bold text-blue-600">{loading ? '-' : stats.estudiantes}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Personal Docente</p>
            <p className="text-3xl font-bold text-green-600">{loading ? '-' : stats.profesores}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Registros Académicos</p>
            <p className="text-3xl font-bold text-purple-600">{loading ? '-' : stats.calificaciones}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Documentos Procesados</p>
            <p className="text-3xl font-bold text-orange-600">{loading ? '-' : stats.documentos}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

