import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { FileText, Calendar, BookOpen, Users, Phone, Mail, MapPin, Clock, User, Download } from 'lucide-react';

export default function SecretariaPage() {
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
            Secretaría <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">escolar.</span>
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Información administrativa, reglamentaria y de gestión educativa de EPO 316.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Personal Administrativo */}
          <div>
            <div className="mb-10 animate-slide-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Personal <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">administrativo.</span></h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Profesionales dedicados a la gestión y administración institucional.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up delay-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <User size={28} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">MTRA. Miriam Arleth Miranda</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 font-semibold">Secretaria escolar</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Profesional en administración educativa con más de 10 años de experiencia en gestión administrativa escolar.</p>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-4">
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-500 flex-shrink-0" />
                    <span>(555) 1234-5678</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-500 flex-shrink-0" />
                    <a href="mailto:miriam.miranda@epo316.edu.mx" className="text-blue-600 dark:text-blue-400 hover:text-blue-500">miriam.miranda@epo316.edu.mx</a>
                  </p>
                </div>
              </div>

              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up delay-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <User size={28} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">MTRA. Analy Cruz Rivera</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 font-semibold">Subdirectora escolar</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Responsable de la supervisión de procesos administrativos y apoyo a la secretaría escolar.</p>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-4">
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-purple-500 flex-shrink-0" />
                    <span>(555) 1234-5679</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-purple-500 flex-shrink-0" />
                    <a href="mailto:analyrivera@epo316.edu.mx" className="text-blue-600 dark:text-blue-400 hover:text-blue-500">analyrivera@epo316.edu.mx</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reglamentos */}
          <div>
            <div className="mb-10 animate-slide-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Reglamentos y <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">normas.</span></h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Documentos institucionales para la comunidad escolar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Reglamento interno para estudiantes', desc: 'Reglas de convivencia, derechos y obligaciones dentro de la institución.' },
                { title: 'Reglamento para docentes', desc: 'Normas y disposiciones para el personal docente.' },
                { title: 'Código de ética', desc: 'Principios éticos y conducta esperada de toda la comunidad escolar.' },
                { title: 'Políticas académicas', desc: 'Políticas de evaluación, calificación y requisitos académicos.' },
              ].map((reg, idx) => (
                <div key={reg.title} className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:translate-y-(-2) transition-all duration-300 animate-slide-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <FileText size={20} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white capitalize">{reg.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{reg.desc}</p>
                  <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                    <Download size={16} />
                    Descargar PDF
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Calendario Escolar */}
          <div>
            <div className="mb-10 animate-slide-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Calendario escolar <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">2025-2026.</span></h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Fechas importantes y festividades del ciclo escolar.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
                {/* Fechas Importantes */}
                <div className="p-8 lg:border-r border-gray-100 dark:border-slate-700 animate-slide-up delay-100">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Calendar className="text-blue-500" />
                    Fechas importantes
                  </h3>
                  <div className="space-y-4">
                    {[
                      { date: '20 de agosto', desc: 'Inicio de clases' },
                      { date: '8 de octubre', desc: 'Fin 1er parcial / Evaluaciones' },
                      { date: '22 de noviembre', desc: 'Fin 2do parcial / Evaluaciones' },
                      { date: '23 de diciembre - 5 de enero', desc: 'Receso vacacional' },
                      { date: '12 de febrero', desc: 'Fin 3er parcial / Evaluaciones' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.date}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eventos */}
                <div className="p-8 animate-slide-up delay-200">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <BookOpen className="text-cyan-500" />
                    Eventos y festividades
                  </h3>
                  <div className="space-y-4">
                    {[
                      { date: '15 de septiembre', desc: 'Evento cívico nacional' },
                      { date: '31 de octubre', desc: 'Día de muertos - Actividades culturales' },
                      { date: '25 de diciembre', desc: 'Navidad' },
                      { date: '10 de marzo', desc: 'Día de la mujer mexicana' },
                      { date: '31 de mayo', desc: 'Clausura de ciclo escolar' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.date}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <div className="mb-10 animate-slide-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Información de <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">contacto.</span></h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Canales de comunicación con las áreas administrativas.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group bg-gradient-to-br from-blue-50/50 to-cyan-50/30 dark:from-slate-900/50 dark:to-slate-800/30 border border-blue-100 dark:border-slate-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 animate-slide-up delay-100">
                <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white">Secretaría escolar</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Horario</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Lunes a viernes, 8:00 - 15:00 hrs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Teléfono</p>
                      <a href="tel:+555123456678" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-xs">(555) 1234-5678</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Correo</p>
                      <a href="mailto:secretaria@epo316.edu.mx" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-xs">secretaria@epo316.edu.mx</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Ubicación</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Edificio Principal, Planta Alta</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-slate-900/50 dark:to-slate-800/30 border border-purple-100 dark:border-slate-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 animate-slide-up delay-200">
                <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white">Subdirección administrativa</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="text-purple-500 dark:text-purple-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Horario</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Lunes a viernes, 8:00 AM - 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-purple-500 dark:text-purple-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Teléfono</p>
                      <a href="tel:+555123456679" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-xs">(555) 1234-5679</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-purple-500 dark:text-purple-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Correo</p>
                      <a href="mailto:admin@epo316.edu.mx" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-xs">admin@epo316.edu.mx</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="text-purple-500 dark:text-purple-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Ubicación</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Edificio administrativo</p>
                    </div>
                  </div>
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
