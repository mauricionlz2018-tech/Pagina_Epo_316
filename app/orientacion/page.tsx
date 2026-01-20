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
                <h3 className="font-bold text-lg mb-2">Lic. Rosa Garía Trejo</h3>
                <p className="text-muted-foreground text-sm mb-3">Orientadora Educativa</p>
                <p className="text-muted-foreground text-sm">Especializada en orientación académica y vocacional, con 10 años de experiencia en educación.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-primary rounded-full mb-4 flex items-center justify-center text-white text-2xl">👩‍🏫</div>
                <h3 className="font-bold text-lg mb-2">Lic. Yanet Nuñez Alcantara</h3>
                <p className="text-muted-foreground text-sm mb-3">Orientadora Psicosocial</p>
                <p className="text-muted-foreground text-sm">Enfocada en bienestar estudiantil, relaciones interpersonales y desarrollo emocional.</p>
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
                <h3 className="font-bold text-lg mb-3">📚 Bibliotecas Digitales</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li>
                    <a href="https://www.dgbiblio.unam.mx/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • UNAM - Biblioteca Digital
                    </a>
                    <p className="text-xs ml-4 mt-1">Acceso a bases de datos y libros de la UNAM</p>
                  </li>
                  <li>
                    <a href="https://www.bidi.unam.mx/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • BIDI - Sistema de Bibliotecas UNAM
                    </a>
                    <p className="text-xs ml-4 mt-1">Portal de bases de datos académicas UNAM</p>
                  </li>
                  <li>
                    <a href="https://www.ipn.mx/assets/files/biblioteca/docs/ACCESO-BIBLIOTECA-IPN.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Biblioteca IPN
                    </a>
                    <p className="text-xs ml-4 mt-1">Recursos académicos del Instituto Politécnico Nacional</p>
                  </li>
                  <li>
                    <a href="https://www.gutenberg.org/ebooks/search/?query=spanish" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Project Gutenberg
                    </a>
                    <p className="text-xs ml-4 mt-1">Libros de dominio público en español</p>
                  </li>
                  <li>
                    <a href="https://scholar.google.com/scholar" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Google Scholar
                    </a>
                    <p className="text-xs ml-4 mt-1">Búsqueda de artículos académicos y papers</p>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">🎓 Plataformas de Aprendizaje</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li>
                    <a href="https://www.khanacademy.org/es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Khan Academy
                    </a>
                    <p className="text-xs ml-4 mt-1">Cursos gratuitos en español: matemáticas, ciencias, historia</p>
                  </li>
                  <li>
                    <a href="https://www.coursera.org/es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Coursera
                    </a>
                    <p className="text-xs ml-4 mt-1">Cursos universitarios en línea de universidades top</p>
                  </li>
                  <li>
                    <a href="https://www.edx.org/es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • EdX
                    </a>
                    <p className="text-xs ml-4 mt-1">Educación de MIT, Harvard y otras universidades</p>
                  </li>
                  <li>
                    <a href="https://www.duolingo.com/es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Duolingo
                    </a>
                    <p className="text-xs ml-4 mt-1">Aprende idiomas de manera interactiva y divertida</p>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/results?search_query=educación+académica" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • YouTube Educativo
                    </a>
                    <p className="text-xs ml-4 mt-1">Canales académicos en múltiples temas</p>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">💻 Herramientas Digitales</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li>
                    <a href="https://www.overleaf.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Overleaf
                    </a>
                    <p className="text-xs ml-4 mt-1">Editor online para documentos académicos LaTeX</p>
                  </li>
                  <li>
                    <a href="https://www.wolframalpha.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Wolfram Alpha
                    </a>
                    <p className="text-xs ml-4 mt-1">Motor de búsqueda computacional para matemáticas</p>
                  </li>
                  <li>
                    <a href="https://www.desmos.com/calculator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Desmos
                    </a>
                    <p className="text-xs ml-4 mt-1">Calculadora gráfica interactiva para matemáticas</p>
                  </li>
                  <li>
                    <a href="https://www.canva.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • Canva
                    </a>
                    <p className="text-xs ml-4 mt-1">Herramienta de diseño gráfico para presentaciones</p>
                  </li>
                  <li>
                    <a href="https://www.deepl.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      • DeepL
                    </a>
                    <p className="text-xs ml-4 mt-1">Traductor online con inteligencia artificial</p>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3">📖 Recursos por Materia</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">📐</span>
                    <div>
                      <p><strong>Matemáticas:</strong> Khan Academy, Wolfram Alpha, Desmos</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">🧪</span>
                    <div>
                      <p><strong>Ciencias:</strong> Coursera, Khan Academy, Google Scholar</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">🌍</span>
                    <div>
                      <p><strong>Idiomas:</strong> Duolingo, DeepL, YouTube Educativo</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">📚</span>
                    <div>
                      <p><strong>Historia:</strong> UNAM, Dominio Público, BIDI</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✏️</span>
                    <div>
                      <p><strong>Literatura:</strong> Google Scholar, JSTOR, UNAM</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Horario de Atención */}
          <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
            <h3 className="font-bold text-lg mb-4">Horario de Atención</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p><strong>Lunes a Viernes:</strong> 8:00 AM - 3:00 PM</p>
              </div>
              <div>
                <p><strong>Correo:</strong> orientacion@epo316.edu.mx</p>
                <p><strong>Teléfono:</strong> (+52) 557-415-6828</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
