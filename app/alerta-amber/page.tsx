import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { AlertTriangle, Phone, MapPin, Info } from 'lucide-react';

export default function AlertaAmberPage() {
  const alertasActivas = [
    {
      id: 1,
      nombre: 'María González López',
      edad: 16,
      fechaDesaparicion: '19 de enero de 2026',
      lugarDesaparicion: 'Toluca, Estado de México',
      descripcion: 'Desapareció el 19 de enero de 2026. Complexión delgada, cabello negro largo.',
      contacto: 'Policía Estatal - (800) 123-4567',
      imagen: '👧',
    },
    {
      id: 2,
      nombre: 'Carlos Mendez Rivas',
      edad: 17,
      fechaDesaparicion: '15 de enero de 2026',
      lugarDesaparicion: 'Metepec, Estado de México',
      descripcion: 'Desapareció el 15 de enero. Altura promedio, ojos cafés.',
      contacto: 'Policía Estatal - (800) 123-4567',
      imagen: '👦',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-destructive text-destructive-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <AlertTriangle size={40} />
            <div>
              <h1 className="text-5xl font-bold text-black">Alerta Amber</h1>
              <p className="text-lg opacity-90 mt-2 text-black">Sistema de búsqueda de menores desaparecidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Información General */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-8 mb-12">
            <div className="flex gap-4">
              <Info className="text-destructive flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="font-bold text-lg mb-2">¿Qué es la Alerta Amber?</h2>
                <p className="text-muted-foreground">
                  Es un sistema de alerta emitido cuando un menor de edad ha desaparecido en circunstancias que sugieren que su vida está en peligro. La alerta se distribuye a través de medios de comunicación, redes sociales y sitios web para movilizar a la comunidad en la búsqueda.
                </p>
              </div>
            </div>
          </div>

          {/* Menores Buscados */}
          <h2 className="text-3xl font-bold mb-8">Menores Buscados Actualmente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alertasActivas.map((alerta) => (
              <div
                key={alerta.id}
                className="border-4 border-destructive rounded-xl p-8 bg-card hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{alerta.imagen}</div>
                  <h3 className="text-2xl font-bold text-destructive">{alerta.nombre}</h3>
                  <p className="text-muted-foreground mt-2">
                    <strong>{alerta.edad} años</strong> • Desaparecido desde el <strong>{alerta.fechaDesaparicion}</strong>
                  </p>
                </div>

                <div className="space-y-4 mb-6 border-t border-b border-border py-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-destructive flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-sm">Lugar de Desaparición</p>
                      <p className="text-muted-foreground text-sm">{alerta.lugarDesaparicion}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-2">Descripción</p>
                    <p className="text-muted-foreground text-sm">{alerta.descripcion}</p>
                  </div>
                </div>

                <div className="bg-destructive/10 rounded-lg p-4 flex items-start gap-3">
                  <Phone className="text-destructive flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-semibold text-sm">Información/Reporte</p>
                    <p className="text-destructive font-bold">{alerta.contacto}</p>
                    <p className="text-xs text-muted-foreground mt-1">Disponible 24/7</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Ayudar */}
      <section className="bg-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">¿Cómo Puedo Ayudar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-bold text-lg mb-2">Reporta Avistamientos</h3>
              <p className="text-muted-foreground text-sm">Si ves a alguien que coincida con la descripción, llama de inmediato al número de emergencia.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="font-bold text-lg mb-2">Comparte la Información</h3>
              <p className="text-muted-foreground text-sm">Difunde estas alertas en redes sociales, grupos de whatsapp y comunidades locales.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="font-bold text-lg mb-2">Permanece Alerta</h3>
              <p className="text-muted-foreground text-sm">Observa tu entorno y mantente atenta a cualquier información relevante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Recursos y Enlaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="font-bold text-lg mb-3">Líneas de Emergencia</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Emergencias:</strong> 911</li>
                <li><strong>Alerta Amber México:</strong> 01-800-Amber-01</li>
                <li><strong>Policía Estatal:</strong> (800) 123-4567</li>
                <li><strong>Procuraduría General:</strong> (800) 000-1010</li>
              </ul>
            </div>
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="font-bold text-lg mb-3">Instituciones Colaboradoras</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Secretaría de Seguridad Pública</li>
                <li>• Procuraduría General de Justicia</li>
                <li>• FGJEMS (Fiscalía)</li>
                <li>• Organizaciones de Derechos Humanos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
