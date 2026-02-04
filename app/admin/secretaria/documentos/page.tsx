'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, FileText, CheckCircle, Clock } from 'lucide-react';

interface Documento {
  id: number;
  estudiante_id: number;
  tipo_documento: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  fecha_entrega: string;
  estudiante_nombre?: string;
}

interface Estudiante {
  id: number;
  nombre: string;
  numero_inscripcion: string;
  grado: string;
  grupo: string;
}

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  const [formData, setFormData] = useState({
    estudiante_id: '',
    tipo_documento: 'Certificado',
    descripcion: '',
    estado: 'Pendiente',
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');
      const [resDoc, resEst] = await Promise.all([
        fetch('/api/admin/secretaria/documentos'),
        fetch('/api/admin/estudiantes'),
      ]);

      if (!resDoc.ok || !resEst.ok) throw new Error('Error al cargar datos');

      const dataDoc = await resDoc.json();
      const dataEst = await resEst.json();

      setEstudiantes(dataEst.estudiantes || []);
      
      const documentosConNombre = (dataDoc.documentos || []).map((doc: Documento) => {
        const estudiante = (dataEst.estudiantes || []).find((e: Estudiante) => e.id === doc.estudiante_id);
        return {
          ...doc,
          estudiante_nombre: estudiante?.nombre || 'Desconocido'
        };
      });
      
      setDocumentos(documentosConNombre);
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

      const res = await fetch('/api/admin/secretaria/documentos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en la operación');

      setSuccess(editingId ? '✓ Documento actualizado exitosamente' : '✓ Documento creado exitosamente');
      setFormData({
        estudiante_id: '',
        tipo_documento: 'Certificado',
        descripcion: '',
        estado: 'Pendiente',
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

  const handleEdit = (documento: Documento) => {
    setFormData({
      estudiante_id: String(documento.estudiante_id),
      tipo_documento: documento.tipo_documento,
      descripcion: documento.descripcion,
      estado: documento.estado,
    });
    setEditingId(documento.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este documento?')) return;

    try {
      setError('');
      const res = await fetch(`/api/admin/secretaria/documentos?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('✓ Documento eliminado exitosamente');
      setTimeout(() => {
        cargarDatos();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const documentosFiltrados = documentos.filter(doc => {
    const matchTipo = !filtroTipo || doc.tipo_documento === filtroTipo;
    const matchEstado = !filtroEstado || doc.estado === filtroEstado;
    return matchTipo && matchEstado;
  });

  const stats = {
    total: documentos.length,
    pendientes: documentos.filter(d => d.estado === 'Pendiente').length,
    procesados: documentos.filter(d => d.estado === 'Procesado').length,
    entregados: documentos.filter(d => d.estado === 'Entregado').length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Documentos Académicos</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Gestiona certificados y constancias</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              estudiante_id: '',
              tipo_documento: 'Certificado',
              descripcion: '',
              estado: 'Pendiente',
            });
            setError('');
          }}
          className="gap-2 bg-teal-600 hover:bg-teal-700 shadow-lg w-full sm:w-auto"
          size="lg"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Nuevo Documento</span>
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
              {editingId ? '✏️ Editar Documento' : '➕ Nuevo Documento'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText size={20} className="text-teal-600" />
                Información del Documento
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Selecciona un estudiante...</option>
                    {estudiantes.map(est => (
                      <option key={est.id} value={est.id}>
                        {est.nombre} - {est.numero_inscripcion}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Tipo de Documento <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.tipo_documento}
                    onChange={(e) => setFormData({ ...formData, tipo_documento: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Certificado">Certificado</option>
                    <option value="Constancia">Constancia</option>
                    <option value="Boleta">Boleta</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Carta de Recomendación">Carta de Recomendación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Detalles del documento..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Estado
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Procesado">Procesado</option>
                    <option value="Entregado">Entregado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6"
              >
                {editingId ? '💾 Guardar Cambios' : '➕ Crear Documento'}
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
        <Card className="p-4 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <div className="text-sm opacity-90">Total Documentos</div>
          <div className="text-3xl font-bold mt-2">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="text-sm opacity-90">Pendientes</div>
          <div className="text-3xl font-bold mt-2">{stats.pendientes}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="text-sm opacity-90">Procesados</div>
          <div className="text-3xl font-bold mt-2">{stats.procesados}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="text-sm opacity-90">Entregados</div>
          <div className="text-3xl font-bold mt-2">{stats.entregados}</div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Todos los tipos</option>
              <option value="Certificado">Certificado</option>
              <option value="Constancia">Constancia</option>
              <option value="Boleta">Boleta</option>
              <option value="Diploma">Diploma</option>
              <option value="Carta de Recomendación">Carta de Recomendación</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Filtrar por Estado
            </label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Procesado">Procesado</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
        </div>
      </Card>

      {/* TABLA */}
      {loading ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            Cargando documentos...
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden shadow-md">
          {documentosFiltrados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay documentos registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Estudiante</th>
                    <th className="px-4 py-3 text-left font-semibold">Tipo</th>
                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold">Fecha Creación</th>
                    <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {documentosFiltrados.map((doc) => (
                    <tr key={doc.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{doc.estudiante_nombre}</td>
                      <td className="px-4 py-3">{doc.tipo_documento}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 w-fit ${
                          doc.estado === 'Entregado' ? 'bg-green-100 text-green-700' :
                          doc.estado === 'Procesado' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {doc.estado === 'Entregado' ? <CheckCircle size={14} /> : <Clock size={14} />}
                          {doc.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(doc.fecha_creacion).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(doc)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
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
