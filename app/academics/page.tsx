import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { CheckCircle, BookOpen, Users, Target, Download, FileText, CheckCheck } from 'lucide-react';

export default function AcademicsPage() {
  const program = {
    name: 'Bachillerato General',
    description: 'Formación integral con énfasis en ciencias, humanidades y tecnología.',
    grades: [
      {
        title: 'Primer Grado',
        semesters: [
          {
            title: '1° Semestre',
            subjects: [
              'Lengua y Comunicación I',
              'Pensamiento Matemático I',
              'Ciencias Naturales, Experimentales y Tecnología I',
              'Conciencia Histórica I',
              'Ciencias Sociales I',
              'Pensamiento Filosófico y Humanidades I',
              'Cultura Digital I',
              'Inglés I',
              'Formación Socioemocional (PAEC, actividades físicas, artísticas, educación para la salud)'
            ]
          },
          {
            title: '2° Semestre',
            subjects: [
              'Lengua y Comunicación II',
              'Pensamiento Matemático II',
              'Ciencias Naturales, Experimentales y Tecnología II',
              'Conciencia Histórica I',
              'Ciencias Sociales I',
              'Pensamiento Filosófico y Humanidades I',
              'Cultura Digital II',
              'Inglés II',
              'Formación Socioemocional (PAEC, actividades físicas, artísticas, educación para la salud)'
            ]
          }
        ]
      },
      {
        title: 'Segundo Grado',
        semesters: [
          {
            title: '3° Semestre',
            subjects: [
              'Lengua y Comunicación III',
              'Pensamiento Matemático III',
              'Ciencias Naturales, Experimentales y Tecnología III',
              'Conciencia Histórica II',
              'Ciencias Sociales II',
              'Pensamiento Filosófico y Humanidades II',
              'Cultura Digital III',
              'Inglés III',
              'Formación Socioemocional (continuación de PAEC, ciudadanía, sexualidad y género)',
              'Optativas del componente fundamental extendido (ej. temas selectos de matemáticas, ciencias aplicadas, literatura, etc.)'
            ]
          },
          {
            title: '4° Semestre',
            subjects: [
              'Lengua y Comunicación III',
              'Pensamiento Matemático IV',
              'Ciencias Naturales, Experimentales y Tecnología IV',
              'Conciencia Histórica II',
              'Ciencias Sociales II',
              'Pensamiento Filosófico y Humanidades II',
              'Cultura Digital III',
              'Inglés IV',
              'Formación Socioemocional (continuación de PAEC, ciudadanía, sexualidad y género)',
              'Optativas del componente fundamental extendido (ej. temas selectos de matemáticas, ciencias aplicadas, literatura, etc.)'
            ]
          }
        ]
      },
      {
        title: 'Tercer Grado',
        semesters: [
          {
            title: '5° Semestre',
            subjects: [
              'Pensamiento Matemático V',
              'Ciencias Naturales, Experimentales y Tecnología V',
              'Conciencia Histórica III',
              'Ciencias Sociales III',
              'Pensamiento Filosófico y Humanidades III',
              'Inglés V',
              'Formación Socioemocional (proyectos de colaboración ciudadana, actividades culturales)',
              'Optativas del componente fundamental extendido (ej. especialización en ciencias, humanidades, tecnología)',
              'Currículum laboral (competencias básicas, técnicas o tecnológicas según la trayectoria elegida: ocupacional básico, técnico o tecnológico)'
            ]
          },
          {
            title: '6° Semestre',
            subjects: [
              'Pensamiento Matemático VI',
              'Ciencias Naturales, Experimentales y Tecnología VI',
              'Conciencia Histórica III',
              'Ciencias Sociales III',
              'Pensamiento Filosófico y Humanidades III',
              'Inglés V',
              'Formación Socioemocional (proyectos de colaboración ciudadana, actividades culturales)',
              'Optativas del componente fundamental extendido (ej. especialización en ciencias, humanidades, tecnología)',
              'Currículum laboral (competencias básicas, técnicas o tecnológicas según la trayectoria elegida: ocupacional básico, técnico o tecnológico)'
            ]
          }
        ]
      }
    ]
  };

  const specialties = [
    {
      title: 'Opción de Ciencias',
      icon: <Target size={24} />,
      description: 'Especialización en ciencias naturales y exactas para carreras STEM',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Opción de Humanidades',
      icon: <BookOpen size={24} />,
      description: 'Enfoque en ciencias sociales y humanidades',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Opción Técnico-Profesional',
      icon: <Users size={24} />,
      description: 'Formación técnica orientada al mercado laboral',
      color: 'from-emerald-500 to-teal-500'
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
            Programas <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">académicos.</span>
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Formación integral de calidad con énfasis en ciencias, humanidades y tecnología para tu futuro.
          </p>
        </div>
      </section>

      {/* Program */}
      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Program Title */}
          <div className="mb-12 space-y-3 animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{program.name}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{program.description}</p>
          </div>

          {/* Specialties */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {specialties.map((specialty, index) => (
              <div key={specialty.title} className={`group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-slate-700 animate-slide-up delay-${index * 100}`}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${specialty.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {specialty.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{specialty.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{specialty.description}</p>
              </div>
            ))}
          </div>

          {/* Subjects Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Asignaturas <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">principales.</span></h3>
            <div className="space-y-6">
              {program.grades.map((grade, gradeIndex) => (
                <div 
                  key={gradeIndex} 
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${(gradeIndex + 1) * 100}ms` }}
                >
                  <h4 className="font-bold text-xl mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {gradeIndex + 1}
                    </div>
                    {grade.title}
                  </h4>
                  
                  <div className="space-y-6">
                    {grade.semesters.map((semester, semesterIndex) => (
                      <div key={semesterIndex} className="bg-gradient-to-r from-blue-50/50 to-cyan-50/30 dark:from-slate-900/50 dark:to-slate-800/30 rounded-xl p-6 border border-blue-100 dark:border-slate-700">
                        <h5 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                          {semester.title}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {semester.subjects.map((subject, subjectIndex) => (
                            <div key={subjectIndex} className="flex items-start gap-3 group/item">
                              <CheckCircle className="text-cyan-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" size={20} />
                              <span className="text-gray-700 dark:text-gray-300">{subject}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section id="plan" className="bg-primary/5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Plan de Trabajo Institucional</h2>
          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-3">Objetivos 2025-2026</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Mejorar la calidad educativa mediante innovación pedagógica</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Fomentar la inclusión y equidad en la educación</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Fortalecer competencias digitales en estudiantes y docentes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Promover valores institucionales y responsabilidad social</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Mejorar infraestructura y recursos educativos</span>
                </li>
              </ul>
            </div>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
              Descargar Plan Completo
            </button>
          </div>
        </div>
      </section>

      {/* PAEC */}
      <section id="paec" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">PAEC - Programa de Apoyo al Egreso de Calidad</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground mb-6">
              El PAEC es un programa integral diseñado para asegurar que nuestros estudiantes se gradúen con los conocimientos, habilidades y competencias necesarias para enfrentar los retos del siglo XXI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h3 className="font-bold mb-3 text-primary">Componente Académico</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Fortalecimiento de competencias</li>
                  <li>• Evaluaciones formativas</li>
                  <li>• Asesorías personalizadas</li>
                  <li>• Talleres especializados</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h3 className="font-bold mb-3 text-primary">Componente Socioemocional</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Orientación vocacional</li>
                  <li>• Desarrollo de liderazgo</li>
                  <li>• Resolución de conflictos</li>
                  <li>• Bienestar integral</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Requisitos de Admisión</h2>
          <div className="bg-card border border-border rounded-xl p-8 space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold">Certificado de Educación Secundaria</p>
                <p className="text-muted-foreground text-sm">Original y dos copias</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold">CURP</p>
                <p className="text-muted-foreground text-sm">Identificación oficial del solicitante</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold">Acta de Nacimiento</p>
                <p className="text-muted-foreground text-sm">Copia certificada</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <p className="font-semibold">Examen de Admisión</p>
                <p className="text-muted-foreground text-sm">Evaluación de conocimientos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
