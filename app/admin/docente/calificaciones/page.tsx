'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, BookOpen, Users, Upload, FileText, Download, X } from 'lucide-react';

interface Materia {
  id: number;
  nombre: string;
  clave: string;
  grado: string;
  creditos: number;
}

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

interface Evidencia {
  id: number;
  parcial: number;
  nombre_archivo: string;
  ruta_archivo: string;
  descripcion: string;
  fecha_creacion: string;
}

export default function DocenteCalificacionesPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showEvidenciasModal, setShowEvidenciasModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profesorId, setProfesorId] = useState<string>('');

  const [materiaSeleccionada, setMateriaSeleccionada] = useState<string>('');
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<string>('');
  const [selectedCalificacion, setSelectedCalificacion] = useState<Calificacion | null>(null);
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [uploadingEvidencia, setUploadingEvidencia] = useState(false);

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
    const token = localStorage.getItem('admin_token');
    const role = localStorage.getItem('user_role');
    
    if (!token || role !== 'docente') {
      window.location.href = '/admin/login';
      return;
    }

    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');

      // Obtener profesor_id desde la sesión (simulado con localStorage)
      const storedProfesorId = localStorage.getItem('profesor_id');
      if (!storedProfesorId) {
        // Para demo, usar profesor_id = 1 (Roberto García)
        localStorage.setItem('profesor_id', '1');
        setProfesorId('1');
      } else {
        setProfesorId(storedProfesorId);
      }

      const pId = storedProfesorId || '1';

      // Cargar materias del docente
      const resMaterias = await fetch(`/api/admin/docente/materias?profesor_id=${pId}`);
      const dataMaterias = await resMaterias.json();
      setMaterias(dataMaterias.materias || []);

      // Cargar estudiantes del docente
      const resEstudiantes = await fetch(`/api/admin/docente/estudiantes?profesor_id=${pId}`);
      const dataEstudiantes = await resEstudiantes.json();
      setEstudiantes(dataEstudiantes.estudiantes || []);

      // Cargar calificaciones del docente
      const resCalificaciones = await fetch(`/api/admin/docente/calificaciones?profesor_id=${pId}`);
      const dataCalificaciones = await resCalificaciones.json();
      setCalificaciones(dataCalificaciones.calificaciones || []);
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
      const body = editingId 
        ? { ...formData, id: editingId, profesor_id: profesorId } 
        : { ...formData, profesor_id: profesorId };

      const res = await fetch('/api/admin/docente/calificaciones', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en la operación');

      setSuccess(editingId ? 'Calificación actualizada exitosamente' : 'Calificación agregada exitosamente');
      setFormData({
        estudiante_id: '',
        materia: materiaSeleccionada,
        grado: '',
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
      const res = await fetch(`/api/admin/docente/calificaciones?id=${id}&profesor_id=${profesorId}`, { 
        method: 'DELETE' 
      });
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

  const handleVerEvidencias = async (calificacion: Calificacion) => {
    setSelectedCalificacion(calificacion);
    try {
      const res = await fetch(`/api/admin/docente/evidencias?calificacion_id=${calificacion.id}&profesor_id=${profesorId}`);
      const data = await res.json();
      setEvidencias(data.evidencias || []);
    } catch (error) {
      console.error('Error al cargar evidencias:', error);
      setEvidencias([]);
    }
    setShowEvidenciasModal(true);
  };

  const handleUploadEvidencia = async (e: React.FormEvent<HTMLFormElement>, parcial: number) => {
    e.preventDefault();
    if (!selectedCalificacion) return;

    const formDataUpload = new FormData(e.currentTarget);
    formDataUpload.append('calificacion_id', String(selectedCalificacion.id));
    formDataUpload.append('profesor_id', profesorId);
    formDataUpload.append('parcial', String(parcial));

    try {
      setUploadingEvidencia(true);
      const res = await fetch('/api/admin/docente/evidencias', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al subir evidencia');

      setSuccess('Evidencia subida exitosamente');
      setTimeout(() => {
        handleVerEvidencias(selectedCalificacion);
        setSuccess('');
      }, 1500);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploadingEvidencia(false);
    }
  };

  const handleDeleteEvidencia = async (evidenciaId: number) => {
    if (!confirm('¿Estás seguro de eliminar esta evidencia?')) return;

    try {
      const res = await fetch(`/api/admin/docente/evidencias?id=${evidenciaId}&profesor_id=${profesorId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('Evidencia eliminada exitosamente');
      setTimeout(() => {
        if (selectedCalificacion) {
          handleVerEvidencias(selectedCalificacion);
        }
        setSuccess('');
      }, 1500);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const estudiantesPorMateria = materiaSeleccionada
    ? estudiantes.filter(est => {
        const tieneMateria = calificaciones.some(
          cal => cal.materia === materiaSeleccionada && cal.estudiante_id === est.id
        );
        return tieneMateria;
      })
    : [];

  const calificacionesFiltradas = calificaciones.filter(cal => {
    const matchMateria = !materiaSeleccionada || cal.materia === materiaSeleccionada;
    const matchEstudiante = !estudianteSeleccionado || cal.estudiante_id === Number(estudianteSeleccionado);
    return matchMateria && matchEstudiante;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Calificaciones</h1>
          <p className="text-gray-500 mt-1">Gestiona las calificaciones de tus estudiantes</p>
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
                    Materia <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.materia}
                    onChange={(e) => {
                      setFormData({ ...formData, materia: e.target.value, estudiante_id: '' });
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  >
                    <option value="">Selecciona una materia...</option>
                    {materias.map(materia => (
                      <option key={materia.id} value={materia.nombre}>
                        {materia.nombre} ({materia.grado})
                      </option>
                    ))}
                  </select>
                </div>

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
                        grado: estudiante?.grado || '',
                        grupo: estudiante?.grupo || '',
                      });
                    }}
                    disabled={!formData.materia}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {formData.materia ? 'Selecciona un estudiante...' : 'Primero selecciona una materia'}
                    </option>
                    {estudiantesPorMateria.map(est => (
                      <option key={est.id} value={est.id}>
                        {est.nombre} - Grupo {est.grupo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* PARCIAL 1 */}
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-xl mb-4 text-blue-700">Primer Parcial</h3>
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
              <h3 className="font-bold text-xl mb-4 text-green-700">Segundo Parcial</h3>
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
              <h3 className="font-bold text-xl mb-4 text-purple-700">Tercer Parcial</h3>
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

      {/* MODAL DE EVIDENCIAS */}
      <Dialog open={showEvidenciasModal} onOpenChange={setShowEvidenciasModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Evidencias - {selectedCalificacion?.estudiante_nombre}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {[1, 2, 3].map(parcial => (
              <div key={parcial} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-4">Parcial {parcial}</h3>

                {/* Evidencias existentes */}
                <div className="mb-4 space-y-2">
                  {evidencias
                    .filter(e => e.parcial === parcial)
                    .map(evidencia => (
                      <div key={evidencia.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex items-center gap-2">
                          <FileText size={20} className="text-blue-600" />
                          <div>
                            <p className="font-semibold text-sm">{evidencia.nombre_archivo}</p>
                            {evidencia.descripcion && (
                              <p className="text-xs text-gray-600">{evidencia.descripcion}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={evidencia.ruta_archivo}
                            download
                            className="p-2 hover:bg-blue-100 rounded"
                            title="Descargar"
                          >
                            <Download size={18} className="text-blue-600" />
                          </a>
                          <button
                            onClick={() => handleDeleteEvidencia(evidencia.id)}
                            className="p-2 hover:bg-red-100 rounded"
                            title="Eliminar"
                          >
                            <X size={18} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Formulario de carga */}
                <form onSubmit={(e) => handleUploadEvidencia(e, parcial)} className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Subir Evidencia
                    </label>
                    <input
                      type="file"
                      name="file"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Descripción (opcional)
                    </label>
                    <input
                      type="text"
                      name="descripcion"
                      placeholder="Ej: Examen escrito, proyecto, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={uploadingEvidencia}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload size={18} className="mr-2" />
                    {uploadingEvidencia ? 'Subiendo...' : 'Subir Evidencia'}
                  </Button>
                </form>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* PASO 1: SELECCIONAR MATERIA */}
      <Card className="p-4 md:p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
        <h3 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
          <BookOpen size={20} className="md:w-6 md:h-6" />
          Paso 1: Selecciona tu Materia
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {materias.map(materia => (
            <button
              key={materia.id}
              onClick={() => {
                setMateriaSeleccionada(materia.nombre);
                setEstudianteSeleccionado('');
              }}
              className={`p-4 md:p-6 rounded-lg font-bold text-lg md:text-xl transition-all ${
                materiaSeleccionada === materia.nombre
                  ? 'bg-white text-emerald-600 shadow-xl'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur'
              }`}
            >
              {materia.nombre}
            </button>
          ))}
        </div>
      </Card>

      {/* PASO 2: SELECCIONAR ESTUDIANTE */}
      {materiaSeleccionada && (
        <Card className="p-4 md:p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
          <h3 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
            <Users size={20} className="md:w-6 md:h-6" />
            Paso 2: Selecciona el Estudiante (Opcional)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={() => setEstudianteSeleccionado('')}
              className={`p-4 md:p-6 rounded-lg font-bold text-lg md:text-xl transition-all ${
                estudianteSeleccionado === ''
                  ? 'bg-white text-blue-600 shadow-xl'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur'
              }`}
            >
              Ver Todos
            </button>
            {estudiantesPorMateria.map(est => (
              <button
                key={est.id}
                onClick={() => setEstudianteSeleccionado(String(est.id))}
                className={`p-4 md:p-6 rounded-lg font-bold text-lg md:text-xl transition-all text-left ${
                  estudianteSeleccionado === String(est.id)
                    ? 'bg-white text-blue-600 shadow-xl'
                    : 'bg-white/10 hover:bg-white/20 backdrop-blur'
                }`}
              >
                <div className="text-sm">{est.nombre}</div>
                <div className="text-xs opacity-90">Grupo {est.grupo}</div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* BOTÓN AGREGAR CALIFICACIÓN */}
      {materiaSeleccionada && (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setFormData({
                estudiante_id: '',
                materia: materiaSeleccionada,
                grado: '',
                grupo: '',
                calificacion_parcial_1: '',
                inasistencias_parcial_1: '0',
                calificacion_parcial_2: '',
                inasistencias_parcial_2: '0',
                calificacion_parcial_3: '',
                inasistencias_parcial_3: '0',
              });
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-lg px-6 py-3"
          >
            <Plus size={20} className="mr-2" />
            Agregar Calificación
          </Button>
        </div>
      )}

      {/* TABLA DE CALIFICACIONES */}
      {materiaSeleccionada && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Calificaciones Registradas</h2>
          {calificacionesFiltradas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay calificaciones registradas</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Estudiante</th>
                    <th className="px-4 py-2 text-left font-semibold">Materia</th>
                    <th className="px-4 py-2 text-center font-semibold">P1</th>
                    <th className="px-4 py-2 text-center font-semibold">P2</th>
                    <th className="px-4 py-2 text-center font-semibold">P3</th>
                    <th className="px-4 py-2 text-center font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {calificacionesFiltradas.map(cal => (
                    <tr key={cal.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{cal.estudiante_nombre}</td>
                      <td className="px-4 py-3">{cal.materia}</td>
                      <td className="px-4 py-3 text-center font-semibold text-blue-600">
                        {cal.calificacion_parcial_1 || '-'}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-green-600">
                        {cal.calificacion_parcial_2 || '-'}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-purple-600">
                        {cal.calificacion_parcial_3 || '-'}
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleVerEvidencias(cal)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          title="Ver evidencias"
                        >
                          <FileText size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(cal)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cal.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
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
