import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { FileText, Calendar, BookOpen } from 'lucide-react';

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
          
          {/* Reglamentos */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Reglamentos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Reglamento de Docentes</h3>
                <p className="text-muted-foreground mb-4">Normas y disposiciones para el personal docente de la institución.</p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
                  Descargar
                </button>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Reglamento Interno</h3>
                <p className="text-muted-foreground mb-4">Reglas de convivencia y disciplina para estudiantes y personal.</p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
                  Descargar
                </button>
              </div>
            </div>
          </div>

          {/* Calendario Escolar */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Calendario Escolar 2024-2025</h2>
            </div>
            <div className="p-8 bg-card border border-border rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Fechas Importantes</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>15 de Agosto:</strong> Inicio de clases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>1 de Octubre:</strong> Fin 1er parcial</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>15 de Noviembre:</strong> Fin 2do parcial</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>20 de Diciembre:</strong> Receso vacacional</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Eventos Especiales</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>15 de Septiembre:</strong> Evento cívico</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>31 de Octubre:</strong> Día de muertos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>25 de Diciembre:</strong> Navidad</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>31 de Mayo:</strong> Fin de ciclo escolar</span>
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
              <h2 className="text-3xl font-bold">Contacto Secretaría Escolar</h2>
            </div>
            <div className="p-6 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground mb-2"><strong>Horario de atención:</strong> Lunes a viernes, 8:00 - 16:00 hrs</p>
              <p className="text-muted-foreground mb-2"><strong>Teléfono:</strong> (555) 1234-5678</p>
              <p className="text-muted-foreground"><strong>Correo:</strong> secretaria@epo316.edu.mx</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
