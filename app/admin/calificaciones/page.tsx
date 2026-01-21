'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, Edit2, Plus, X, MessageCircle, Download } from 'lucide-react';
import { BoletaGenerator } from '@/components/boleta-generator';

// Materias por grado
const MATERIAS_POR_GRADO: Record<string, string[]> = {
  '1ro': ['Matemáticas I', 'Física I', 'Química I', 'Literatura', 'Historia', 'Inglés', 'Educación Física'],
  '2do': ['Matemáticas II', 'Física II', 'Química II', 'Programación', 'Historia', 'Inglés', 'Educación Física'],
  '3ro': ['Matemáticas III', 'Física III', 'Filosofía', 'Literatura Contemporánea', 'Civismo', 'Inglés', 'Educación Física'],
};

export default function CalificacionesPage() {
  const [calificaciones, setCalificaciones] = useState<any[]>([]);
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filtroGrado, setFiltroGrado] = useState<string>('');
  const [filtroEstudiante, setFiltroEstudiante] = useState<string>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [boletaEstudianteId, setBoletaEstudianteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    grado: '',
    estudiante_id: '',
    semestre: '1',
    materia: '',
    calificacion: '',
    ciclo_escolar: '2025-2026',
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resEst, resCal] = await Promise.all([
        fetch('/api/admin/estudiantes'),
        fetch('/api/admin/calificaciones'),
      ]);

      const dataEst = await resEst.json();
      const dataCal = await resCal.json();

      setEstudiantes(dataEst.estudiantes || []);
      setCalificaciones(dataCal.calificaciones || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar datos');
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
        grado: '',
        estudiante_id: '',
        semestre: '1',
        materia: '',
        calificacion: '',
        ciclo_escolar: '2025-2026',
      });
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => cargarDatos(), 500);
    } catch (error: any) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  const handleEdit = (cal: any) => {
    const estudiante = estudiantes.find(e => e.id === cal.estudiante_id);
    setFormData({
      grado: estudiante?.grado || '',
      estudiante_id: cal.estudiante_id,
      semestre: cal.semestre,
      materia: cal.materia,
      calificacion: cal.calificacion,
      ciclo_escolar: cal.ciclo_escolar,
    });
    setEditingId(cal.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta calificación?')) return;

    try {
      const res = await fetch(`/api/admin/calificaciones?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      alert('Calificación eliminada');
      cargarDatos();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar');
    }
  };

  // Obtener materias del estudiante seleccionado
  const estudianteSeleccionado = estudiantes.find(e => e.id.toString() === formData.estudiante_id);
  const materiasDisponibles = estudianteSeleccionado 
    ? MATERIAS_POR_GRADO[estudianteSeleccionado.grado] || [] 
    : [];

  const enviarWhatsApp = async (calificacion: any) => {
    const estudiante = estudiantes.find(e => e.id === calificacion.estudiante_id);
    if (!estudiante?.telefono) {
      alert('El estudiante no tiene teléfono registrado');
      return;
    }

    try {
      const mensaje = `📚 *Calificación Registrada*\n\nEstudiante: ${estudiante.nombre}\nMateria: ${calificacion.materia}\nCalificación: ${calificacion.calificacion}/10\nSemestre: ${calificacion.semestre}\nCiclo: ${calificacion.ciclo_escolar}\n\n_EPO 316_`;
      
      const res = await fetch('/api/admin/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje,
          telefono: estudiante.telefono,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✓ Mensaje enviado a WhatsApp');
      } else {
        alert(`Error: ${data.error || 'No se pudo enviar'}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const generarDatosBoletaParaEstudiante = (estudianteId: string) => {
    const estudiante = estudiantes.find(e => e.id.toString() === estudianteId);
    if (!estudiante) return null;

    const calificacionesEstudiante = calificaciones.filter(c => c.estudiante_id.toString() === estudianteId);
    
    return {
      nombre_estudiante: estudiante.nombre,
      grado: estudiante.grado,
      semestre: calificacionesEstudiante[0]?.semestre || '1',
      ciclo_escolar: calificacionesEstudiante[0]?.ciclo_escolar || '2025-2026',
      calificaciones: calificacionesEstudiante.map(c => ({
        materia: c.materia,
        calificacion: parseFloat(c.calificacion),
      })),
    };
  };

  const caliFiltradas = filtroEstudiante
    ? calificaciones.filter((c) => c.estudiante_id.toString() === filtroEstudiante)
    : calificaciones;

  // Agrupar por estudiante para mostrar boleta
  const estudiantesConCalificaciones = Array.from(
    new Set(caliFiltradas.map((c) => c.estudiante_id))
  ).map((id) => {
    const cals = caliFiltradas.filter((c) => c.estudiante_id === id);
    const estudiante = estudiantes.find((e) => e.id === id);
    return {
      estudiante_id: id,
      nombre: estudiante?.nombre,
      calificaciones: cals,
    };
  });

  // Estudiantes filtrados por semestre
  const estudiantesPorSemestre = filtroGrado
    ? estudiantes.filter((e) => e.grado === filtroGrado)
    : [];

  if (loading) {
    return <div className="p-8 text-center">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Botones de Acción */}
      <div className="flex gap-3">
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              grado: '',
              estudiante_id: '',
              semestre: '1',
              materia: '',
              calificacion: '',
              ciclo_escolar: '2025-2026',
            });
          }}
          className={`gap-2 ${showForm ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancelar' : 'Nueva Calificación'}
        </Button>
        <Button
          onClick={cargarDatos}
          className="bg-gray-600 hover:bg-gray-700"
        >
          Actualizar
        </Button>
      </div>



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

      <div>
        {/* Form */}
        {showForm && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Editar Calificación' : 'Nueva Calificación'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Grado *</label>
                <select
                  required
                  value={formData.grado}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      grado: e.target.value,
                      estudiante_id: '',
                      materia: ''
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">-- Seleccionar Grado --</option>
                  <option value="1ro">1ro</option>
                  <option value="2do">2do</option>
                  <option value="3ro">3ro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Estudiante *</label>
                <select
                  required
                  disabled={!formData.grado}
                  value={formData.estudiante_id}
                  onChange={(e) =>
                    setFormData({ ...formData, estudiante_id: e.target.value, materia: '' })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {formData.grado ? 'Seleccionar estudiante' : 'Primero selecciona grado'}
                  </option>
                  {estudiantes.filter(e => e.grado === formData.grado).map((est) => (
                    <option key={est.id} value={est.id}>
                      {est.nombre} ({est.numero_inscripcion})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Materia *</label>
                <select
                  required
                  value={formData.materia}
                  onChange={(e) =>
                    setFormData({ ...formData, materia: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  disabled={!formData.estudiante_id}
                >
                  <option value="">Seleccionar materia</option>
                  {materiasDisponibles.map((materia) => (
                    <option key={materia} value={materia}>
                      {materia}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1\">Calificación *</label>
                <select
                  required
                  value={formData.calificacion}
                  onChange={(e) =>
                    setFormData({ ...formData, calificacion: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar calificación</option>
                  <option value="5">5.0</option>
                  <option value="5.5">5.5</option>
                  <option value="6">6.0</option>
                  <option value="6.5">6.5</option>
                  <option value="7">7.0</option>
                  <option value="7.5">7.5</option>
                  <option value="8">8.0</option>
                  <option value="8.5">8.5</option>
                  <option value="9">9.0</option>
                  <option value="9.5">9.5</option>
                  <option value="10">10.0</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Ciclo Escolar *</label>
                <Input
                  required
                  value={formData.ciclo_escolar}
                  onChange={(e) =>
                    setFormData({ ...formData, ciclo_escolar: e.target.value })
                  }
                  placeholder="2025-2026"
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {editingId ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Filtro */}
        <Card className="mb-6 p-4 bg-white">
          <label className="block text-sm font-medium mb-2">Paso 1: Filtrar por grado:</label>
          <select
            value={filtroGrado}
            onChange={(e) => {
              setFiltroGrado(e.target.value);
              setFiltroEstudiante('');
            }}
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="">-- Seleccionar Grado --</option>
            <option value="1ro">1ro</option>
            <option value="2do">2do</option>
            <option value="3ro">3ro</option>
          </select>

          {filtroGrado && (
            <>
              <label className="block text-sm font-medium mb-2">Paso 2: Seleccionar estudiante:</label>
              <select
                value={filtroEstudiante}
                onChange={(e) => setFiltroEstudiante(e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Todos los estudiantes de {filtroGrado}</option>
                {estudiantesPorSemestre.map((est) => (
                  <option key={est.id} value={est.id}>
                    {est.nombre} ({est.numero_inscripcion})
                  </option>
                ))}
              </select>
            </>
          )}
        </Card>

        {/* Table */}
        <Card className="overflow-hidden">
          {caliFiltradas.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay calificaciones registradas
            </div>
          ) : filtroEstudiante ? (
            // Mostrar en formato de boleta cuando está filtrado por estudiante
            <div className="p-6">
              <div className="mb-4 flex items-center gap-4">
                <h3 className="text-lg font-bold">Calificaciones de {estudiantesConCalificaciones[0]?.nombre}</h3>
                <Button
                  onClick={() => setBoletaEstudianteId(filtroEstudiante)}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Download size={18} />
                  Descargar Boleta
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Materia</th>
                      <th className="px-6 py-3 text-center font-semibold">Calificación</th>
                      <th className="px-6 py-3 text-left font-semibold">Semestre</th>
                      <th className="px-6 py-3 text-left font-semibold">Ciclo</th>
                      <th className="px-6 py-3 text-left font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caliFiltradas.map((cal) => (
                      <tr key={cal.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-3">{cal.materia}</td>
                        <td className="px-6 py-3 text-center">
                          <span
                            className={`px-3 py-1 rounded font-bold ${
                              cal.calificacion >= 8
                                ? 'bg-green-100 text-green-700'
                                : cal.calificacion >= 6
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {cal.calificacion}
                          </span>
                        </td>
                        <td className="px-6 py-3">Semestre {cal.semestre}</td>
                        <td className="px-6 py-3">{cal.ciclo_escolar}</td>
                        <td className="px-6 py-3 flex gap-2">
                          <button
                            onClick={() => enviarWhatsApp(cal)}
                            className="text-green-600 hover:text-green-800"
                            title="Enviar por WhatsApp"
                          >
                            <MessageCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(cal)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(cal.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // Mostrar tabla con resumen por estudiante
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Estudiante</th>
                    <th className="px-6 py-3 text-left font-semibold">Materia</th>
                    <th className="px-6 py-3 text-center font-semibold">Calificación</th>
                    <th className="px-6 py-3 text-left font-semibold">Semestre</th>
                    <th className="px-6 py-3 text-left font-semibold">Ciclo</th>
                    <th className="px-6 py-3 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {caliFiltradas.map((cal) => (
                    <tr key={cal.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{cal.estudiante_nombre}</td>
                      <td className="px-6 py-3">{cal.materia}</td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded font-bold ${
                            cal.calificacion >= 8
                              ? 'bg-green-100 text-green-700'
                              : cal.calificacion >= 6
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {cal.calificacion}
                        </span>
                      </td>
                      <td className="px-6 py-3">Semestre {cal.semestre}</td>
                      <td className="px-6 py-3">{cal.ciclo_escolar}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => setBoletaEstudianteId(cal.estudiante_id.toString())}
                          className="text-purple-600 hover:text-purple-800"
                          title="Ver Boleta"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => enviarWhatsApp(cal)}
                          className="text-green-600 hover:text-green-800"
                          title="Enviar por WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(cal)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(cal.id)}
                          className="text-red-600 hover:text-red-800"
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
      </div>
    </div>
  );
}
