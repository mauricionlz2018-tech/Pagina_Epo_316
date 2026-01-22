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
}

interface Calificacion {
  id: number;
  estudiante_id: number;
  materia: string;
  grado: string;
  grupo: string;
  ciclo_escolar: string;
  calificacion_parcial_1: number;
  inasistencias_parcial_1: number;
  calificacion_parcial_2: number;
  inasistencias_parcial_2: number;
  calificacion_parcial_3: number;
  inasistencias_parcial_3: number;
  estudiante_nombre?: string;
}

export default function CalificacionesPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroGrado, setFiltroGrado] = useState<string>('');
  const [filtroMateria, setFiltroMateria] = useState<string>('');

  const [formData, setFormData] = useState({
    estudiante_id: '',
    materia: '',
    grado: '1ro',
    grupo: 'A',
    ciclo_escolar: '2025-2026',
    calificacion_parcial_1: '',
    inasistencias_parcial_1: '0',
    calificacion_parcial_2: '',
    inasistencias_parcial_2: '0',
    calificacion_parcial_3: '',
    inasistencias_parcial_3: '0',
  });

  const materiasPredefinidas = [
    'TEMAS SELECTOS DE IGUALDAD',
    'PRACTICA Y COLABORACION CIUDADANA',
    'PROBABILIDAD Y ESTADÍSTICA',
    'INGLÉS',
    'PSICOLOGÍA',
    'ACTIVIDADES ARTÍSTICAS Y CULTURALES',
    'DERECHO Y SOCIEDAD',
    'LA ENERGÍA Y LOS PROCESOS DE LA VIDA',
    'SISTEMAS DE INFORMACIÓN',
    'PROGRAMACIÓN',
    'HABILIDADES SOCIOEMOCIONALES',
    'CONCIENCIA HISTÓRICA',
    'MATEMÁTICAS I',
    'MATEMÁTICAS II',
    'FÍSICA I',
    'FÍSICA II',
    'QUÍMICA I',
    'QUÍMICA II',
    'LITERATURA',
    'HISTORIA',
    'EDUCACIÓN FÍSICA',
  ];

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

      if (!resEst.ok || !resCal.ok) {
        throw new Error('Error al cargar datos');
      }

      const dataEst = await resEst.json();
      const dataCal = await resCal.json();

      setEstudiantes(dataEst.estudiantes || []);
      
      // Combinar calificaciones con nombre de estudiante
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
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/admin/calificaciones', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error en la operación');
      }

      setSuccess(editingId ? '✓ Calificación actualizada' : '✓ Calificación agregada');
      setFormData({
        estudiante_id: '',
        materia: '',
        grado: '1ro',
        grupo: 'A',
        ciclo_escolar: '2025-2026',
        calificacion_parcial_1: '',
        inasistencias_parcial_1: '0',
        calificacion_parcial_2: '',
        inasistencias_parcial_2: '0',
        calificacion_parcial_3: '',
        inasistencias_parcial_3: '0',
      });
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => cargarDatos(), 500);
    } catch (error: any) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  const handleEdit = (calificacion: Calificacion) => {
    setFormData({
      estudiante_id: String(calificacion.estudiante_id),
      materia: calificacion.materia,
      grado: calificacion.grado,
      grupo: calificacion.grupo,
      ciclo_escolar: calificacion.ciclo_escolar,
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
    if (!confirm('¿Eliminar esta calificación?')) return;

    try {
      setError('');
      const res = await fetch(`/api/admin/calificaciones?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('✓ Calificación eliminada');
      setTimeout(() => cargarDatos(), 500);
    } catch (error: any) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  const calificacionesFiltradas = calificaciones.filter(cal => {
    const matchGrado = !filtroGrado || cal.grado === filtroGrado;
    const matchMateria = !filtroMateria || cal.materia === filtroMateria;
    return matchGrado && matchMateria;
  });

  // Obtener lista única de materias para el filtro
  const materiasUnicas = Array.from(new Set(calificaciones.map(c => c.materia))).sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Calificaciones</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                estudiante_id: '',
                materia: '',
                grado: '1ro',
                grupo: 'A',
                ciclo_escolar: '2025-2026',
                calificacion_parcial_1: '',
                inasistencias_parcial_1: '0',
                calificacion_parcial_2: '',
                inasistencias_parcial_2: '0',
                calificacion_parcial_3: '',
                inasistencias_parcial_3: '0',
              });
              setError('');
            }}
            className={`gap-2 ${showForm ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Cancelar' : 'Nueva Calificación'}
          </Button>
          <Button onClick={cargarDatos} className="bg-gray-600 hover:bg-gray-700">
            Actualizar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Filtrar por Grado:</label>
            <select
              value={filtroGrado}
              onChange={(e) => setFiltroGrado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Todos los grados</option>
              <option value="1ro">1ro</option>
              <option value="2do">2do</option>
              <option value="3ro">3ro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Filtrar por Materia:</label>
            <select
              value={filtroMateria}
              onChange={(e) => setFiltroMateria(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Todas las materias</option>
              {materiasUnicas.map(materia => (
                <option key={materia} value={materia}>{materia}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

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
            {editingId ? 'Editar Calificación' : 'Nueva Calificación'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Estudiante *</label>
                <select
                  required
                  value={formData.estudiante_id}
                  onChange={(e) => {
                    const estudiante = estudiantes.find(est => est.id === Number(e.target.value));
                    setFormData({ 
                      ...formData, 
                      estudiante_id: e.target.value,
                      grado: estudiante?.grado || formData.grado,
                      grupo: estudiante?.grupo || formData.grupo,
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar estudiante</option>
                  {estudiantes.map(est => (
                    <option key={est.id} value={est.id}>
                      {est.nombre} - {est.grado} {est.grupo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Materia *</label>
                <select
                  required
                  value={formData.materia}
                  onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar materia</option>
                  {materiasPredefinidas.map(materia => (
                    <option key={materia} value={materia}>{materia}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Grado *</label>
                <select
                  required
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
                  required
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
                <label className="block text-sm font-medium mb-1">Ciclo Escolar *</label>
                <Input
                  required
                  value={formData.ciclo_escolar}
                  onChange={(e) => setFormData({ ...formData, ciclo_escolar: e.target.value })}
                  placeholder="2025-2026"
                />
              </div>
            </div>

            {/* PARCIAL 1 */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-lg mb-3 text-blue-700">📝 Primer Parcial</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Calificación (0-10)</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.calificacion_parcial_1}
                    onChange={(e) => setFormData({ ...formData, calificacion_parcial_1: e.target.value })}
                    placeholder="8.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Inasistencias</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inasistencias_parcial_1}
                    onChange={(e) => setFormData({ ...formData, inasistencias_parcial_1: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* PARCIAL 2 */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-lg mb-3 text-green-700">📝 Segundo Parcial</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Calificación (0-10)</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.calificacion_parcial_2}
                    onChange={(e) => setFormData({ ...formData, calificacion_parcial_2: e.target.value })}
                    placeholder="9.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Inasistencias</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inasistencias_parcial_2}
                    onChange={(e) => setFormData({ ...formData, inasistencias_parcial_2: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* PARCIAL 3 */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-lg mb-3 text-purple-700">📝 Tercer Parcial</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Calificación (0-10)</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.calificacion_parcial_3}
                    onChange={(e) => setFormData({ ...formData, calificacion_parcial_3: e.target.value })}
                    placeholder="8.8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Inasistencias</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inasistencias_parcial_3}
                    onChange={(e) => setFormData({ ...formData, inasistencias_parcial_3: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                {editingId ? 'Actualizar Calificación' : 'Guardar Calificación'}
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
        <div className="p-8 text-center text-gray-500">Cargando calificaciones...</div>
      ) : (
        <Card className="overflow-hidden">
          {calificacionesFiltradas.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay calificaciones registradas
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Estudiante</th>
                    <th className="px-3 py-2 text-left font-semibold">Materia</th>
                    <th className="px-3 py-2 text-left font-semibold">Grado/Grupo</th>
                    <th className="px-3 py-2 text-center font-semibold bg-blue-50">Parcial 1<br/><span className="text-xs font-normal">(Cal/Inas)</span></th>
                    <th className="px-3 py-2 text-center font-semibold bg-green-50">Parcial 2<br/><span className="text-xs font-normal">(Cal/Inas)</span></th>
                    <th className="px-3 py-2 text-center font-semibold bg-purple-50">Parcial 3<br/><span className="text-xs font-normal">(Cal/Inas)</span></th>
                    <th className="px-3 py-2 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {calificacionesFiltradas.map((cal) => (
                    <tr key={cal.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-3 py-2 font-medium">{cal.estudiante_nombre}</td>
                      <td className="px-3 py-2">{cal.materia}</td>
                      <td className="px-3 py-2">{cal.grado} {cal.grupo}</td>
                      <td className="px-3 py-2 text-center bg-blue-50">
                        <div className="font-bold text-blue-700">
                          {cal.calificacion_parcial_1 ? Number(cal.calificacion_parcial_1).toFixed(1) : '-'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {cal.inasistencias_parcial_1 || 0} inas.
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center bg-green-50">
                        <div className="font-bold text-green-700">
                          {cal.calificacion_parcial_2 ? Number(cal.calificacion_parcial_2).toFixed(1) : '-'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {cal.inasistencias_parcial_2 || 0} inas.
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center bg-purple-50">
                        <div className="font-bold text-purple-700">
                          {cal.calificacion_parcial_3 ? Number(cal.calificacion_parcial_3).toFixed(1) : '-'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {cal.inasistencias_parcial_3 || 0} inas.
                        </div>
                      </td>
                      <td className="px-3 py-2 flex gap-2">
                        <button
                          onClick={() => handleEdit(cal)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cal.id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition"
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