import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Users, Heart, BookMarked } from 'lucide-react';

export default function OrientacionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Departamento de Orientación</h1>
          <p className="text-lg opacity-90 mt-2">Apoyo integral para tu desarrollo personal y académico</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Orientadores */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Nuestros Orientadores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-primary rounded-full mb-4 flex items-center justify-center text-white text-2xl">👩‍🏫</div>
                <h3 className="font-bold text-lg mb-2">Lic. María García López</h3>
                <p className="text-muted-foreground text-sm mb-3">Orientadora Educativa</p>
                <p className="text-muted-foreground text-sm">Especializada en orientación académica y vocacional, con 10 años de experiencia en educación.</p>
                <p className="text-primary text-sm mt-3"><strong>Ext.</strong> 101</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-primary rounded-full mb-4 flex items-center justify-center text-white text-2xl">👩‍🏫</div>
                <h3 className="font-bold text-lg mb-2">Lic. Sofía Ramírez Cruz</h3>
                <p className="text-muted-foreground text-sm mb-3">Orientadora Psicosocial</p>
                <p className="text-muted-foreground text-sm">Enfocada en bienestar estudiantil, relaciones interpersonales y desarrollo emocional.</p>
                <p className="text-primary text-sm mt-3"><strong>Ext.</strong> 102</p>
              </div>
            </div>
          </div>

          {/* Programas */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Nuestros Programas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">GEPEA</h3>
                <p className="text-muted-foreground text-sm">Grupo de Estudio para la Permanencia y el Éxito Académico. Apoyo para estudiantes que requieren refuerzo académico.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">CASA</h3>
                <p className="text-muted-foreground text-sm">Centro de Atención Social y Académica. Soporte integral para estudiantes en situación de vulnerabilidad.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Tutoría</h3>
                <p className="text-muted-foreground text-sm">Programa de tutoría personalizada para acompañamiento académico y personal.</p>
              </div>
            </div>
          </div>

          {/* Recursos */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookMarked className="text-primary" size={32} />
              <h2 className="text-3xl font-bold">Recursos Educativos Digitales</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Bibliotecas Digitales Gratuitas</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong>UNAM Global:</strong> Biblioteca digital de la UNAM</li>
                  <li>• <strong>Biblioteca del IPN:</strong> Recursos académicos del Instituto Politécnico Nacional</li>
                  <li>• <strong>Dominio Público:</strong> Libros y materiales en dominio público</li>
                  <li>• <strong>Google Scholar:</strong> Búsqueda de artículos académicos</li>
                </ul>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">Plataformas de Aprendizaje</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong>Khan Academy:</strong> Cursos en múltiples temas</li>
                  <li>• <strong>Coursera:</strong> Cursos universitarios en línea</li>
                  <li>• <strong>Edx:</strong> Educación de calidad mundial</li>
                  <li>• <strong>YouTube Educativo:</strong> Canales académicos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Horario de Atención */}
          <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
            <h3 className="font-bold text-lg mb-4">Horario de Atención</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p><strong>Lunes a Jueves:</strong> 8:00 - 16:00 hrs</p>
                <p><strong>Viernes:</strong> 8:00 - 15:00 hrs</p>
              </div>
              <div>
                <p><strong>Correo:</strong> orientacion@epo316.edu.mx</p>
                <p><strong>Teléfono:</strong> (555) 1234-5678</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
