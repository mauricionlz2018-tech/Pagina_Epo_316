'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Calendar, Zap } from 'lucide-react';

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
        <section className="relative pt-32 pb-40 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex-1 flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="relative text-center">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center animate-spin">
                <Zap className="text-white" size={24} />
              </div>
            </div>
            <p className="text-lg text-blue-50">Cargando noticias...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

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
            Noticias <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">EPO 316.</span>
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Mantente informado sobre eventos, logros y noticias importantes de nuestra institución.
          </p>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <div className="bg-gradient-to-br from-blue-50/50 to-cyan-50/30 dark:from-slate-900/50 dark:to-slate-800/30 border border-blue-100 dark:border-slate-700 rounded-2xl p-12 text-center animate-slide-up">
              <Zap className="text-blue-500 dark:text-blue-400 w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg text-gray-600 dark:text-gray-300">No hay noticias disponibles en este momento.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {news.map((article, index) => (
                <article
                  key={article.id}
                  className="group bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
                      {article.titulo}
                    </h3>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold flex-shrink-0 border border-blue-200 dark:border-blue-800">
                      {article.categoria}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">{article.contenido}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Calendar size={16} className="text-blue-500" />
                      <span>{new Date(article.fecha_creacion).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    {article.publicado ? (
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                        ✓ Publicado
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-600">
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
