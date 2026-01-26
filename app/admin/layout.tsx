'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, GraduationCap, FileText, Megaphone, UserCircle, Sun, Moon, UserCheck, BarChart3, Calendar, Target, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem('user_role') || '';
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user_role');
    router.push('/admin/login');
  };

  // Si estamos en la página de login, NO mostrar el navbar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Role-specific navigation items
  const getNavItems = (role: string) => {
    const commonItems = [
      { href: `/admin/${role}`, label: 'Panel', icon: LayoutDashboard },
    ];

    switch (role) {
      case 'director':
        return [
          ...commonItems,
          { href: '/admin/profesores', label: 'Profesores', icon: UserCircle },
          { href: '/admin/estudiantes', label: 'Estudiantes', icon: Users },
          { href: '/admin/calificaciones', label: 'Calificaciones', icon: GraduationCap },
          { href: '/admin/estadisticas', label: 'Estadísticas', icon: BarChart3 },
        ];
      case 'subdirectora':
        return [
          ...commonItems,
          { href: '/admin/profesores', label: 'Profesores', icon: UserCircle },
          { href: '/admin/estudiantes', label: 'Estudiantes', icon: Users },
          { href: '/admin/calificaciones', label: 'Calificaciones', icon: GraduationCap },
          { href: '/admin/documentos', label: 'Documentos', icon: FileText },
        ];
      case 'secretaria':
        return [
          ...commonItems,
          { href: '/admin/estudiantes', label: 'Estudiantes', icon: Users },
          { href: '/admin/boletas', label: 'Boletas', icon: FileText },
          { href: '/admin/documentos', label: 'Documentos', icon: FileText },
          { href: '/admin/eventos', label: 'Eventos', icon: Calendar },
        ];
      case 'orientador':
        return [
          ...commonItems,
          { href: '/admin/estudiantes', label: 'Estudiantes', icon: Users },
          { href: '/admin/calificaciones', label: 'Calificaciones', icon: GraduationCap },
          { href: '/admin/reportes', label: 'Reportes', icon: FileText },
        ];
      case 'docente':
        return [
          ...commonItems,
          { href: '/admin/estudiantes', label: 'Estudiantes', icon: Users },
          { href: '/admin/calificaciones', label: 'Calificaciones', icon: GraduationCap },
          { href: '/admin/materias', label: 'Materias', icon: GraduationCap },
          { href: '/admin/evaluaciones', label: 'Evaluaciones', icon: Target },
        ];
      default:
        return [
          { href: '/admin/panel', label: 'Panel', icon: LayoutDashboard },
          { href: '/admin/estudiantes', label: 'Estudiantes', icon: Users },
          { href: '/admin/profesores', label: 'Profesores', icon: UserCircle },
          { href: '/admin/calificaciones', label: 'Calificaciones', icon: GraduationCap },
          { href: '/admin/noticias', label: 'Noticias', icon: Megaphone },
        ];
    }
  };

  const navItems = getNavItems(userRole);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 md:space-x-8 overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-2 md:px-1 pt-1 border-b-2 text-xs md:text-sm font-medium transition whitespace-nowrap ${
                      isActive
                        ? 'border-primary text-card-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                    }`}
                  >
                    <Icon size={16} className="mr-1 md:mr-2" />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                  </Link>
                );
              })}
            </div>
            {mounted && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={16} />
                </button>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        {children}
      </main>
    </div>
  );
}