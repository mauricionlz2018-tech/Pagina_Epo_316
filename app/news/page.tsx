import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Calendar, User } from 'lucide-react';

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: 'Inicio del Nuevo Ciclo Escolar 2024-2025',
      excerpt: 'Bienvenido a un nuevo semestre lleno de aprendizajes y oportunidades.',
      date: '2024-01-15',
      author: 'Dirección General',
      category: 'Eventos',
    },
    {
      id: 2,
      title: 'Premiaciones de Excelencia Académica',
      excerpt: 'Nuestros estudiantes destacados reciben reconocimiento por su desempeño.',
      date: '2024-01-10',
      author: 'Coordinación Académica',
      category: 'Logros',
    },
    {
      id: 3,
      title: 'Talleres de Orientación Vocacional',
      excerpt: 'Sesiones informativas para ayudarte a elegir tu carrera profesional.',
      date: '2024-01-05',
      author: 'Orientación',
      category: 'Talleres',
    },
    {
      id: 4,
      title: 'Competencia de Robótica EPO 316',
      excerpt: 'Estudiantes de técnica participan en competencia estatal de robótica.',
      date: '2023-12-28',
      author: 'Laboratorio de Tecnología',
      category: 'Competencias',
    },
    {
      id: 5,
      title: 'Programa de Becas Disponibles',
      excerpt: 'Nuevas oportunidades de apoyo económico para estudiantes destacados.',
      date: '2023-12-20',
      author: 'Administración',
      category: 'Becas',
    },
    {
      id: 6,
      title: 'Jornada de Limpieza Ambiental',
      excerpt: 'Estudiantes participan en actividades de sostenibilidad ambiental.',
      date: '2023-12-15',
      author: 'Responsabilidad Social',
      category: 'Comunidad',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Noticias</h1>
          <p className="text-lg opacity-90 mt-2">Mantente informado sobre los eventos de EPO 316</p>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {news.map((article) => (
              <article
                key={article.id}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-primary flex-1">{article.title}</h3>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold flex-shrink-0">
                    {article.category}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{article.excerpt}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(article.date).toLocaleDateString('es-MX')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
