'use client';

import React from "react"

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Contacto</h1>
          <p className="text-lg opacity-90 mt-2">Ponte en contacto con nosotros</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Información de Contacto</h2>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Ubicación</h3>
                    <p className="text-muted-foreground">
                      Escuela Preparatoria Oficial Núm. 316
                      <br />
                      San José del Rincón, Estado de México, México
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Teléfono</h3>
                    <p className="text-muted-foreground">+52 (555) 123-4567</p>
                    <p className="text-muted-foreground text-sm mt-1">Lunes a Viernes, 8:00 AM - 3:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold mb-1">Correo Electrónico</h3>
                    <p className="text-muted-foreground">infoepo316@gmail.com</p>
                    <p className="text-muted-foreground">admisionesepo316@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h3 className="font-bold mb-4">Horario de Atención</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lunes a Viernes:</span>
                    <span>8:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabado y Domingo:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Envíanos un Mensaje</h2>

            {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                  ✓ Mensaje enviado correctamente. Te hemos enviado una confirmación a tu correo. Nos pondremos en contacto pronto.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
                  Error: {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Asunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="admisiones">Admisiones</option>
                    <option value="academico">Académico</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tu mensaje..."
                    rows={5}
                    required
                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensaje
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
