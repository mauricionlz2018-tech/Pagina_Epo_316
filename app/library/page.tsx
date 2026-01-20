import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { ExternalLink, BookOpen, Globe, Database } from 'lucide-react';

export default function LibraryPage() {
  const libraries = [
    {
      name: 'Biblioteca Digital UNAM',
      description: 'Acceso a millones de libros, revistas y artículos académicos de la Universidad Nacional Autónoma de México.',
      url: 'https://www.biblioteca.unam.mx/',
      category: 'Universidad',
      icon: <BookOpen size={24} />,
    },
    {
      name: 'Biblioteca Digital IPN',
      description: 'Recursos digitales del Instituto Politécnico Nacional incluyendo tesis, libros y publicaciones científicas.',
      url: 'https://www.biblioteca.ipn.mx/',
      category: 'Universidad',
      icon: <Database size={24} />,
    },
    {
      name: 'Google Scholar',
      description: 'Buscador de literatura académica que incluye artículos, tesis, libros y resúmenes de múltiples disciplinas.',
      url: 'https://scholar.google.com/',
      category: 'Académico',
      icon: <Globe size={24} />,
    },
    {
      name: 'Project Gutenberg',
      description: 'Más de 70,000 libros digitales de dominio público disponibles de forma gratuita.',
      url: 'https://www.gutenberg.org/',
      category: 'Libros Clásicos',
      icon: <BookOpen size={24} />,
    },
    {
      name: 'Open Library',
      description: 'Base de datos abierta con millones de registros de libros y acceso a préstamos digitales.',
      url: 'https://openlibrary.org/',
      category: 'Colección General',
      icon: <Database size={24} />,
    },
    {
      name: 'Biblioteca Digital Hispánica',
      description: 'Colección de la Biblioteca Nacional de España con documentos históricos y contemporáneos.',
      url: 'https://www.bne.es/es/catalogos/biblioteca-digital-hispanica/',
      category: 'Historia y Cultura',
      icon: <Globe size={24} />,
    },
    {
      name: 'Redalyc',
      description: 'Red de Revistas Científicas de América Latina con acceso a revistas académicas de libre acceso.',
      url: 'https://www.redalyc.org/',
      category: 'Revistas Científicas',
      icon: <Database size={24} />,
    },
    {
      name: 'Dialnet',
      description: 'Plataforma de difusión de la producción investigadora que recoge artículos de revistas españolas e hispanoamericanas.',
      url: 'https://dialnet.unirioja.es/',
      category: 'Académico',
      icon: <Globe size={24} />,
    },
    {
      name: 'MIT OpenCourseWare',
      description: 'Recursos educativos del Instituto Tecnológico de Massachusetts, incluyendo notas de clase y materiales de cursos.',
      url: 'https://ocw.mit.edu/',
      category: 'Educación',
      icon: <BookOpen size={24} />,
    },
  ];

  const categories = ['Todos', 'Universidad', 'Académico', 'Libros Clásicos', 'Colección General', 'Historia y Cultura', 'Revistas Científicas', 'Educación'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Biblioteca Digital</h1>
          <p className="text-lg opacity-90 mt-2">Acceso a recursos educativos y académicos gratuitos</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-12 bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Accede a miles de recursos educativos</h2>
            <p className="text-muted-foreground mb-4">
              EPO 316 te ofrece acceso a una colección de bibliotecas digitales de prestigiosas instituciones nacionales e internacionales. 
              Todos estos recursos están disponibles de forma gratuita para apoyo de tu formación académica.
            </p>
            <p className="text-muted-foreground">
              Desde libros clásicos hasta artículos científicos, encuentra el material que necesitas para tus investigaciones y estudios.
            </p>
          </div>

          {/* Libraries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraries.map((library) => (
              <div
                key={library.name}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-primary">{library.icon}</div>
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {library.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-foreground">{library.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{library.description}</p>

                <a
                  href={library.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group-hover:gap-3"
                >
                  Acceder
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-16 bg-secondary/10 border border-secondary/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Consejos para tu búsqueda</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-bold mb-2">1. Usa palabras clave específicas</h4>
                <p className="text-sm text-muted-foreground">
                  Sé preciso con tus búsquedas para obtener resultados más relevantes.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">2. Verifica la fuente</h4>
                <p className="text-sm text-muted-foreground">
                  Asegúrate de que el material provenga de fuentes confiables y académicas.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">3. Cita correctamente</h4>
                <p className="text-sm text-muted-foreground">
                  Siempre cita los recursos que utilices en tus trabajos académicos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
