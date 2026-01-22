'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, BookOpen, Users } from 'lucide-react';

interface Estudiante {
  id: number;
  nombre: string;
  numero_inscripcion: string;
  grado: string;
  grupo: string;
}

interface Calificacion {
  id: number;
  estudiante_id: number;
  materia: string;
  grado: string;
  grupo: string;
  calificacion_parcial_1: number;
  inasistencias_parcial_1: number;
  calificacion_parcial_2: number;
  inasistencias_parcial_2: number;
  calificacion_parcial_3: number;
  inasistencias_parcial_3: number;
  estudiante_nombre?: string;
}

// MATERIAS POR GRADO EXACTAMENTE COMO LAS ESPECIFICASTE
const MATERIAS_POR_GRADO = {
  '1ro': [
    'Lengua y Comunicación I',
    'Lengua y Comunicación II',
    'Pensamiento Matemático I',
    'Pensamiento Matemático II',
    'Ciencias Naturales, Experimentales y Tecnología I',
    'Ciencias Naturales, Experimentales y Tecnología II',
    'Conciencia Histórica I',
    'Ciencias Sociales I',
    'Pensamiento Filosófico y Humanidades I',
    'Cultura Digital I',
    'Cultura Digital II',
    'Inglés I',
    'Inglés II',
    'Formación Socioemocional',
  ],
  '2do': [
    'Lengua y Comunicación III',
    'Pensamiento Matemático III',
    'Pensamiento Matemático IV',
    'Ciencias Naturales, Experimentales y Tecnología III',
    'Ciencias Naturales, Experimentales y Tecnología IV',
    'Conciencia Histórica II',
    'Ciencias Sociales II',
    'Pensamiento Filosófico y Humanidades II',
    'Cultura Digital III',
    'Inglés III',
    'Inglés IV',
    'Formación Socioemocional',
    'Temas Selectos de Matemáticas',
    'Ciencias Aplicadas',
    'Literatura',
  ],
  '3ro': [
    'Pensamiento Matemático V',
    'Pensamiento Matemático VI',
    'Ciencias Naturales, Experimentales y Tecnología V',
    'Ciencias Naturales, Experimentales y Tecnología VI',
    'Conciencia Histórica III',
    'Ciencias Sociales III',
    'Pensamiento Filosófico y Humanidades III',
    'Inglés V',
    'Formación Socioemocional',
    'Especialización en Ciencias',
    'Especialización en Humanidades',
    'Especialización en Tecnología',
    'Currículum Laboral - Ocupacional Básico',
    'Currículum Laboral - Técnico',
    'Currículum Laboral - Tecnológico',
  ],
};

export default function CalificacionesPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [gradoSeleccionado, setGradoSeleccionado] = useState<string>('');
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<string>('');
  
  const [formData, setFormData] = useState({
    estudiante_id: '',
    materia: '',
    grado: '',
    grupo: '',
    calificacion_parcial_1: '',
    inasistencias_parcial_1: '0',
    calificacion_parcial_2: '',
    inasistencias_parcial_2: '0',
    calificacion_parcial_3: '',
    inasistencias_parcial_3: '0',
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');
      const [resEst, resCal] = await Promise.all([
        fetch('/api/admin/estudiantes'),
        fetch('/api/admin/calificaciones'),
      ]);

      if (!resEst.ok || !resCal.ok) throw new Error('Error al cargar datos');

      const dataEst = await resEst.json();
      const dataCal = await resCal.json();

      setEstudiantes(dataEst.estudiantes || []);
      
      const calificacionesConNombre = (dataCal.calificaciones || []).map((cal: Calificacion) => {
        const estudiante = (dataEst.estudiantes || []).find((e: Estudiante) => e.id === cal.estudiante_id);
        return {
          ...cal,
          estudiante_nombre: estudiante?.nombre || 'Desconocido'
        };
      });
      
      setCalificaciones(calificacionesConNombre);
    } catch (error: any) {
      setError(`Error al cargar datos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/admin/calificaciones', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en la operación');

      setSuccess(editingId ? 'Calificación actualizada exitosamente' : 'Calificación agregada exitosamente');
      setFormData({
        estudiante_id: '',
        materia: '',
        grado: gradoSeleccionado,
        grupo: '',
        calificacion_parcial_1: '',
        inasistencias_parcial_1: '0',
        calificacion_parcial_2: '',
        inasistencias_parcial_2: '0',
        calificacion_parcial_3: '',
        inasistencias_parcial_3: '0',
      });
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => {
        cargarDatos();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEdit = (calificacion: Calificacion) => {
    setFormData({
      estudiante_id: String(calificacion.estudiante_id),
      materia: calificacion.materia,
      grado: calificacion.grado,
      grupo: calificacion.grupo,
      calificacion_parcial_1: String(calificacion.calificacion_parcial_1 || ''),
      inasistencias_parcial_1: String(calificacion.inasistencias_parcial_1 || '0'),
      calificacion_parcial_2: String(calificacion.calificacion_parcial_2 || ''),
      inasistencias_parcial_2: String(calificacion.inasistencias_parcial_2 || '0'),
      calificacion_parcial_3: String(calificacion.calificacion_parcial_3 || ''),
      inasistencias_parcial_3: String(calificacion.inasistencias_parcial_3 || '0'),
    });
    setEditingId(calificacion.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta calificación?')) return;

    try {
      setError('');
      const res = await fetch(`/api/admin/calificaciones?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('Calificación eliminada exitosamente');
      setTimeout(() => {
        cargarDatos();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const estudiantesPorGrado = gradoSeleccionado
    ? estudiantes.filter(est => est.grado === gradoSeleccionado)
    : [];

  const calificacionesFiltradas = calificaciones.filter(cal => {
    const matchGrado = !gradoSeleccionado || cal.grado === gradoSeleccionado;
    const matchEstudiante = !estudianteSeleccionado || cal.estudiante_id === Number(estudianteSeleccionado);
    return matchGrado && matchEstudiante;
  });

  // OBTENER MATERIAS SEGÚN EL GRADO DEL ESTUDIANTE SELECCIONADO
  const materiasDisponibles = formData.estudiante_id
    ? (() => {
        const estudiante = estudiantes.find(e => e.id === Number(formData.estudiante_id));
        return estudiante ? MATERIAS_POR_GRADO[estudiante.grado as keyof typeof MATERIAS_POR_GRADO] || [] : [];
      })()
    : [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calificaciones</h1>
          <p className="text-gray-500 mt-1">Administra las calificaciones de los estudiantes</p>
        </div>
      </div>

      {/* MENSAJES */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg text-green-700">
          <strong>Éxito:</strong> {success}
        </div>
      )}

      {/* DIÁLOGO DE FORMULARIO */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingId ? 'Editar Calificación' : 'Nueva Calificación'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* SELECCIÓN DE ESTUDIANTE Y MATERIA */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Información Básica
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Estudiante <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.estudiante_id}
                    onChange={(e) => {
                      const estudiante = estudiantes.find(est => est.id === Number(e.target.value));
                      setFormData({ 
                        ...formData, 
                        estudiante_id: e.target.value,
                        materia: '', // Reset materia cuando cambia estudiante
                        grado: estudiante?.grado || '',
                        grupo: estudiante?.grupo || '',
                      });
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  >
                    <option value="">Selecciona un estudiante...</option>
                    {estudiantesPorGrado.map(est => (
                      <option key={est.id} value={est.id}>
                        {est.nombre} - Grupo {est.grupo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Materia <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.materia}
                    onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                    disabled={!formData.estudiante_id}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {formData.estudiante_id 
                        ? 'Selecciona una materia...' 
                        : 'Primero selecciona un estudiante'}
                    </option>
                    {materiasDisponibles.map(materia => (
                      <option key={materia} value={materia}>{materia}</option>
                    ))}
                  </select>
                  {formData.estudiante_id && (
                    <p className="text-xs text-gray-500 mt-1">
                      Materias disponibles para {formData.grado === '1ro' ? 'Primer' : formData.grado === '2do' ? 'Segundo' : 'Tercer'} grado
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* PARCIAL 1 */}
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-xl mb-4 text-blue-700">
                Primer Parcial
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Calificación (0-10)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.calificacion_parcial_1}
                    onChange={(e) => setFormData({ ...formData, calificacion_parcial_1: e.target.value })}
                    placeholder="Ejemplo: 8.5"
                    className="text-2xl font-bold text-center py-6 border-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Inasistencias
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inasistencias_parcial_1}
                    onChange={(e) => setFormData({ ...formData, inasistencias_parcial_1: e.target.value })}
                    placeholder="Número de faltas"
                    className="text-2xl font-bold text-center py-6 border-2"
                  />
                </div>
              </div>
            </div>

            {/* PARCIAL 2 */}
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-xl mb-4 text-green-700">
                Segundo Parcial
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Calificación (0-10)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.calificacion_parcial_2}
                    onChange={(e) => setFormData({ ...formData, calificacion_parcial_2: e.target.value })}
                    placeholder="Ejemplo: 9.0"
                    className="text-2xl font-bold text-center py-6 border-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Inasistencias
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inasistencias_parcial_2}
                    onChange={(e) => setFormData({ ...formData, inasistencias_parcial_2: e.target.value })}
                    placeholder="Número de faltas"
                    className="text-2xl font-bold text-center py-6 border-2"
                  />
                </div>
              </div>
            </div>

            {/* PARCIAL 3 */}
            <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold text-xl mb-4 text-purple-700">
                Tercer Parcial
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Calificación (0-10)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.calificacion_parcial_3}
                    onChange={(e) => setFormData({ ...formData, calificacion_parcial_3: e.target.value })}
                    placeholder="Ejemplo: 8.8"
                    className="text-2xl font-bold text-center py-6 border-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Inasistencias
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inasistencias_parcial_3}
                    onChange={(e) => setFormData({ ...formData, inasistencias_parcial_3: e.target.value })}
                    placeholder="Número de faltas"
                    className="text-2xl font-bold text-center py-6 border-2"
                  />
                </div>
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6"
              >
                {editingId ? 'Guardar Cambios' : 'Agregar Calificación'}
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-lg py-6"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* PASO 1: SELECCIONAR GRADO */}
      <Card className="p-4 md:p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <h3 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
          <BookOpen size={20} className="md:w-6 md:h-6" />
          Paso 1: Selecciona el Grado
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: '1ro', label: 'Primer Grado' },
            { value: '2do', label: 'Segundo Grado' },
            { value: '3ro', label: 'Tercer Grado' }
          ].map(grado => (
            <button
              key={grado.value}
              onClick={() => {
                setGradoSeleccionado(grado.value);
                setEstudianteSeleccionado('');
              }}
              className={`p-4 md:p-6 rounded-lg font-bold text-lg md:text-xl transition-all ${
                gradoSeleccionado === grado.value
                  ? 'bg-white text-blue-600 shadow-xl'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur'
              }`}
            >
              {grado.label}
            </button>
          ))}
        </div>
      </Card>

      {/* PASO 2: BOTONES DE ACCIÓN */}
      {gradoSeleccionado && (
        <div className="flex items-center justify-between gap-4">
          <Card className="flex-1 p-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Filtrar por Estudiante (Opcional)
            </label>
            <select
              value={estudianteSeleccionado}
              onChange={(e) => setEstudianteSeleccionado(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estudiantes de {gradoSeleccionado}</option>
              {estudiantesPorGrado.map(est => (
                <option key={est.id} value={est.id}>
                  {est.nombre} - Grupo {est.grupo}
                </option>
              ))}
            </select>
          </Card>
          
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                estudiante_id: '',
                materia: '',
                grado: gradoSeleccionado,
                grupo: '',
                calificacion_parcial_1: '',
                inasistencias_parcial_1: '0',
                calificacion_parcial_2: '',
                inasistencias_parcial_2: '0',
                calificacion_parcial_3: '',
                inasistencias_parcial_3: '0',
              });
              setError('');
            }}
            className="gap-2 bg-green-600 hover:bg-green-700 shadow-lg px-8 py-6 text-lg"
          >
            <Plus size={20} />
            Nueva Calificación
          </Button>
        </div>
      )}

      {/* TABLA */}
      {loading ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            Cargando calificaciones...
          </div>
        </Card>
      ) : !gradoSeleccionado ? (
        <Card className="p-12 text-center bg-gray-50">
          <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700">Selecciona un grado para comenzar</p>
          <p className="text-gray-500 mt-2">Elige Primero, Segundo o Tercero para ver las calificaciones</p>
        </Card>
      ) : (
        <Card className="overflow-hidden shadow-lg">
          {calificacionesFiltradas.length === 0 ? (
            <div className="p-12 text-center bg-gray-50">
              <Users size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">No hay calificaciones registradas</p>
              <p className="text-gray-500 mt-2">Haz clic en "Nueva Calificación" para agregar una</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Estudiante</th>
                    <th className="px-4 py-3 text-left font-semibold">Materia</th>
                    <th className="px-4 py-3 text-center font-semibold">Grupo</th>
                    <th className="px-4 py-3 text-center font-semibold bg-blue-700">
                      Parcial 1<br/>
                      <span className="text-xs font-normal opacity-75">Cal / Faltas</span>
                    </th>
                    <th className="px-4 py-3 text-center font-semibold bg-green-700">
                      Parcial 2<br/>
                      <span className="text-xs font-normal opacity-75">Cal / Faltas</span>
                    </th>
                    <th className="px-4 py-3 text-center font-semibold bg-purple-700">
                      Parcial 3<br/>
                      <span className="text-xs font-normal opacity-75">Cal / Faltas</span>
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {calificacionesFiltradas.map((cal, index) => (
                    <tr 
                      key={cal.id} 
                      className={`border-t hover:bg-blue-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold">{cal.estudiante_nombre}</td>
                      <td className="px-4 py-3 text-sm">{cal.materia}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm">
                          {cal.grupo}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center bg-blue-50">
                        <div className="font-bold text-xl text-blue-700">
                          {cal.calificacion_parcial_1 ? Number(cal.calificacion_parcial_1).toFixed(1) : '-'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {cal.inasistencias_parcial_1 || 0} faltas
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center bg-green-50">
                        <div className="font-bold text-xl text-green-700">
                          {cal.calificacion_parcial_2 ? Number(cal.calificacion_parcial_2).toFixed(1) : '-'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {cal.inasistencias_parcial_2 || 0} faltas
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center bg-purple-50">
                        <div className="font-bold text-xl text-purple-700">
                          {cal.calificacion_parcial_3 ? Number(cal.calificacion_parcial_3).toFixed(1) : '-'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {cal.inasistencias_parcial_3 || 0} faltas
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(cal)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(cal.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}