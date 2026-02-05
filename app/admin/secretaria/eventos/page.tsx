'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, Calendar, MapPin, AlertCircle, CheckCircle, Save, X, CalendarCheck, CalendarX } from 'lucide-react';

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

      setSuccess(editingId ? 'Evento actualizado exitosamente' : 'Evento creado exitosamente');
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

      setSuccess('Evento eliminado exitosamente');
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Eventos Escolares</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Organiza y gestiona eventos institucionales</p>
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
          className="gap-2 bg-orange-600 hover:bg-orange-700 shadow-md w-full sm:w-auto"
          size="lg"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Nuevo Evento</span>
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
                  <Edit2 size={24} className="text-orange-600" />
                  Editar Evento
                </>
              ) : (
                <>
                  <Plus size={24} className="text-orange-600" />
                  Nuevo Evento
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800">
                <Calendar size={20} className="text-orange-600" />
                Información del Evento
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Nombre del Evento <span className="text-rose-500">*</span>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Fecha del Evento <span className="text-rose-500">*</span>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-lg py-6 gap-2"
              >
                <Save size={20} />
                {editingId ? 'Guardar Cambios' : 'Crear Evento'}
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
        <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="opacity-90" />
            <div className="text-sm opacity-90">Total Eventos</div>
          </div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <CalendarCheck size={20} className="opacity-90" />
            <div className="text-sm opacity-90">Programados</div>
          </div>
          <div className="text-3xl font-bold">{stats.programados}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={20} className="opacity-90" />
            <div className="text-sm opacity-90">Realizados</div>
          </div>
          <div className="text-3xl font-bold">{stats.realizados}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <CalendarX size={20} className="opacity-90" />
            <div className="text-sm opacity-90">Cancelados</div>
          </div>
          <div className="text-3xl font-bold">{stats.cancelados}</div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
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
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Tipo</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Lugar</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {eventosFiltrados.map((evento) => (
                    <tr key={evento.id} className="border-t hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-800">{evento.nombre}</td>
                      <td className="px-4 py-3 text-gray-700">{evento.tipo_evento}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {new Date(evento.fecha_evento).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-4 py-3 text-sm flex items-center gap-1 text-gray-700">
                        <MapPin size={14} className="text-gray-500" />
                        {evento.lugar || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          evento.estado === 'Realizado' ? 'bg-emerald-100 text-emerald-700' :
                          evento.estado === 'Programado' ? 'bg-sky-100 text-sky-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {evento.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(evento)}
                          className="text-sky-600 hover:text-sky-800 p-2 hover:bg-sky-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(evento.id)}
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