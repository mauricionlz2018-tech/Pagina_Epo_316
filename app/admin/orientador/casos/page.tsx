'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, X, Heart, AlertTriangle, TrendingUp } from 'lucide-react';

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

      setSuccess(editingId ? '✓ Caso actualizado exitosamente' : '✓ Caso creado exitosamente');
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

      setSuccess('✓ Caso eliminado exitosamente');
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Casos de Orientación</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Gestiona los casos de orientación estudiantil</p>
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
          className="gap-2 bg-purple-600 hover:bg-purple-700 shadow-lg w-full sm:w-auto"
          size="lg"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Nuevo Caso</span>
          <span className="sm:hidden">Nuevo</span>
        </Button>
      </div>

      {/* MENSAJES */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg text-green-700 flex items-center gap-3">
          <span className="text-2xl">✓</span>
          <span>{success}</span>
        </div>
      )}

      {/* DIÁLOGO DE FORMULARIO */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingId ? '✏️ Editar Caso' : '➕ Nuevo Caso de Orientación'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Heart size={20} className="text-purple-600" />
                Información del Caso
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Estudiante <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.estudiante_id}
                    onChange={(e) => setFormData({ ...formData, estudiante_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    Tipo de Caso <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.tipo_caso}
                    onChange={(e) => setFormData({ ...formData, tipo_caso: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6"
              >
                {editingId ? '💾 Guardar Cambios' : '➕ Crear Caso'}
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-lg py-6"
              >
                ❌ Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="text-sm opacity-90">Casos Totales</div>
          <div className="text-3xl font-bold mt-2">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="text-sm opacity-90">Casos Activos</div>
          <div className="text-3xl font-bold mt-2">{stats.activos}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="text-sm opacity-90">Prioridad Alta</div>
          <div className="text-3xl font-bold mt-2">{stats.alta}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="text-sm opacity-90">Resueltos</div>
          <div className="text-3xl font-bold mt-2">{stats.resueltos}</div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
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
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Estudiante</th>
                    <th className="px-4 py-3 text-left font-semibold">Tipo</th>
                    <th className="px-4 py-3 text-left font-semibold">Prioridad</th>
                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold">Fecha</th>
                    <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {casosFiltrados.map((caso) => (
                    <tr key={caso.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{caso.estudiante_nombre}</td>
                      <td className="px-4 py-3">{caso.tipo_caso}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          caso.prioridad === 'Alta' ? 'bg-red-100 text-red-700' :
                          caso.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {caso.prioridad}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          caso.estado === 'Resuelto' ? 'bg-green-100 text-green-700' :
                          caso.estado === 'En seguimiento' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
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
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(caso.id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition"
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
