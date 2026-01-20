'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, Edit2, Plus, X } from 'lucide-react';

interface Estudiante {
  id: number;
  nombre: string;
  numero_inscripcion: string;
  grado: string;
  grupo: string;
  correo?: string;
  telefono?: string;
  estado_inscripcion: string;
}

export default function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroGrado, setFiltroGrado] = useState<string>('');
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    numero_inscripcion: '',
    grado: '1ro',
    grupo: 'A',
    telefono: '',
    estado_inscripcion: 'activo',
  });

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/estudiantes');
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Datos recibidos:', data);
      setEstudiantes(Array.isArray(data.estudiantes) ? data.estudiantes : []);
    } catch (error: any) {
      setError(`Error al cargar estudiantes: ${error.message}`);
      console.error('Error:', error);
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
        ? { ...formData, id: editingId }
        : formData;

      const res = await fetch('/api/admin/estudiantes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error en la operación');
      }

      setSuccess(editingId ? '✓ Estudiante actualizado' : '✓ Estudiante agregado');
      setFormData({
        nombre: '',
        correo: '',
        numero_inscripcion: '',
        grado: '1ro',
        grupo: 'A',
        telefono: '',
        estado_inscripcion: 'activo',
      });
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => cargarEstudiantes(), 500);
    } catch (error: any) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  const handleEdit = (estudiante: Estudiante) => {
    setFormData({
      nombre: estudiante.nombre,
      correo: estudiante.correo || '',
      numero_inscripcion: estudiante.numero_inscripcion,
      grado: estudiante.grado,
      grupo: estudiante.grupo,
      telefono: estudiante.telefono || '',
      estado_inscripcion: estudiante.estado_inscripcion,
    });
    setEditingId(estudiante.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este estudiante?')) return;

    try {
      setError('');
      const res = await fetch(`/api/admin/estudiantes?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('✓ Estudiante eliminado');
      setTimeout(() => cargarEstudiantes(), 500);
    } catch (error: any) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Botones de Acción */}
      <div className="flex gap-3">
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              nombre: '',
              correo: '',
              numero_inscripcion: '',
              grado: '1ro',
              grupo: 'A',
              telefono: '',
              estado_inscripcion: 'activo',
            });
            setError('');
          }}
          className={`gap-2 ${showForm ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancelar' : 'Nuevo Estudiante'}
        </Button>
        <Button
          onClick={cargarEstudiantes}
          className="bg-gray-600 hover:bg-gray-700"
        >
          Actualizar
        </Button>
      </div>

      {/* Filtro por Grado */}
      <Card className="p-4 bg-white">
        <label className="block text-sm font-medium mb-2">Filtrar por Grado:</label>
        <select
          value={filtroGrado}
          onChange={(e) => setFiltroGrado(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todos los grados</option>
          <option value="1ro">1ro</option>
          <option value="2do">2do</option>
          <option value="3ro">3ro</option>
        </select>
      </Card>

      {/* Mensajes */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Editar Estudiante' : 'Nuevo Estudiante'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <Input
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Número de Inscripción *</label>
              <Input
                required
                value={formData.numero_inscripcion}
                onChange={(e) =>
                  setFormData({ ...formData, numero_inscripcion: e.target.value })
                }
                placeholder="2026-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo</label>
              <Input
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                placeholder="estudiante@epo316.mx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <Input
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="5551234567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Grado *</label>
              <select
                value={formData.grado}
                onChange={(e) => setFormData({ ...formData, grado: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="1ro">1ro</option>
                <option value="2do">2do</option>
                <option value="3ro">3ro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Grupo *</label>
              <select
                value={formData.grupo}
                onChange={(e) => setFormData({ ...formData, grupo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                value={formData.estado_inscripcion}
                onChange={(e) =>
                  setFormData({ ...formData, estado_inscripcion: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="graduado">Graduado</option>
              </select>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                {editingId ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tabla */}
      {loading ? (
        <div className="p-8 text-center text-gray-500">Cargando estudiantes...</div>
      ) : error && estudiantes.length === 0 ? (
        <Card className="p-8 text-center text-gray-500">
          No hay estudiantes. {error ? `Error: ${error}` : ''}
        </Card>
      ) : (
        <Card className="overflow-hidden">
          {(filtroGrado ? estudiantes.filter(est => est.grado === filtroGrado) : estudiantes).length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay estudiantes registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                    <th className="px-4 py-3 text-left font-semibold">Inscripción</th>
                    <th className="px-4 py-3 text-left font-semibold">Grado</th>
                    <th className="px-4 py-3 text-left font-semibold">Grupo</th>
                    <th className="px-4 py-3 text-left font-semibold">Correo</th>
                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(filtroGrado ? estudiantes.filter(est => est.grado === filtroGrado) : estudiantes).map((est) => (
                    <tr key={est.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{est.nombre}</td>
                      <td className="px-4 py-3 font-mono text-sm">{est.numero_inscripcion}</td>
                      <td className="px-4 py-3">{est.grado}</td>
                      <td className="px-4 py-3">{est.grupo}</td>
                      <td className="px-4 py-3 text-sm">{est.correo || '-'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            est.estado_inscripcion === 'activo'
                              ? 'bg-green-100 text-green-700'
                              : est.estado_inscripcion === 'inactivo'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {est.estado_inscripcion}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(est)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(est.id)}
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
