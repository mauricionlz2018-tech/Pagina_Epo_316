'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    { label: 'Inicio', href: '/' },
    {
      label: 'Institución',
      href: '#',
      submenu: [
        { label: 'Acerca de Nosotros', href: '/about?section=mision' },
        { label: 'Infraestructura', href: '/infraestructura' },
        { label: 'Noticias', href: '/news' },
      ],
    },
    {
      label: 'Académico',
      href: '#',
      submenu: [
        { label: 'Programas Académicos', href: '/academics?section=colegio' },
        { label: 'Plan de Trabajo', href: '/academics#plan' },
        { label: 'PAEC', href: '/academics#paec' },
        { label: 'Requisitos de Admisión', href: '/academics#requisitos' },
      ],
    },
    {
      label: 'Servicios',
      href: '#',
      submenu: [
        { label: 'Secretaría Escolar', href: '/secretaria' },
        { label: 'Orientación', href: '/orientacion' },
        { label: 'Biblioteca Digital', href: '/orientacion?section=biblioteca' },
        { label: 'Alerta Amber', href: '/alerta-amber' },
      ],
    },
    { label: 'Contacto', href: '/contact' },
    { label: 'Ubicación', href: '/location' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo_epo.jpg"
                alt="EPO 316"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <span>EPO 316</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1">
            {menuItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={16} />}
                </Link>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors first:rounded-t last:rounded-b"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex gap-3">
            <Link
              href="/admin/login"
              className="px-4 py-2 rounded bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {menuItems.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="block flex-1 px-3 py-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                      className="px-3 py-2"
                    >
                      <ChevronDown size={16} className={openSubmenu === item.label ? 'rotate-180' : ''} />
                    </button>
                  )}
                </div>
                
                {/* Mobile Submenu */}
                {item.submenu && openSubmenu === item.label && (
                  <div className="pl-4 bg-gray-50">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-3 py-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/admin/login"
              className="block px-4 py-2 mt-2 rounded bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
