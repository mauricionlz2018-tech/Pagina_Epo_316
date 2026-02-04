import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Building2, Trees, Layers, Zap } from 'lucide-react';

export default function InfraestructuraPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Infraestructura</h1>
          <p className="text-lg opacity-90 mt-2">Conoce nuestras instalaciones y equipamiento</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Instalaciones */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Instalaciones</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Aulas de Clase</h3>
                <p className="text-muted-foreground">30 aulas equipadas con proyectores, pizarras inteligentes y acceso a internet de alta velocidad para una experiencia educativa moderna.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Laboratorios</h3>
                <p className="text-muted-foreground">Laboratorios de Física, Química y Biología equipados con instrumental científico de última generación para prácticas experimentales.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Biblioteca</h3>
                <p className="text-muted-foreground">Biblioteca de 5,000 títulos con sala de consulta, área de referencia y acceso a bases de datos académicas digitales.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Centro de Cómputo</h3>
                <p className="text-muted-foreground">Dos centros de cómputo con 50 computadoras conectadas a internet para clases de Informática e investigación.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Auditorio</h3>
                <p className="text-muted-foreground">Auditorio con capacidad para 400 personas, equipado con sistema de audio y visualización para eventos académicos.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Cafetería</h3>
                <p className="text-muted-foreground">Cafetería moderna con comidas saludables y espacios cómodos para estudiantes durante los descansos.</p>
              </div>
            </div>
          </div>

          {/* Galería de Imágenes */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Galería de Instalaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src="/Secretaria_Escolar/Infraestructura_2.jpg" 
                    alt="Aula moderna con pizarra inteligente"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Aulas de Clase</h3>
                  <p className="text-muted-foreground text-sm">Equipadas con la última tecnología para el aprendizaje.</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src="/Direccion/Direccion_1.jpg"
                    alt="Laboratorio de ciencias"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Dirección</h3>
                  <p className="text-muted-foreground text-sm">Espacios especializados para experimentación científica.</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.jpg"
                    alt="Biblioteca escolar"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Biblioteca</h3>
                  <p className="text-muted-foreground text-sm">Centro de conocimiento con miles de recursos.</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src="/Secretaria_Escolar/1748722690528.jpg"
                    alt="Centro de cómputo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Centro de Cómputo</h3>
                  <p className="text-muted-foreground text-sm">Tecnología de vanguardia para el aprendizaje digital.</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.jpg"
                    alt="Auditorio escolar"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Auditorio</h3>
                  <p className="text-muted-foreground text-sm">Espacio para eventos culturales y académicos.</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src="/Secretaria_Escolar/Area_recreacion_4.jpg"
                    alt="Áreas deportivas"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Áreas Deportivas</h3>
                  <p className="text-muted-foreground text-sm">Instalaciones para el desarrollo físico y recreativo.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Áreas de Recreación */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Trees className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Áreas de Recreación</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Cancha de Básquetbol</h3>
                <p className="text-muted-foreground">Cancha profesional con infraestructura para torneos internos y entrenamiento de equipos representativos.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Cancha de Fútbol</h3>
                <p className="text-muted-foreground">Campo deportivo para fútbol y otras actividades recreativas.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Áreas Verdes</h3>
                <p className="text-muted-foreground">Jardines y áreas verdes donde los estudiantes pueden descansar y conectar con la naturaleza.</p>
              </div>
            </div>
          </div>

          {/* Mobiliario y Equipamiento */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Layers className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Mobiliario y Equipamiento</h2>
            </div>
            <div className="p-6 bg-card border border-border rounded-xl">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Aulas espaciosas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Pantallas en cada aula</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Proyectores de buena calidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Sistema de audio y video</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Equipos de computo de gran capacidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Conexión WiFi</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Mobiliario adaptado para personas con discapacidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Bibloteca con varios titulos</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sistema MIGES */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Sistema MIGES</h2>
            </div>
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
              <p className="text-muted-foreground mb-4">
                Accede a la plataforma MIGES para gestión administrativa y académica.
              </p>
              <a
                href="https://miges.edugem.gob.mx/?AspxAutoDetectCookieSupport=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
              >
                Ir a MIGES
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
