'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Users, BookOpen, Newspaper, Home, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verificar si hay token
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token && pathname !== '/admin/login' && pathname !== '/admin/acceso') {
        router.push('/admin/acceso');
      }
    }

    // Detectar si es móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Panel', href: '/admin/panel', icon: Home },
    { label: 'Estudiantes', href: '/admin/estudiantes', icon: Users },
    { label: 'Calificaciones', href: '/admin/calificaciones', icon: BookOpen },
    { label: 'Noticias', href: '/admin/noticias', icon: Newspaper },
  ];

  // No mostrar sidebar en login
  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 flex flex-col fixed h-screen md:relative z-40`}
      >
        {/* Header del Sidebar */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between gap-3">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/logo_epo.jpg"
                  alt="EPO 316"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold">EPO 316</h2>
            </div>
          )}
          {!sidebarOpen && (
            <div className="w-8 h-8 relative">
              <Image
                src="/logo_epo.jpg"
                alt="EPO 316"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition w-full"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Salir</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {navItems.find((item) => item.href === pathname)?.label || 'Panel'}
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-200 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
