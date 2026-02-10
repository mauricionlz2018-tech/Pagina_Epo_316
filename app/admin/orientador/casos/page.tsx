'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, X, Heart, AlertTriangle, TrendingUp, CheckCircle, AlertCircle, Save, FileText, Users } from 'lucide-react';

interface CasoOrientacion {
  id: number;
  estudiante_id: number;
  orientador_id: number;
  tipo_caso: string;
  descripcion: string;
  prioridad: string;
  estado: string;
  fecha_creacion: string;
  fecha_seguimiento: string;
  estudiante_nombre?: string;
}

interface Estudiante {
  id: number;
  nombre: string;
  numero_inscripcion: string;
  grado: string;
  grupo: string;
}

export default function CasosOrientacionPage() {
  const [casos, setCasos] = useState<CasoOrientacion[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>('');

  const [formData, setFormData] = useState({
    estudiante_id: '',
    tipo_caso: 'Académico',
    descripcion: '',
    prioridad: 'Media',
    estado: 'Nuevo',
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');
      const [resCasos, resEst] = await Promise.all([
        fetch('/api/admin/orientador/casos'),
        fetch('/api/admin/estudiantes'),
      ]);

      if (!resCasos.ok || !resEst.ok) throw new Error('Error al cargar datos');

      const dataCasos = await resCasos.json();
      const dataEst = await resEst.json();

      setEstudiantes(dataEst.estudiantes || []);
      
      const casosConNombre = (dataCasos.casos || []).map((caso: CasoOrientacion) => {
        const estudiante = (dataEst.estudiantes || []).find((e: Estudiante) => e.id === caso.estudiante_id);
        return {
          ...caso,
          estudiante_nombre: estudiante?.nombre || 'Desconocido'
        };
      });
      
      setCasos(casosConNombre);
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

      const res = await fetch('/api/admin/orientador/casos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en la operación');

      setSuccess(editingId ? 'Caso actualizado exitosamente' : 'Caso creado exitosamente');
      setFormData({
        estudiante_id: '',
        tipo_caso: 'Académico',
        descripcion: '',
        prioridad: 'Media',
        estado: 'Nuevo',
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

  const handleEdit = (caso: CasoOrientacion) => {
    setFormData({
      estudiante_id: String(caso.estudiante_id),
      tipo_caso: caso.tipo_caso,
      descripcion: caso.descripcion,
      prioridad: caso.prioridad,
      estado: caso.estado,
    });
    setEditingId(caso.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este caso?')) return;

    try {
      setError('');
      const res = await fetch(`/api/admin/orientador/casos?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('Caso eliminado exitosamente');
      setTimeout(() => {
        cargarDatos();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const casosFiltrados = casos.filter(caso => {
    const matchEstado = !filtroEstado || caso.estado === filtroEstado;
    const matchPrioridad = !filtroPrioridad || caso.prioridad === filtroPrioridad;
    return matchEstado && matchPrioridad;
  });

  const stats = {
    total: casos.length,
    activos: casos.filter(c => c.estado !== 'Resuelto').length,
    alta: casos.filter(c => c.prioridad === 'Alta').length,
    resueltos: casos.filter(c => c.estado === 'Resuelto').length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Casos de Orientación</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Gestiona los casos de orientación estudiantil</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              estudiante_id: '',
              tipo_caso: 'Académico',
              descripcion: '',
              prioridad: 'Media',
              estado: 'Nuevo',
            });
            setError('');
          }}
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-md w-full sm:w-auto"
          size="lg"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Nuevo Caso</span>
          <span className="sm:hidden">Nuevo</span>
        </Button>
      </div>

      {/* MENSAJES */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg text-red-800 flex items-center gap-3">
          <AlertCircle size={24} className="text-red-500" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-400 rounded-lg text-emerald-800 flex items-center gap-3">
          <CheckCircle size={24} className="text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {/* DIÁLOGO DE FORMULARIO */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              {editingId ? (
                <>
                  <Edit2 size={24} className="text-indigo-600" />
                  Editar Caso
                </>
              ) : (
                <>
                  <Plus size={24} className="text-indigo-600" />
                  Nuevo Caso de Orientación
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800">
                <FileText size={20} className="text-indigo-600" />
                Información del Caso
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Estudiante <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.estudiante_id}
                    onChange={(e) => setFormData({ ...formData, estudiante_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  >
                    <option value="">Selecciona un estudiante...</option>
                    {estudiantes.map(est => (
                      <option key={est.id} value={est.id}>
                        {est.nombre} - {est.grado} {est.grupo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Tipo de Caso <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.tipo_caso}
                    onChange={(e) => setFormData({ ...formData, tipo_caso: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  >
                    <option value="Académico">Académico</option>
                    <option value="Personal">Personal</option>
                    <option value="Social">Social</option>
                    <option value="Emocional">Emocional</option>
                    <option value="Familiar">Familiar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Describe el caso..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Prioridad
                    </label>
                    <select
                      value={formData.prioridad}
                      onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Estado
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    >
                      <option value="Nuevo">Nuevo</option>
                      <option value="En seguimiento">En seguimiento</option>
                      <option value="Resuelto">Resuelto</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-lg py-6 gap-2"
              >
                <Save size={20} />
                {editingId ? 'Guardar Cambios' : 'Crear Caso'}
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-slate-500 hover:bg-slate-600 text-lg py-6 gap-2"
              >
                <X size={20} />
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-linear-to-br from-indigo-500 to-indigo-600 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={20} className="opacity-90" />
            <div className="text-sm opacity-90">Casos Totales</div>
          </div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-sky-500 to-sky-600 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="opacity-90" />
            <div className="text-sm opacity-90">Casos Activos</div>
          </div>
          <div className="text-3xl font-bold">{stats.activos}</div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-rose-500 to-rose-600 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={20} className="opacity-90" />
            <div className="text-sm opacity-90">Prioridad Alta</div>
          </div>
          <div className="text-3xl font-bold">{stats.alta}</div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={20} className="opacity-90" />
            <div className="text-sm opacity-90">Resueltos</div>
          </div>
          <div className="text-3xl font-bold">{stats.resueltos}</div>
        </Card>
      </div>

      {/* FILTROS */}
      <Card className="p-6 bg-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Filtrar por Estado
            </label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Todos los estados</option>
              <option value="Nuevo">Nuevo</option>
              <option value="En seguimiento">En seguimiento</option>
              <option value="Resuelto">Resuelto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Filtrar por Prioridad
            </label>
            <select
              value={filtroPrioridad}
              onChange={(e) => setFiltroPrioridad(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Todas las prioridades</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
        </div>
      </Card>

      {/* TABLA */}
      {loading ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            Cargando casos...
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden shadow-md">
          {casosFiltrados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay casos registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Estudiante</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Tipo</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Prioridad</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {casosFiltrados.map((caso) => (
                    <tr key={caso.id} className="border-t hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-800">{caso.estudiante_nombre}</td>
                      <td className="px-4 py-3 text-gray-700">{caso.tipo_caso}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          caso.prioridad === 'Alta' ? 'bg-rose-100 text-rose-700' :
                          caso.prioridad === 'Media' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {caso.prioridad}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          caso.estado === 'Resuelto' ? 'bg-emerald-100 text-emerald-700' :
                          caso.estado === 'En seguimiento' ? 'bg-sky-100 text-sky-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {caso.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(caso.fecha_creacion).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(caso)}
                          className="text-sky-600 hover:text-sky-800 p-2 hover:bg-sky-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(caso.id)}
                          className="text-rose-600 hover:text-rose-800 p-2 hover:bg-rose-50 rounded transition"
                        >
                          <Trash2 size={18} />
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
