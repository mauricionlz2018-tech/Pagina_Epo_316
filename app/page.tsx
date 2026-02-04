'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                Juntos reconstruimos nuestra sociedad
              </h1>
              <p className="text-lg md:text-xl opacity-95 text-balance">
                En la Escuela Preparatoria Oficial Núm. 316 formamos estudiantes con excelencia académica, valores humanistas y visión de futuro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/academics"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Conocer Programas <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  Contactanos
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm md:max-w-md">
                <div className="absolute inset-0 bg-white/10 rounded-2xl transform rotate-3 blur-2xl"></div>
                <div className="relative bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 overflow-hidden">
                  <img
                    src="/Secretaria_Escolar/Inicio_3.jpg"
                    alt="Escuela Preparatoria Oficial 316"
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              ¿Por qué elegir la EPO 316?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestras fortalezas y compromisos con la excelencia educativa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Educación Académica</h3>
              <p className="text-muted-foreground">
                Programas curriculares modernos y actualizados que preparan a nuestros estudiantes para la educación superior y el mundo laboral.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Comunidad Unida</h3>
              <p className="text-muted-foreground">
                Ambiente inclusivo y seguro donde alumnos, maestros y padres trabajan juntos para el desarrollo integral de cada estudiante.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Reconocimiento</h3>
              <p className="text-muted-foreground">
                Logros académicos destacados, becas estudiantiles y participación activa en competencias estatales y nacionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            ¿Interesado en Estudiar con Nosotros?
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Conoce nuestros programas académicos, requisitos de admisión y próximas sesiones de información.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Solicitar Información <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
