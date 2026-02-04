'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, Calendar, MapPin } from 'lucide-react';

interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_evento: string;
  lugar: string;
  tipo_evento: string;
  estado: string;
  fecha_creacion: string;
}

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_evento: '',
    lugar: '',
    tipo_evento: 'General',
    estado: 'Programado',
  });

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/secretaria/eventos');

      if (!res.ok) throw new Error('Error al cargar eventos');

      const data = await res.json();
      setEventos(data.eventos || []);
    } catch (error: any) {
      setError(`Error al cargar eventos: ${error.message}`);
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

      const res = await fetch('/api/admin/secretaria/eventos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en la operación');

      setSuccess(editingId ? '✓ Evento actualizado exitosamente' : '✓ Evento creado exitosamente');
      setFormData({
        nombre: '',
        descripcion: '',
        fecha_evento: '',
        lugar: '',
        tipo_evento: 'General',
        estado: 'Programado',
      });
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => {
        cargarEventos();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEdit = (evento: Evento) => {
    setFormData({
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      fecha_evento: evento.fecha_evento,
      lugar: evento.lugar,
      tipo_evento: evento.tipo_evento,
      estado: evento.estado,
    });
    setEditingId(evento.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este evento?')) return;

    try {
      setError('');
      const res = await fetch(`/api/admin/secretaria/eventos?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('✓ Evento eliminado exitosamente');
      setTimeout(() => {
        cargarEventos();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const eventosFiltrados = eventos.filter(evento => {
    const matchTipo = !filtroTipo || evento.tipo_evento === filtroTipo;
    const matchEstado = !filtroEstado || evento.estado === filtroEstado;
    return matchTipo && matchEstado;
  });

  const stats = {
    total: eventos.length,
    programados: eventos.filter(e => e.estado === 'Programado').length,
    realizados: eventos.filter(e => e.estado === 'Realizado').length,
    cancelados: eventos.filter(e => e.estado === 'Cancelado').length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Eventos Escolares</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Organiza y gestiona eventos institucionales</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              nombre: '',
              descripcion: '',
              fecha_evento: '',
              lugar: '',
              tipo_evento: 'General',
              estado: 'Programado',
            });
            setError('');
          }}
          className="gap-2 bg-orange-600 hover:bg-orange-700 shadow-lg w-full sm:w-auto"
          size="lg"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Nuevo Evento</span>
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
              {editingId ? '✏️ Editar Evento' : '➕ Nuevo Evento'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-orange-600" />
                Información del Evento
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Nombre del Evento <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Día de Muertos"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Detalles del evento..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Fecha del Evento <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      type="date"
                      value={formData.fecha_evento}
                      onChange={(e) => setFormData({ ...formData, fecha_evento: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Lugar
                    </label>
                    <Input
                      value={formData.lugar}
                      onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                      placeholder="Ej: Auditorio"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Tipo de Evento
                    </label>
                    <select
                      value={formData.tipo_evento}
                      onChange={(e) => setFormData({ ...formData, tipo_evento: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="General">General</option>
                      <option value="Académico">Académico</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Deportivo">Deportivo</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Estado
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="Programado">Programado</option>
                      <option value="Realizado">Realizado</option>
                      <option value="Cancelado">Cancelado</option>
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
                {editingId ? '💾 Guardar Cambios' : '➕ Crear Evento'}
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
        <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="text-sm opacity-90">Total Eventos</div>
          <div className="text-3xl font-bold mt-2">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="text-sm opacity-90">Programados</div>
          <div className="text-3xl font-bold mt-2">{stats.programados}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="text-sm opacity-90">Realizados</div>
          <div className="text-3xl font-bold mt-2">{stats.realizados}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="text-sm opacity-90">Cancelados</div>
          <div className="text-3xl font-bold mt-2">{stats.cancelados}</div>
        </Card>
      </div>

      {/* FILTROS */}
      <Card className="p-6 bg-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Filtrar por Tipo
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos los tipos</option>
              <option value="General">General</option>
              <option value="Académico">Académico</option>
              <option value="Cultural">Cultural</option>
              <option value="Deportivo">Deportivo</option>
              <option value="Social">Social</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Filtrar por Estado
            </label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos los estados</option>
              <option value="Programado">Programado</option>
              <option value="Realizado">Realizado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </Card>

      {/* TABLA */}
      {loading ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            Cargando eventos...
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden shadow-md">
          {eventosFiltrados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay eventos registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                    <th className="px-4 py-3 text-left font-semibold">Tipo</th>
                    <th className="px-4 py-3 text-left font-semibold">Fecha</th>
                    <th className="px-4 py-3 text-left font-semibold">Lugar</th>
                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {eventosFiltrados.map((evento) => (
                    <tr key={evento.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{evento.nombre}</td>
                      <td className="px-4 py-3">{evento.tipo_evento}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(evento.fecha_evento).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-4 py-3 text-sm flex items-center gap-1">
                        <MapPin size={14} className="text-gray-500" />
                        {evento.lugar || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          evento.estado === 'Realizado' ? 'bg-green-100 text-green-700' :
                          evento.estado === 'Programado' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {evento.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(evento)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(evento.id)}
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
