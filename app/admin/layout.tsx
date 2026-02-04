'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin-header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem('user_role') || '';
    setUserRole(role);
  }, []);

  // Si estamos en la página de login, NO mostrar el navbar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      {mounted && <AdminHeader userRole={userRole} />}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        {children}
      </main>
    </div>
  );
}