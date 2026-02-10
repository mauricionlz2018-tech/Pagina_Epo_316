'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, Newspaper, BarChart3, UserCheck, FileText, GraduationCap, Settings, TrendingUp } from 'lucide-react';

export default function AdminPanel() {
  const [stats, setStats] = useState({
    estudiantes: 0,
    calificaciones: 0,
    noticias: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('user_role') || '';
    setUserRole(role);
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const [resEst, resCal, resNot] = await Promise.all([
        fetch('/api/admin/estudiantes'),
        fetch('/api/admin/calificaciones'),
        fetch('/api/admin/noticias'),
      ]);

      const dataEst = await resEst.json();
      const dataCal = await resCal.json();
      const dataNot = await resNot.json();

      setStats({
        estudiantes: dataEst.estudiantes?.length || 0,
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
      title: 'Estudiantes',
      description: 'Agregar y gestionar estudiantes',
      icon: Users,
      href: '/admin/estudiantes',
      color: 'from-blue-500 to-blue-600',
      count: stats.estudiantes,
    },
    {
      title: 'Calificaciones',
      description: 'Registrar calificaciones',
      icon: BookOpen,
      href: '/admin/calificaciones',
      color: 'from-green-500 to-green-600',
      count: stats.calificaciones,
    },
    {
      title: 'Noticias',
      description: 'Crear y publicar noticias',
      icon: Newspaper,
      href: '/admin/noticias',
      color: 'from-purple-500 to-purple-600',
      count: stats.noticias,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item, idx) => (
          <Link key={idx} href={item.href}>
            <Card className={`p-6 bg-linear-to-br ${item.color} text-white rounded-xl cursor-pointer hover:shadow-lg transition`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{item.title}</p>
                  <p className="text-4xl font-bold mt-2">{loading ? '-' : item.count}</p>
                </div>
                <item.icon size={40} opacity={0.8} />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {menuItems.map((item, idx) => (
            <Link key={idx} href={item.href}>
              <Card className="p-4 md:p-6 hover:shadow-lg transition cursor-pointer h-full">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 bg-linear-to-br ${item.color} rounded-lg text-white shrink-0`}>
                    <item.icon size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base md:text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm mt-1">{item.description}</p>
                    <div className="text-blue-600 font-semibold text-xs md:text-sm mt-3">Abrir →</div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-linear-to-r from-gray-50 to-gray-100 border-gray-200">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><TrendingUp size={20} /> Resumen General</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Estudiantes Activos</p>
            <p className="text-3xl font-bold text-blue-600">{loading ? '-' : stats.estudiantes}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Registros de Calificaciones</p>
            <p className="text-3xl font-bold text-green-600">{loading ? '-' : stats.calificaciones}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Noticias Publicadas</p>
            <p className="text-3xl font-bold text-purple-600">{loading ? '-' : stats.noticias}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

