import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { FileText, Calendar, BookOpen, Users, Phone, Mail, MapPin, Clock, User } from 'lucide-react';

export default function SecretariaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Secretaría Escolar</h1>
          <p className="text-lg opacity-90 mt-2">Información administrativa y reglamentaria</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Personal */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Personal Administrativo</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 flex items-center justify-center text-white">
                <User size={24} />
              </div>
                <h3 className="font-bold text-lg mb-1">MTRA. Miriam Arleth Miranda</h3>
                <p className="text-muted-foreground text-sm mb-3 font-semibold">Secretaria Escolar</p>
                <p className="text-muted-foreground text-sm">Profesional en administración educativa con más de 10 años de experiencia en gestión administrativa escolar.</p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Phone size={16} /> (555) 1234-5678</p>
                  <p className="flex items-center gap-2"><Mail size={16} /> miriam.miranda@epo316.edu.mx</p>
                </div>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full mb-4 flex items-center justify-center text-white">
                  <User size={24} />
                </div>
                <h3 className="font-bold text-lg mb-1">MTRA. Analy Cruz Rivera</h3>
                <p className="text-muted-foreground text-sm mb-3 font-semibold">Subdirectora Escolar</p>
                <p className="text-muted-foreground text-sm">Responsable de la supervisión de procesos administrativos y apoyo a la secretaría escolar.</p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Phone size={16} /> (555) 1234-5679</p>
                  <p className="flex items-center gap-2"><Mail size={16} /> analyrivera@epo316.edu.mx</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reglamentos */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Reglamentos y Normas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Reglamento Interno para Estudiantes</h3>
                <p className="text-muted-foreground mb-4 text-sm">Reglas de convivencia, derechos y obligaciones de los estudiantes dentro de la institución.</p>
                <a href="#" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity text-sm font-semibold">
                  Descargar PDF
                </a>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Reglamento para Docentes</h3>
                <p className="text-muted-foreground mb-4 text-sm">Normas y disposiciones para el personal docente de la institución.</p>
                <a href="#" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity text-sm font-semibold">
                  Descargar PDF
                </a>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Código de Ética</h3>
                <p className="text-muted-foreground mb-4 text-sm">Principios éticos y conducta esperada de toda la comunidad escolar.</p>
                <a href="#" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity text-sm font-semibold">
                  Descargar PDF
                </a>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Políticas Académicas</h3>
                <p className="text-muted-foreground mb-4 text-sm">Políticas de evaluación, calificación y requisitos académicos.</p>
                <a href="#" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity text-sm font-semibold">
                  Descargar PDF
                </a>
              </div>
            </div>
          </div>

          {/* Calendario Escolar */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Calendario Escolar 2025-2026</h2>
            </div>
            <div className="p-8 bg-card border border-border rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Fechas Importantes</h3>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>20 de Agosto:</strong> Inicio de clases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>8 de Octubre:</strong> Fin 1er parcial / Evaluaciones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>22 de Noviembre:</strong> Fin 2do parcial / Evaluaciones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>23 de Diciembre - 5 de Enero:</strong> Receso vacacional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>12 de Febrero:</strong> Fin 3er parcial / Evaluaciones</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Eventos y Festividades</h3>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>15 de Septiembre:</strong> Evento cívico nacional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>31 de Octubre:</strong> Día de Muertos - Actividades culturales</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>25 de Diciembre:</strong> Navidad</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>10 de Marzo:</strong> Día de la Mujer Mexicana</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold"></span>
                      <span><strong>31 de Mayo:</strong> Clausura de ciclo escolar</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Información de Contacto</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl">
                <h3 className="font-bold text-lg mb-4">Secretaría Escolar</h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={20} className="text-primary" />
                    Lunes a viernes, 8:00 - 15:00 hrs
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={20} className="text-primary" />
                    (555) 1234-5678
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={20} className="text-primary" />
                    secretaria@epo316.edu.mx
                  </p>
                  <p className="flex items-start gap-2 text-muted-foreground">
                    <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    Edificio Principal, Planta Alta
                  </p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-xl">
                <h3 className="font-bold text-lg mb-4">Subdirección Administrativa</h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={20} className="text-accent" />
                    Lunes a viernes, 8:00 AM - 15:00 PM
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={20} className="text-accent" />
                    (555) 1234-5679
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={20} className="text-accent" />
                    admin@epo316.edu.mx
                  </p>
                  <p className="flex items-start gap-2 text-muted-foreground">
                    <MapPin size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    Edificio Administrativo
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
