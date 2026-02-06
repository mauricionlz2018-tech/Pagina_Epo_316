import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="animate-slide-up delay-100">
            <h3 className="font-bold text-lg mb-4">EPO 316</h3>
            <p className="text-sm opacity-90">
              Escuela Preparatoria Oficial Núm. 316 comprometida con la educación integral y la excelencia académica del Estado de México.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-up delay-200">
            <h3 className="font-bold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline hover:scale-105 transition-smooth">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline hover:scale-105 transition-smooth">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:underline hover:scale-105 transition-smooth">
                  Academico
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:underline hover:scale-105 transition-smooth">
                  Noticias
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-slide-up delay-300">
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 items-start">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Estado de México</span>
              </div>
              <div className="flex gap-2 items-start">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span>+52 (555) 123-4567</span>
              </div>
              <div className="flex gap-2 items-start">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <span>info@epo316.edu.mx</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary pt-8 animate-fade-in delay-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>&copy; 2026 Escuela Preparatoria Oficial Núm 316. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:underline hover:scale-105 transition-smooth">
                Privacidad
              </Link>
              <Link href="#" className="hover:underline hover:scale-105 transition-smooth">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
