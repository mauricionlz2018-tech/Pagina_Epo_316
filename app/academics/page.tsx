import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { CheckCircle, BookOpen, Users, Target } from 'lucide-react';

export default function AcademicsPage() {
  const program = {
    name: 'Bachillerato General',
    description: 'Formación integral con énfasis en ciencias, humanidades y tecnología.',
    subjects: [
      'Primer grado (1° y 2° semestre)',
      'Lengua y Comunicación I y II',
      'Pensamiento Matemático I y II',
      'Ciencias Naturales, Experimentales y Tecnología I y II',

      'Conciencia Histórica I',

      'Ciencias Sociales I',

      'Pensamiento Filosófico y Humanidades I',

      'Cultura Digital I y II',

      'Inglés I y II',
      'Formación Socioemocional (PAEC, actividades físicas, artísticas, educación para la salud)',

      'Segundo grado (3° y 4° semestre)',
      'Lengua y Comunicación III',
      'Pensamiento Matemático III y IV',
      'Ciencias Naturales, Experimentales y Tecnología III y IV',
      'Conciencia Histórica II',

      'Ciencias Sociales II',

      'Pensamiento Filosófico y Humanidades II',
      'Cultura Digital III',

      'Inglés III y IV',

      'Formación Socioemocional (continuación de PAEC, ciudadanía, sexualidad y género)',
      'Optativas del componente fundamental extendido (ej. temas selectos de matemáticas, ciencias aplicadas, literatura, etc.)',

      'Tercer grado (5° y 6° semestre)',
      'Pensamiento Matemático V y VI',

      'Ciencias Naturales, Experimentales y Tecnología V y VI',

      'Conciencia Histórica III',
      'Ciencias Sociales III',
      'Pensamiento Filosófico y Humanidades III',
      'Inglés V',
      'Formación Socioemocional (proyectos de colaboración ciudadana, actividades culturales)',
      'Optativas del componente fundamental extendido (ej. especialización en ciencias, humanidades, tecnología)',
      'Currículum laboral (competencias básicas, técnicas o tecnológicas según la trayectoria elegida: ocupacional básico, técnico o tecnológico)'
    ],
  };

  const specialties = [
    {
      title: 'Opción de Ciencias',
      icon: <Target size={24} />,
      description: 'Especialización en ciencias naturales y exactas para carreras STEM',
    },
    {
      title: 'Opción de Humanidades',
      icon: <BookOpen size={24} />,
      description: 'Enfoque en ciencias sociales y humanidades',
    },
    {
      title: 'Opción Técnico-Profesional',
      icon: <Users size={24} />,
      description: 'Formación técnica orientada al mercado laboral',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Programas Académicos</h1>
          <p className="text-lg opacity-90 mt-2">Conoce nuestras ofertas educativas</p>
        </div>
      </section>

      {/* Program */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow mb-12">
            <h3 className="text-3xl font-bold mb-3 text-primary">{program.name}</h3>
            <p className="text-muted-foreground mb-8 text-lg">{program.description}</p>

            {/* Specialties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {specialties.map((specialty) => (
                <div key={specialty.title} className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <div className="text-primary mb-3">{specialty.icon}</div>
                  <h4 className="font-bold text-lg mb-2">{specialty.title}</h4>
                  <p className="text-sm text-muted-foreground">{specialty.description}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="font-semibold text-lg mb-6">Asignaturas Principales:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.subjects.map((subject) => (
                  <div key={subject} className="flex items-center gap-3">
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <span>{subject}</span>
                  </div>
                ))}
              </div>
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
