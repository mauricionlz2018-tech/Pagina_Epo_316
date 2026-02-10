'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BoletaGenerator } from '@/components/boleta-generator';
import { Search, Download, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Estudiante {
  id: number;
  nombre: string;
  numero_inscripcion: string;
  grado: string;
  grupo: string;
  email?: string;
}

interface Calificacion {
  materia: string;
  calificacion_parcial_1: number | null;
  calificacion_parcial_2: number | null;
  calificacion_parcial_3: number | null;
  inasistencias_parcial_1: number;
  inasistencias_parcial_2: number;
  inasistencias_parcial_3: number;
}

interface BoletaData {
  nombre_estudiante: string;
  grado: string;
  grupo: string;
  ciclo_escolar: string;
  calificaciones: Array<{
    materia: string;
    calificacion_1: number | null;
    calificacion_2: number | null;
    calificacion_3: number | null;
    inasistencias_1: number;
    inasistencias_2: number;
    inasistencias_3: number;
  }>;
}

export default function BoletasPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [filtrados, setFiltrados] = useState<Estudiante[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedEstudiante, setSelectedEstudiante] = useState<Estudiante | null>(null);
  const [boletaData, setBoletaData] = useState<BoletaData | null>(null);
  const [showBoletaModal, setShowBoletaModal] = useState(false);
  const [generandoBoleta, setGenerandoBoleta] = useState(false);

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/admin/estudiantes');
      if (!response.ok) throw new Error('Error al cargar estudiantes');

      const data = await response.json();
      setEstudiantes(data.estudiantes || []);
      setFiltrados(data.estudiantes || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar estudiantes');
    } finally {
      setLoading(false);
    }
  };

  const handleBusqueda = (valor: string) => {
    setBusqueda(valor);
    const busquedaLower = valor.toLowerCase();

    const resultados = estudiantes.filter(
      (e) =>
        e.nombre.toLowerCase().includes(busquedaLower) ||
        e.numero_inscripcion.toLowerCase().includes(busquedaLower) ||
        e.grado.includes(valor) ||
        e.grupo.toLowerCase().includes(busquedaLower)
    );

    setFiltrados(resultados);
  };

  const cargarBoletaEstudiante = async (estudiante: Estudiante) => {
    try {
      setGenerandoBoleta(true);
      setError('');
      setSelectedEstudiante(estudiante);

      // Obtener calificaciones del estudiante
      const response = await fetch(
        `/api/admin/calificaciones?estudiante_id=${estudiante.id}`
      );

      if (!response.ok) {
        throw new Error('Error al obtener calificaciones');
      }

      const data = await response.json();
      const calificaciones: Calificacion[] = data.calificaciones || [];

      // Preparar datos para la boleta
      const boletaInfo: BoletaData = {
        nombre_estudiante: estudiante.nombre,
        grado: estudiante.grado,
        grupo: estudiante.grupo,
        ciclo_escolar: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString(),
        calificaciones: calificaciones.map((cal) => ({
          materia: cal.materia,
          calificacion_1: cal.calificacion_parcial_1,
          calificacion_2: cal.calificacion_parcial_2,
          calificacion_3: cal.calificacion_parcial_3,
          inasistencias_1: cal.inasistencias_parcial_1,
          inasistencias_2: cal.inasistencias_parcial_2,
          inasistencias_3: cal.inasistencias_parcial_3,
        })),
      };

      setBoletaData(boletaInfo);
      setShowBoletaModal(true);
      setSuccess('Boleta cargada exitosamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al cargar la boleta');
    } finally {
      setGenerandoBoleta(false);
    }
  };

  const calcularPromedio = (notas: (number | null)[]): string => {
    const notasValidas = notas.filter((n) => n !== null) as number[];
    if (notasValidas.length === 0) return 'Sin datos';
    const promedio = notasValidas.reduce((a, b) => a + b) / notasValidas.length;
    return promedio.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ENCABEZADO */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Gestión de Boletas
          </h1>
          <p className="text-muted-foreground">
            Consulta y descarga boletas de calificaciones de estudiantes
          </p>
        </div>

        {/* MENSAJES */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-800 flex items-center gap-3">
            <AlertCircle size={24} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg text-green-800 flex items-center gap-3">
            <CheckCircle2 size={24} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* BÚSQUEDA */}
        <Card className="p-4 md:p-6 mb-8 bg-primary/5 border-primary/20">
          <div className="flex gap-2 items-center">
            <Search className="text-primary" size={20} />
            <Input
              type="text"
              placeholder="Buscar por nombre, número de inscripción, grado o grupo..."
              value={busqueda}
              onChange={(e) => handleBusqueda(e.target.value)}
              className="flex-1"
            />
          </div>
          {busqueda && (
            <p className="text-sm text-muted-foreground mt-2">
              {filtrados.length} resultados encontrados
            </p>
          )}
        </Card>

        {/* LISTA DE ESTUDIANTES */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-muted-foreground">Cargando estudiantes...</p>
            </div>
          </div>
        ) : filtrados.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {busqueda
                ? 'No se encontraron estudiantes que coincidan con tu búsqueda'
                : 'No hay estudiantes registrados'}
            </p>
            {busqueda && (
              <Button
                variant="outline"
                onClick={() => {
                  setBusqueda('');
                  setFiltrados(estudiantes);
                }}
              >
                Limpiar búsqueda
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid gap-4 md:gap-6">
            {filtrados.map((estudiante) => (
              <Card
                key={estudiante.id}
                className="p-4 md:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {estudiante.nombre}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">No. Inscripción:</p>
                        <p className="font-semibold">{estudiante.numero_inscripcion}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Grado:</p>
                        <p className="font-semibold">{estudiante.grado}°</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Grupo:</p>
                        <p className="font-semibold">{estudiante.grupo}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email:</p>
                        <p className="font-semibold text-xs break-all">
                          {estudiante.email || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => cargarBoletaEstudiante(estudiante)}
                      disabled={generandoBoleta}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Eye size={18} className="mr-2" />
                      Ver Boleta
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE BOLETA */}
      <Dialog open={showBoletaModal} onOpenChange={setShowBoletaModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Download size={24} />
              Boleta de {selectedEstudiante?.nombre}
            </DialogTitle>
          </DialogHeader>

          {boletaData && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted p-4 rounded-lg text-sm">
                <div>
                  <p className="text-muted-foreground">Estudiante:</p>
                  <p className="font-bold">{boletaData.nombre_estudiante}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Grado:</p>
                  <p className="font-bold">{boletaData.grado}°</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Grupo:</p>
                  <p className="font-bold">{boletaData.grupo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ciclo Escolar:</p>
                  <p className="font-bold">{boletaData.ciclo_escolar}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="border p-2 text-left">Materia</th>
                      <th className="border p-2 text-center">1er Parcial</th>
                      <th className="border p-2 text-center">2do Parcial</th>
                      <th className="border p-2 text-center">3er Parcial</th>
                      <th className="border p-2 text-center">Promedio</th>
                      <th className="border p-2 text-center">Inasistencias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boletaData.calificaciones.map((cal, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-muted/50' : ''}>
                        <td className="border p-2 font-semibold">{cal.materia}</td>
                        <td className="border p-2 text-center">
                          {cal.calificacion_1 ? cal.calificacion_1.toFixed(2) : '-'}
                        </td>
                        <td className="border p-2 text-center">
                          {cal.calificacion_2 ? cal.calificacion_2.toFixed(2) : '-'}
                        </td>
                        <td className="border p-2 text-center">
                          {cal.calificacion_3 ? cal.calificacion_3.toFixed(2) : '-'}
                        </td>
                        <td className="border p-2 text-center font-bold">
                          {calcularPromedio([
                            cal.calificacion_1,
                            cal.calificacion_2,
                            cal.calificacion_3,
                          ])}
                        </td>
                        <td className="border p-2 text-center">
                          {cal.inasistencias_1 + cal.inasistencias_2 + cal.inasistencias_3}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    if (boletaData) {
                      // El componente BoletaGenerator maneja la descarga
                      document.getElementById('boleta-generator')?.click();
                    }
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Download size={18} className="mr-2" />
                  Descargar PDF
                </Button>
                <Button
                  onClick={() => setShowBoletaModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cerrar
                </Button>
              </div>

              {boletaData && (
                <div className="hidden">
                  <BoletaGenerator data={boletaData} />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
