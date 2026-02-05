'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Calendar } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    try {
      const res = await fetch('/api/admin/noticias');
      const data = await res.json();
      setNews(data.noticias || []);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <section className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Cargando noticias...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

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
          {news.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <p className="text-muted-foreground">No hay noticias disponibles en este momento.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {news.map((article) => (
                <article
                  key={article.id}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-primary flex-1">{article.titulo}</h3>
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold flex-shrink-0">
                      {article.categoria}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3">{article.contenido}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(article.fecha_creacion).toLocaleDateString('es-MX')}</span>
                    </div>
                    {article.publicado ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        Publicado
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                        Borrador
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
