'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, FileText, Download, TrendingUp } from 'lucide-react';

interface Reporte {
  id: number;
  titulo: string;
  tipo_reporte: string;
  descripcion: string;
  fecha_generacion: string;
  estado: string;
  datos_json?: string;
}

export default function ReportesPage() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');

  const [formData, setFormData] = useState({
    titulo: '',
    tipo_reporte: 'Académico',
    descripcion: '',
  });

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/subdirectora/reportes');

      if (!res.ok) throw new Error('Error al cargar reportes');

      const data = await res.json();
      setReportes(data.reportes || []);
    } catch (error: any) {
      setError(`Error al cargar reportes: ${error.message}`);
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

      const res = await fetch('/api/admin/subdirectora/reportes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en la operación');

      setSuccess(editingId ? '✓ Reporte actualizado exitosamente' : '✓ Reporte creado exitosamente');
      setFormData({
        titulo: '',
        tipo_reporte: 'Académico',
        descripcion: '',
      });
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => {
        cargarReportes();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEdit = (reporte: Reporte) => {
    setFormData({
      titulo: reporte.titulo,
      tipo_reporte: reporte.tipo_reporte,
      descripcion: reporte.descripcion,
    });
    setEditingId(reporte.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este reporte?')) return;

    try {
      setError('');
      const res = await fetch(`/api/admin/subdirectora/reportes?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('✓ Reporte eliminado exitosamente');
      setTimeout(() => {
        cargarReportes();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const reportesFiltrados = reportes.filter(reporte => {
    const matchTipo = !filtroTipo || reporte.tipo_reporte === filtroTipo;
    return matchTipo;
  });

  const stats = {
    total: reportes.length,
    academicos: reportes.filter(r => r.tipo_reporte === 'Académico').length,
    administrativos: reportes.filter(r => r.tipo_reporte === 'Administrativo').length,
    financieros: reportes.filter(r => r.tipo_reporte === 'Financiero').length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reportes Administrativos</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Genera y gestiona reportes ejecutivos</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              titulo: '',
              tipo_reporte: 'Académico',
              descripcion: '',
            });
            setError('');
          }}
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg w-full sm:w-auto"
          size="lg"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Nuevo Reporte</span>
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
              {editingId ? '✏️ Editar Reporte' : '➕ Nuevo Reporte'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText size={20} className="text-indigo-600" />
                Información del Reporte
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Ej: Reporte de Rendimiento Académico 2025"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Tipo de Reporte <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.tipo_reporte}
                    onChange={(e) => setFormData({ ...formData, tipo_reporte: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Académico">Académico</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Financiero">Financiero</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Infraestructura">Infraestructura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Detalles y análisis del reporte..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                {editingId ? '💾 Guardar Cambios' : '➕ Crear Reporte'}
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
        <Card className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <div className="text-sm opacity-90">Total Reportes</div>
          <div className="text-3xl font-bold mt-2">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="text-sm opacity-90">Académicos</div>
          <div className="text-3xl font-bold mt-2">{stats.academicos}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="text-sm opacity-90">Administrativos</div>
          <div className="text-3xl font-bold mt-2">{stats.administrativos}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="text-sm opacity-90">Financieros</div>
          <div className="text-3xl font-bold mt-2">{stats.financieros}</div>
        </Card>
      </div>

      {/* FILTROS */}
      <Card className="p-6 bg-white shadow-md">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Filtrar por Tipo
          </label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos los tipos</option>
            <option value="Académico">Académico</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Financiero">Financiero</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
            <option value="Infraestructura">Infraestructura</option>
          </select>
        </div>
      </Card>

      {/* TABLA */}
      {loading ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            Cargando reportes...
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden shadow-md">
          {reportesFiltrados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay reportes registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Título</th>
                    <th className="px-4 py-3 text-left font-semibold">Tipo</th>
                    <th className="px-4 py-3 text-left font-semibold">Fecha Generación</th>
                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reportesFiltrados.map((reporte) => (
                    <tr key={reporte.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{reporte.titulo}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                          {reporte.tipo_reporte}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(reporte.fecha_generacion).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                          {reporte.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => {
                            // Descargar reporte
                            const element = document.createElement('a');
                            element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(reporte.descripcion)}`);
                            element.setAttribute('download', `${reporte.titulo}.txt`);
                            element.style.display = 'none';
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                          }}
                          className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition"
                          title="Descargar"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(reporte)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(reporte.id)}
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
