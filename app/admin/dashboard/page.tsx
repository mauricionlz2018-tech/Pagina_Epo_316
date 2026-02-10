'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LogOut,
  Users,
  BookOpen,
  AlertCircle,
  BarChart3,
  Menu,
  X,
} from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  totalClasses: number;
  totalAnnouncements: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalClasses: 0,
    totalAnnouncements: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);

    // Fetch stats
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('[v0] Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    {
      label: 'Estudiantes',
      href: '/admin/students',
      icon: Users,
    },
    {
      label: 'Calificaciones',
      href: '/admin/grades',
      icon: BarChart3,
    },
    {
      label: 'Noticias',
      href: '/admin/announcements',
      icon: AlertCircle,
    },
    {
      label: 'Programas',
      href: '/admin/programs',
      icon: BookOpen,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 dark:bg-gray-800 text-white transition-all duration-300 fixed h-full z-40 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && <span className="font-bold text-lg">EPO 316</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                title={item.label}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 overflow-auto transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel Administrativo</h1>
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold">
              Ver sitio público
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Cargando datos...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Students Stat */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total de Estudiantes</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalStudents}</p>
                    </div>
                    <Users className="text-blue-600/20 dark:text-blue-400/20" size={40} />
                  </div>
                </div>

                {/* Classes Stat */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Clases/Grupos</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalClasses}</p>
                    </div>
                    <BookOpen className="text-blue-600/20 dark:text-blue-400/20" size={40} />
                  </div>
                </div>

                {/* Announcements Stat */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Noticias Activas</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalAnnouncements}</p>
                    </div>
                    <AlertCircle className="text-blue-600/20 dark:text-blue-400/20" size={40} />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/admin/students/add"
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    <Users className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
                    <p className="font-semibold text-gray-900 dark:text-white">Agregar Estudiante</p>
                  </Link>
                  <Link
                    href="/admin/announcements/add"
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    <AlertCircle className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
                    <p className="font-semibold text-gray-900 dark:text-white">Nueva Noticia</p>
                  </Link>
                  <Link
                    href="/admin/grades"
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    <BarChart3 className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
                    <p className="font-semibold text-gray-900 dark:text-white">Gestionar Calificaciones</p>
                  </Link>
                  <Link
                    href="/admin/programs"
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    <BookOpen className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
                    <p className="font-semibold text-gray-900 dark:text-white">Programas Académicos</p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
