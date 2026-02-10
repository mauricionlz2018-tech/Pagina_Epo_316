import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Award, Heart, Users, Lightbulb, Target, Zap } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Excelencia',
      description: 'Compromiso con la calidad en todas nuestras acciones.'
    },
    {
      icon: Heart,
      title: 'Integridad',
      description: 'Actuamos con honestidad y coherencia en nuestros principios.'
    },
    {
      icon: Users,
      title: 'Inclusión',
      description: 'Valoramos la diversidad y promovemos oportunidades para todos.'
    },
    {
      icon: Lightbulb,
      title: 'Innovación',
      description: 'Buscamos constantemente nuevas formas de mejorar la educación.'
    },
  ];

  const moments = [
    {
      title: 'Aprendizaje activo',
      description: 'Nuestros estudiantes participando en clases dinámicas.',
      image: '/Secretaria_Escolar/Infraestructura_2.jpg'
    },
    {
      title: 'Actividades culturales',
      description: 'Eventos que enriquecen la formación integral.',
      image: '/Secretaria_Escolar/Area_recreacion_4.jpg'
    },
    {
      title: 'Éxito académico',
      description: 'Celebrando logros y nuevos comienzos.',
      image: '/Inicio_2.jpg'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Acerca de <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">nosotros.</span>
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Conoce la historia, misión y valores que nos definen como institución.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Historia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-slide-up">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Nuestra historia.</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                La Escuela Preparatoria Oficial Núm. 316 fue fundada con la misión de proporcionar educación de calidad a los jóvenes del Estado de México. Durante años, hemos formado generaciones de estudiantes comprometidos con el conocimiento y los valores humanistas.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-100 dark:border-blue-900">
              <Image
                src="/Acerca_de_la_Institucion/Acerca_6.jpg"
                alt="Historia EPO 316"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Misión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-slide-up delay-100">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-100 dark:border-blue-900">
              <Image
                src="/Academicos/Acerca_1.jpg"
                alt="Misión EPO 316"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Nuestra misión.</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Somos una institución de educación media superior dedicada a la enseñanza por competencias, investigación y vinculación que se distingue por su enfoque de excelencia educativa, haciendo partícipe a la comunidad, con el propósito de fomentar en los estudiantes el saber ser, hacer, pensar, aprender, crear y convivir permitiendo así un desarrollo integral.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/30 dark:from-slate-900/50 dark:to-slate-800/30 rounded-2xl p-8 md:p-12 border border-blue-100 dark:border-slate-700 animate-slide-up delay-200">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Nuestra visión.</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Consolidarse como una institución de educación media superior competitiva, pertinente y reconocida en el área educativa local, regional y estatal respondiendo con calidad académica las demandas de los jóvenes que les permitan el desarrollo de competencias científicas, culturales, humanas y tecnológicas.
            </p>
          </div>

          {/* Valores */}
          <div className="animate-slide-up delay-300">
            <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center">Nuestros valores.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-slate-700"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Momentos */}
          <div className="animate-slide-up delay-400">
            <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center">Momentos EPO 316.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moments.map((moment, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={moment.image}
                      alt={moment.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white capitalize">
                      {moment.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {moment.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
