import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Acerca de Nosotros</h1>
          <p className="text-lg opacity-90 mt-2">Conoce la historia y misión de EPO 316</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Historia */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              La Escuela Preparatoria Oficial Núm. 316 fue fundada con la misión de proporcionar educación de calidad a los jóvenes del Estado de México. Durante años, hemos formado generaciones de estudiantes comprometidos con el conocimiento y los valores humanistas.
            </p>
          </div>

          {/* Misión */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Somos una institución de educación media superior dedicada a la enseñanza por competencias, investigación, y  Vinculación que se distingue por su enfoque de excelencia educativa, 
              haciendo partícipe a la comunidad, con el propósito de fomentar en los estudiantes el saber ser, hacer, pensar, aprender, crear y convivir permitiendo así un desarrollo integral.
            </p>
          </div>

          {/* Visión */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Visión</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Consolidarse como una institución de educación media superior competitiva, pertinente y reconocida en el área educativa local, regional y estatal respondiendo con calidad 
              académica las demandas de los jóvenes que les permitan el desarrollo de competencias científicas, culturales, humanas y tecnológicas.
            </p>
          </div>

          {/* Valores */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl">
                <h3 className="font-bold text-lg mb-2">Excelencia</h3>
                <p className="text-muted-foreground">Compromiso con la calidad en todas nuestras acciones.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl">
                <h3 className="font-bold text-lg mb-2">Integridad</h3>
                <p className="text-muted-foreground">Actuamos con honestidad y coherencia en nuestros principios.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl">
                <h3 className="font-bold text-lg mb-2">Inclusión</h3>
                <p className="text-muted-foreground">Valoramos la diversidad y promovemos oportunidades para todos.</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-xl">
                <h3 className="font-bold text-lg mb-2">Innovación</h3>
                <p className="text-muted-foreground">Buscamos constantemente nuevas formas de mejorar la educación.</p>
              </div>
            </div>
          </div>  
        </div>
      </section>

      <Footer />
    </div>
  );
}
