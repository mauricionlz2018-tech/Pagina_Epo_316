'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, Newspaper, BarChart3, UserCheck, FileText, GraduationCap, Settings, Shield, TrendingUp } from 'lucide-react';

export default function DirectorPanel() {
  const [stats, setStats] = useState({
    estudiantes: 0,
    profesores: 0,
    calificaciones: 0,
    noticias: 0,
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
        noticias: dataNot.noticias?.length || 0,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Gestión de Estudiantes',
      description: 'Administrar estudiantes y matrículas',
      icon: Users,
      href: '/admin/estudiantes',
      color: 'from-blue-500 to-blue-600',
      count: stats.estudiantes,
    },
    {
      title: 'Personal Docente',
      description: 'Gestionar profesores y personal',
      icon: UserCheck,
      href: '/admin/profesores',
      color: 'from-green-500 to-green-600',
      count: stats.profesores,
    },
    {
      title: 'Sistema de Calificaciones',
      description: 'Supervisar evaluaciones y notas',
      icon: BookOpen,
      href: '/admin/calificaciones',
      color: 'from-purple-500 to-purple-600',
      count: stats.calificaciones,
    },
    {
      title: 'Comunicaciones',
      description: 'Gestionar noticias y anuncios',
      icon: Newspaper,
      href: '/admin/noticias',
      color: 'from-orange-500 to-orange-600',
      count: stats.noticias,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Panel del Director</h1>
        <p className="text-red-100">Liderazgo administrativo y supervisión institucional</p>
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

      {/* Administrative Actions */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Acciones Directivas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg text-white flex-shrink-0">
                <Shield size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg">Políticas Institucionales</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">Establecer normas y procedimientos</p>
                <div className="text-red-600 font-semibold text-xs md:text-sm mt-3">Gestionar →</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white flex-shrink-0">
                <TrendingUp size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg">Reportes Ejecutivos</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">Análisis de rendimiento institucional</p>
                <div className="text-blue-600 font-semibold text-xs md:text-sm mt-3">Revisar →</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white flex-shrink-0">
                <Settings size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg">Configuración del Sistema</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">Administrar parámetros del sistema</p>
                <div className="text-green-600 font-semibold text-xs md:text-sm mt-3">Configurar →</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <h3 className="font-bold text-lg mb-3">Indicadores Institucionales</h3>
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
            <p className="text-gray-600 text-sm">Comunicaciones Activas</p>
            <p className="text-3xl font-bold text-orange-600">{loading ? '-' : stats.noticias}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
