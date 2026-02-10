'use client';

import React from "react"
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ocurrió un error al enviar tu mensaje');
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError('Error de conexión. Por favor intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

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
            Ponte en <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">contacto.</span>
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Nos encantaría escucharte. Contáctanos para cualquier pregunta o información.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 animate-slide-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Información de contacto.</h2>

              <div className="space-y-6">
                <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-500/50">
                  <div className="flex gap-4 items-start">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Ubicación</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Escuela Preparatoria Oficial Núm. 316
                        <br />
                        San José del Rincón, Estado de México, México
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-500/50">
                  <div className="flex gap-4 items-start">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Teléfono</h3>
                      <p className="text-gray-600 dark:text-gray-400">+52 (555) 123-4567</p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">Lunes a viernes, 8:00 AM - 3:00 PM.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-500/50">
                  <div className="flex gap-4 items-start">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Correo electrónico</h3>
                      <p className="text-gray-600 dark:text-gray-400">infoepo316@gmail.com</p>
                      <p className="text-gray-600 dark:text-gray-400">admisionesepo316@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-blue-50/50 to-cyan-50/30 dark:from-slate-900/50 dark:to-slate-800/30 border border-blue-100 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-4 items-start">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Horario de atención.</h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between">
                          <span>Lunes a viernes:</span>
                          <span className="font-semibold">8:00 AM - 3:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sábado y domingo:</span>
                          <span className="font-semibold">Cerrado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-up delay-100">
              <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Envíanos un mensaje.</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-xl text-emerald-800 dark:text-emerald-200 animate-slide-down">
                  ✓ Mensaje enviado correctamente. Te hemos enviado una confirmación a tu correo. Nos pondremos en contacto pronto.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl text-red-800 dark:text-red-200 animate-slide-down">
                  Error: {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">Tu nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    required
                    className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 bg-gray-50 dark:bg-slate-700 dark:text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">Tu correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 bg-gray-50 dark:bg-slate-700 dark:text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">Asunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 bg-gray-50 dark:bg-slate-700 dark:text-white transition-all"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="admisiones">Admisiones</option>
                    <option value="academico">Académico</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tu mensaje aquí..."
                    rows={5}
                    required
                    className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 bg-gray-50 dark:bg-slate-700 dark:text-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
