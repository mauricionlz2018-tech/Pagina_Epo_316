import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { MapPin, Phone, Mail, Clock, Navigation2, Bus } from 'lucide-react';

export default function LocationPage() {
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
            Encuéntranos <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">aquí.</span>
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            San José del Rincón, Estado de México. Ubicación accesible y bien comunicada.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border-4 border-blue-100 dark:border-blue-900 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-slide-up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1883.5840761234567!2d-100.1666123!3d19.6825853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2eca1b8f24487%3A0xfb2ac8c9e9fba719!2sEscuela%20Preparatoria%20Oficial%20N%C3%BAm.%20316!5e0!3m2!1ses!2smx!4v1704110000"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Address */}
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-500/50 animate-slide-up delay-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Dirección</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Avenida Principal #316<br />
                      Municipio del Estado de México<br />
                      Estado de México, C.P. 54321
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-500/50 animate-slide-up delay-200">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Teléfono</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="tel:+525512345678" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                        +52 (555) 123-4567
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-500/50 animate-slide-up delay-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Correo electrónico</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="mailto:info@epo316.gmail.com" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                        info@epo316.gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="group bg-gradient-to-br from-blue-50/50 to-cyan-50/30 dark:from-slate-900/50 dark:to-slate-800/30 border border-blue-100 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 animate-slide-up delay-400">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Horario de atención.</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><span className="font-semibold text-gray-900 dark:text-white">Lunes a viernes:</span> 8:00 AM - 3:00 PM</p>
                      <p><span className="font-semibold text-gray-900 dark:text-white">Sábados y domingos:</span> Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transport Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-50/50 to-cyan-50/30 dark:from-slate-900/50 dark:to-slate-800/30 border border-blue-100 dark:border-slate-700 rounded-2xl p-8 md:p-12 animate-slide-up delay-500">
            <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Cómo llegar.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 group rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Bus size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Transporte público</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Autobús Insurgentes de San José del Rincón a Santa Cruz del Tejocote.<br />
                      Parada: la base de taxis enfrente de la terminal de San José del Rincón.<br />
                      Tiempo estimado: 5 minutos a pie.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 group rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Navigation2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Google Maps</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      Busca "Escuela Preparatoria Oficial 316" en Google Maps para obtener indicaciones desde tu ubicación actual.
                    </p>
                    <a href="https://www.google.com.mx/maps/place/Escuela+Preparatoria+Oficial+N%C3%BAm.+316/@19.6813324,-100.1654832,953m/data=!3m1!1e3!4m6!3m5!1s0x85d2eca1b8f24487:0xfb2ac8c9e9fba719!8m2!3d19.6825853!4d-100.1666123!16s%2Fg%2F11gczwgw50" 
                       className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition-colors"
                       target="_blank"
                       rel="noopener noreferrer">
                      Abrir en Google Maps →
                    </a>
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
