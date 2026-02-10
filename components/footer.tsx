import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-950 dark:to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4 animate-slide-up delay-100">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl hover:text-cyan-400 transition-colors">
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
            <p className="text-gray-300 text-sm leading-relaxed">
              Escuela Preparatoria Oficial Núm. 316: Formando líderes con excelencia académica, valores humanistas y visión de futuro.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-blue-400 hover:bg-blue-300 flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-pink-600 hover:bg-pink-500 flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-blue-700 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-up delay-200">
            <h3 className="font-bold text-lg mb-6 text-cyan-300">Navegación</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span> Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span> Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span> Académico
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span> Noticias
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-slide-up delay-300">
            <h3 className="font-bold text-lg mb-6 text-cyan-300">Servicios</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/orientacion" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span> Orientación
                </Link>
              </li>
              <li>
                <Link href="/secretaria" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span> Secretaría Escolar
                </Link>
              </li>
              <li>
                <Link href="/infraestructura" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span> Infraestructura
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span> Biblioteca Digital
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-slide-up delay-400">
            <h3 className="font-bold text-lg mb-6 text-cyan-300">Contacto</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex gap-3 items-start group cursor-pointer hover:text-cyan-400 transition-colors">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Ubicación</p>
                  <p className="text-sm">Estado de México</p>
                </div>
              </div>
              <div className="flex gap-3 items-start group cursor-pointer hover:text-cyan-400 transition-colors">
                <Phone size={18} className="mt-1 flex-shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Teléfono</p>
                  <p className="text-sm">+52 5574156828</p>
                </div>
              </div>
              <div className="flex gap-3 items-start group cursor-pointer hover:text-cyan-400 transition-colors">
                <Mail size={18} className="mt-1 flex-shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Correo</p>
                  <p className="text-sm">info@epo316.gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 animate-fade-in delay-500">
          <p>&copy; 2026 Escuela Preparatoria Oficial Núm. 316. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-cyan-400 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">
              Términos de Uso
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">
              Mapa del Sitio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
