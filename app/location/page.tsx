import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { MapPin, Phone, Mail, Clock, Navigation2, Bus } from 'lucide-react';

export default function LocationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Ubicación</h1>
          <p className="text-lg opacity-90 mt-2">Encuentranos en el corazón del Estado de México</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-border shadow-lg">
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
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Dirección</h3>
                    <p className="text-muted-foreground">
                      Avenida Principal #316<br />
                      Municipio del Estado de México<br />
                      Estado de México, C.P. 54321
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Teléfono</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+525512345678" className="hover:text-primary transition-colors">
                        +52 (555) 123-4567
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Correo Electrónico</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@epo316.edu.mx" className="hover:text-primary transition-colors">
                        info@epo316.edu.mx
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3">Horario de Atención</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="font-semibold">Lunes - Viernes:</span> 7:00 AM - 3:00 PM</p>
                      <p><span className="font-semibold">Sábado:</span> 8:00 AM - 12:00 PM</p>
                      <p><span className="font-semibold">Domingo:</span> Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transport Section */}
          <div className="mt-16 bg-secondary/10 border border-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-8">Cómo llegar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                  <Bus size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Transporte Público</h3>
                  <p className="text-sm text-muted-foreground">
                    Autobús línea 15 dirección Centro<br />
                    Parada: Avenida Principal esquina con Calle 5<br />
                    Tiempo estimado: 5 minutos a pie
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                  <Navigation2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Google Maps</h3>
                  <p className="text-sm text-muted-foreground">
                    Busca "Escuela Preparatoria Oficial 316" en Google Maps<br />
                    para obtener indicaciones desde tu ubicación actual.<br />
                    <a href="https://www.google.com.mx/maps/place/Escuela+Preparatoria+Oficial+N%C3%BAm.+316/@19.6813324,-100.1654832,953m/data=!3m1!1e3!4m6!3m5!1s0x85d2eca1b8f24487:0xfb2ac8c9e9fba719!8m2!3d19.6825853!4d-100.1666123!16s%2Fg%2F11gczwgw50" 
                       className="text-primary hover:underline"
                       target="_blank"
                       rel="noopener noreferrer">
                      Abrir en Google Maps
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Parking Info */}
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h3 className="font-bold text-lg mb-4">Estacionamiento</h3>
            <p className="text-muted-foreground">
              Contamos con estacionamiento gratuito para visitantes y padres de familia. 
              El acceso se encuentra en la lateral derecha del edificio principal.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
