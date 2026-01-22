'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, X, Download, Search, User } from 'lucide-react';
import { BoletaGenerator } from '@/components/boleta-generator';

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

interface CalificacionDB {
  id: number;
  estudiante_id: number;
  materia: string;
  grado: string;
  grupo: string;
  calificacion_parcial_1: number;
  inasistencias_parcial_1: number;
  calificacion_parcial_2: number;
  inasistencias_parcial_2: number;
  calificacion_parcial_3: number;
  inasistencias_parcial_3: number;
}

export default function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [calificaciones, setCalificaciones] = useState<CalificacionDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroGrado, setFiltroGrado] = useState<string>('');
  const [busqueda, setBusqueda] = useState<string>('');
  const [boletaDialogOpen, setBoletaDialogOpen] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState<number | null>(null);
  
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
      const [resEst, resCal] = await Promise.all([
        fetch('/api/admin/estudiantes'),
        fetch('/api/admin/calificaciones'),
      ]);
      
      if (!resEst.ok) throw new Error(`Error: ${resEst.status}`);
      
      const dataEst = await resEst.json();
      const dataCal = await resCal.json();
      setEstudiantes(Array.isArray(dataEst.estudiantes) ? dataEst.estudiantes : []);
      setCalificaciones(dataCal.calificaciones || []);
    } catch (error: any) {
      setError(`Error al cargar estudiantes: ${error.message}`);
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

      const res = await fetch('/api/admin/estudiantes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en la operación');

      setSuccess(editingId ? '✓ Estudiante actualizado exitosamente' : '✓ Estudiante agregado exitosamente');
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
      setTimeout(() => {
        cargarEstudiantes();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const generarDatosBoletaParaEstudiante = (estudianteId: number) => {
    const estudiante = estudiantes.find(e => e.id === estudianteId);
    if (!estudiante) return null;

    const calificacionesEstudiante = calificaciones.filter(c => c.estudiante_id === estudianteId);
    
    const materiasConCalificaciones = calificacionesEstudiante.map(cal => ({
      materia: cal.materia,
      calificacion_1: parseFloat(String(cal.calificacion_parcial_1)) || 0,
      calificacion_2: parseFloat(String(cal.calificacion_parcial_2)) || 0,
      calificacion_3: parseFloat(String(cal.calificacion_parcial_3)) || 0,
      inasistencias_1: parseInt(String(cal.inasistencias_parcial_1)) || 0,
      inasistencias_2: parseInt(String(cal.inasistencias_parcial_2)) || 0,
      inasistencias_3: parseInt(String(cal.inasistencias_parcial_3)) || 0,
    }));

    if (materiasConCalificaciones.length === 0) {
      materiasConCalificaciones.push(...[
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
        'CONCIENCIA HISTÓRICA'
      ].map(materia => ({
        materia,
        calificacion_1: 0,
        calificacion_2: 0,
        calificacion_3: 0,
        inasistencias_1: 0,
        inasistencias_2: 0,
        inasistencias_3: 0,
      })));
    }
    
    return {
      nombre_estudiante: estudiante.nombre,
      grado: estudiante.grado,
      grupo: estudiante.grupo,
      ciclo_escolar: '2025-2026',
      calificaciones: materiasConCalificaciones,
    };
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
    if (!confirm('¿Estás seguro de eliminar este estudiante? Esta acción no se puede deshacer.')) return;

    try {
      setError('');
      const res = await fetch(`/api/admin/estudiantes?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');

      setSuccess('✓ Estudiante eliminado exitosamente');
      setTimeout(() => {
        cargarEstudiantes();
        setSuccess('');
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDescargarClick = (estId: number) => {
    setSelectedEstudiante(estId);
    setBoletaDialogOpen(true);
  };

  // FILTRADO Y BÚSQUEDA
  const estudiantesFiltrados = estudiantes.filter(est => {
    const matchGrado = !filtroGrado || est.grado === filtroGrado;
    const matchBusqueda = !busqueda || 
      est.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      est.numero_inscripcion.toLowerCase().includes(busqueda.toLowerCase());
    return matchGrado && matchBusqueda;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estudiantes</h1>
          <p className="text-gray-500 mt-1">Gestiona los estudiantes de la escuela</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
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
          className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="lg"
        >
          <Plus size={20} />
          Agregar Estudiante
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
              {editingId ? '✏️ Editar Estudiante' : '➕ Nuevo Estudiante'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* INFORMACIÓN PERSONAL */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                Información Personal
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Juan Pérez García"
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Correo Electrónico
                    </label>
                    <Input
                      type="email"
                      value={formData.correo}
                      onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                      placeholder="estudiante@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Teléfono
                    </label>
                    <Input
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="5551234567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* INFORMACIÓN ACADÉMICA */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Información Académica
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Número de Inscripción <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={formData.numero_inscripcion}
                    onChange={(e) => setFormData({ ...formData, numero_inscripcion: e.target.value })}
                    placeholder="2026-001"
                    className="font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.estado_inscripcion}
                    onChange={(e) => setFormData({ ...formData, estado_inscripcion: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="activo">✅ Activo</option>
                    <option value="inactivo">⏸️ Inactivo</option>
                    <option value="graduado">🎓 Graduado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Grado <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.grado}
                    onChange={(e) => setFormData({ ...formData, grado: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  >
                    <option value="1ro">1° Primero</option>
                    <option value="2do">2° Segundo</option>
                    <option value="3ro">3° Tercero</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Grupo <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.grupo}
                    onChange={(e) => setFormData({ ...formData, grupo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  >
                    <option value="A">Grupo A</option>
                    <option value="B">Grupo B</option>
                    <option value="C">Grupo C</option>
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
                {editingId ? '💾 Guardar Cambios' : '➕ Agregar Estudiante'}
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

      {/* DIÁLOGO DE BOLETA */}
      <Dialog open={boletaDialogOpen} onOpenChange={setBoletaDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>📄 Boleta del Estudiante</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            {selectedEstudiante && generarDatosBoletaParaEstudiante(selectedEstudiante) && (
              <BoletaGenerator data={generarDatosBoletaParaEstudiante(selectedEstudiante)!} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* FILTROS Y BÚSQUEDA */}
      <Card className="p-6 bg-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              🔍 Buscar Estudiante
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre o número de inscripción..."
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              📚 Filtrar por Grado
            </label>
            <select
              value={filtroGrado}
              onChange={(e) => setFiltroGrado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los grados</option>
              <option value="1ro">1° Primero</option>
              <option value="2do">2° Segundo</option>
              <option value="3ro">3° Tercero</option>
            </select>
          </div>
        </div>
      </Card>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="text-sm opacity-90">Total Estudiantes</div>
          <div className="text-3xl font-bold mt-2">{estudiantes.length}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="text-sm opacity-90">1° Grado</div>
          <div className="text-3xl font-bold mt-2">
            {estudiantes.filter(e => e.grado === '1ro').length}
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="text-sm opacity-90">2° Grado</div>
          <div className="text-3xl font-bold mt-2">
            {estudiantes.filter(e => e.grado === '2do').length}
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="text-sm opacity-90">3° Grado</div>
          <div className="text-3xl font-bold mt-2">
            {estudiantes.filter(e => e.grado === '3ro').length}
          </div>
        </Card>
      </div>

      {/* TABLA */}
      {loading ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            Cargando estudiantes...
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden shadow-md">
          {estudiantesFiltrados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <span className="text-4xl mb-4 block">📚</span>
              <p className="text-lg">No se encontraron estudiantes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                    <th className="px-4 py-3 text-left font-semibold">Inscripción</th>
                    <th className="px-4 py-3 text-center font-semibold">Grado</th>
                    <th className="px-4 py-3 text-center font-semibold">Grupo</th>
                    <th className="px-4 py-3 text-left font-semibold">Contacto</th>
                    <th className="px-4 py-3 text-center font-semibold">Estado</th>
                    <th className="px-4 py-3 text-center font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantesFiltrados.map((est, index) => (
                    <tr 
                      key={est.id} 
                      className={`border-t hover:bg-blue-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-900">{est.nombre}</td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-600">{est.numero_inscripcion}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                          {est.grado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                          {est.grupo}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div>{est.correo || '-'}</div>
                        <div className="text-gray-500">{est.telefono || '-'}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            est.estado_inscripcion === 'activo'
                              ? 'bg-green-100 text-green-700'
                              : est.estado_inscripcion === 'inactivo'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {est.estado_inscripcion.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleDescargarClick(est.id)}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition"
                            title="Descargar Boleta"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(est)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(est.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
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