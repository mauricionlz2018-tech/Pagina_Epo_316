'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, Edit2, Plus, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface Profesor {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  especialidad?: string;
  materias_asignadas?: string;
  activo: number;
}

export default function ProfesoresPage() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    especialidad: '',
    materias_asignadas: '',
    contraseña: '',
    activo: 1,
  });

  useEffect(() => {
    cargarProfesores();
  }, []);

  const cargarProfesores = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/profesores');
      const data = await res.json();
      setProfesores(data.profesores || []);
    } catch (error: any) {
      setError(`Error al cargar profesores: ${error.message}`);
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

      const res = await fetch('/api/admin/profesores', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setSuccess(editingId ? 'Profesor actualizado' : 'Profesor agregado');
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        especialidad: '',
        materias_asignadas: '',
        contraseña: '',
        activo: 1,
      });
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => cargarProfesores(), 500);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEdit = (profesor: Profesor) => {
    setFormData({
      nombre: profesor.nombre,
      correo: profesor.correo,
      telefono: profesor.telefono || '',
      especialidad: profesor.especialidad || '',
      materias_asignadas: profesor.materias_asignadas || '',
      contraseña: '',
      activo: profesor.activo,
    });
    setEditingId(profesor.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este profesor?')) return;

    try {
      const res = await fetch(`/api/admin/profesores?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('Profesor eliminado');
      setTimeout(() => cargarProfesores(), 500);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Profesores</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                nombre: '',
                correo: '',
                telefono: '',
                especialidad: '',
                materias_asignadas: '',
                contraseña: '',
                activo: 1,
              });
              setError('');
            }}
            className={`gap-2 ${showForm ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Cancelar' : 'Nuevo Profesor'}
          </Button>
          <Button onClick={cargarProfesores} className="bg-gray-600 hover:bg-gray-700">
            Actualizar
          </Button>
        </div>
      </div>

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

      {showForm && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Editar Profesor' : 'Nuevo Profesor'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo *</label>
              <Input
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Prof. Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico *</label>
              <Input
                required
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                placeholder="profesor@epo316.mx"
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
              <label className="block text-sm font-medium mb-1">Especialidad</label>
              <Input
                value={formData.especialidad}
                onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                placeholder="Matemáticas, Física, etc."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Materias Asignadas</label>
              <Input
                value={formData.materias_asignadas}
                onChange={(e) => setFormData({ ...formData, materias_asignadas: e.target.value })}
                placeholder="Matemáticas I, Matemáticas II (separadas por coma)"
              />
              <p className="text-xs text-gray-500 mt-1">Separa las materias con comas</p>
            </div>

            {!editingId && (
              <div>
                <label className="block text-sm font-medium mb-1">Contraseña *</label>
                <Input
                  required={!editingId}
                  type="password"
                  value={formData.contraseña}
                  onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                  placeholder="Contraseña para acceso"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                value={formData.activo}
                onChange={(e) => setFormData({ ...formData, activo: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
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

      {loading ? (
        <div className="p-8 text-center text-gray-500">Cargando profesores...</div>
      ) : (
        <Card className="overflow-hidden">
          {profesores.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay profesores registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                    <th className="px-4 py-3 text-left font-semibold">Correo</th>
                    <th className="px-4 py-3 text-left font-semibold">Teléfono</th>
                    <th className="px-4 py-3 text-left font-semibold">Especialidad</th>
                    <th className="px-4 py-3 text-left font-semibold">Materias</th>
                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {profesores.map((prof) => (
                    <tr key={prof.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{prof.nombre}</td>
                      <td className="px-4 py-3 text-sm">{prof.correo}</td>
                      <td className="px-4 py-3 text-sm">{prof.telefono || '-'}</td>
                      <td className="px-4 py-3 text-sm">{prof.especialidad || '-'}</td>
                      <td className="px-4 py-3 text-sm max-w-xs truncate">
                        {prof.materias_asignadas || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            prof.activo === 1
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {prof.activo === 1 ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(prof)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(prof.id)}
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