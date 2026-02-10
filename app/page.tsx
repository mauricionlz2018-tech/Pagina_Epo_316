'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Users, Award, ArrowRight, GraduationCap, Lightbulb, Target, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /*const stats = [
    { number: '+10', label: 'Años de Excelencia' },
    { number: '200+', label: 'Estudiantes Formados' },
    { number: '95%', label: 'Tasa de Admisión' },
    { number: '100%', label: 'Egresados Activos' },
  ]; */

  const programs = [
    {
      title: 'Propedéutico',
      description: 'Programa preparatorio que te capacita para el nivel superior con excelencia académica.',
      icon: GraduationCap,
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Ciencias Exactas',
      description: 'Desarrolla habilidades científicas y matemáticas para la ingeniería y tecnología.',
      icon: Target,
      color: 'from-purple-600 to-purple-400',
    },
    {
      title: 'Humanidades',
      description: 'Cultiva tu pensamiento crítico en artes, ciencias sociales y comunicación.',
      icon: Lightbulb,
      color: 'from-emerald-600 to-emerald-400',
    },
  ];

  const features = [
    {
      title: 'Educación de Calidad',
      description: 'Docentes certificados y actualizados con metodologías modernas de enseñanza',
      icon: BookOpen,
    },
    {
      title: 'Comunidad Inclusiva',
      description: 'Ambiente seguro, diverso y acogedor para el desarrollo integral de cada estudiante',
      icon: Users,
    },
    {
      title: 'Logros Reconocidos',
      description: 'Participaciones destacadas en competencias estatales y nacionales',
      icon: Award,
    },
    {
      title: 'Infraestructura Moderna',
      description: 'Laboratorios, biblioteca digital y espacios diseñados para el aprendizaje',
      icon: Rocket,
    },
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Navigation />

      {/* Hero Section - Premium */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 z-10">
              <div className="inline-block">
                <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold border border-blue-400/30 backdrop-blur-sm animate-fade-in">
                  Bienvenido a EPO 316
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight animate-slide-in-left">
                  Juntos reconstruimos <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-pulse">nuestra sociedad</span>
                </h1>

              <p className="text-lg md:text-xl text-blue-50 text-balance leading-relaxed max-w-lg animate-slide-in-left delay-100">
                En la Escuela Preparatoria Oficial Núm. 316 formamos estudiantes con excelencia académica, valores humanistas y visión de futuro. Únete a nuestra comunidad educativa y construyamos juntos un mejor mañana.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-in-left delay-200">
                <Link
                  href="/academics"
                  className="group inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                >
                  Conocer programas 
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
                >
                  Solicitar información
                </Link>
                
              </div>
              <br />
            </div>

            {/* Right Image - Hero */}
            <div className="relative flex items-center justify-center lg:justify-end animate-slide-in-right h-80 md:h-96">
              <div className="relative w-full max-w-sm md:max-w-md">
                {/* Floating elements behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/20 rounded-3xl blur-2xl transform -rotate-6"></div>
                
                {/* Main image container */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/Inicio_2.jpg"
                    alt="Escuela Preparatoria Oficial 316"
                    width={500}
                    height={400}
                    className="w-full h-auto object-cover rounded-3xl"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Programas Académicos */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-slide-up">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold border border-blue-500/30 mb-4">
              Nuestros programas
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-4xl font-bold mb-5 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Elige tu camino académico.
              </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Programas diseñados para que desarrolles todo tu potencial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-slate-700 overflow-hidden relative"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="text-white" size={28} />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {program.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    <Link
                      href="/academics"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-4 transition-all"
                    >
                      Más información
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50/50 to-cyan-50/30 dark:from-slate-900/50 dark:to-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold border border-blue-500/30 mb-4">
              Por qué elegirnos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Fortalezas que nos distinguen.
              </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 group hover:border-blue-500/50 dark:hover:border-blue-400/50"
                >
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            ¿Listo para tu nuevo comienzo?
          </h2>

          <p className="text-lg md:text-xl text-blue-50 text-balance max-w-2xl mx-auto">
            Únete a nuestra comunidad de excelencia académica y forma parte de los líderes del futuro. Solicita tu información de admisión hoy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 text-lg"
            >
              Contactar Ahora
            </Link>
            <Link
              href="/academics"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 text-lg"
            >
              Programas Académicos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
