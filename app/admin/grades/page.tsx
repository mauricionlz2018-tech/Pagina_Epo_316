'use client';

import React from "react"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import Link from 'next/link';

interface Grade {
  id: string;
  student_id: string;
  student_name: string;
  subject: string;
  grade: number;
  semester: number;
  created_at: string;
}

export default function GradesManagement() {
  const router = useRouter();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ subject: '', grade: 0, semester: 1 });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    student_name: '',
    subject: '',
    grade: 0,
    semester: 1,
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchGrades();
  }, [router]);

  const fetchGrades = async () => {
    try {
      const response = await fetch('/api/admin/grades', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setGrades(data);
    } catch (error) {
      console.error('[v0] Error fetching grades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add grade');

      setFormData({ student_id: '', student_name: '', subject: '', grade: 0, semester: 1 });
      setShowForm(false);
      fetchGrades();
    } catch (error) {
      console.error('[v0] Error adding grade:', error);
    }
  };

  const handleUpdateGrade = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/grades/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify(editValues),
      });

      if (!response.ok) throw new Error('Failed to update');

      setEditingId(null);
      fetchGrades();
    } catch (error) {
      console.error('[v0] Error updating grade:', error);
    }
  };

  const handleDeleteGrade = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta calificación?')) return;

    try {
      const response = await fetch(`/api/admin/grades/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete');

      fetchGrades();
    } catch (error) {
      console.error('[v0] Error deleting grade:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin/dashboard"
            className="p-2 hover:bg-secondary/20 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Gestión de Calificaciones</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Add Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity mb-6"
        >
          <Plus size={20} />
          Agregar Calificación
        </button>

        {/* Add Form */}
        {showForm && (
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <form onSubmit={handleAddGrade} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="ID del Estudiante"
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  className="border border-border rounded-lg px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Nombre del Estudiante"
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                  className="border border-border rounded-lg px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Asignatura"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="border border-border rounded-lg px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="number"
                  placeholder="Calificación (0-100)"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: parseFloat(e.target.value) })}
                  min="0"
                  max="100"
                  className="border border-border rounded-lg px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                  className="border border-border rounded-lg px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={1}>1er Semestre</option>
                  <option value={2}>2do Semestre</option>
                  <option value={3}>3er Semestre</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90"
                >
                  <Check size={20} />
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg font-semibold hover:opacity-90"
                >
                  <X size={20} />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Grades Table */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando calificaciones...</p>
            </div>
          </div>
        ) : grades.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground">No hay calificaciones registradas</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/10 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Estudiante</th>
                    <th className="px-6 py-3 text-left font-semibold">Asignatura</th>
                    <th className="px-6 py-3 text-center font-semibold">Calificación</th>
                    <th className="px-6 py-3 text-center font-semibold">Semestre</th>
                    <th className="px-6 py-3 text-center font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade) => (
                    <tr key={grade.id} className="border-t border-border hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-3">
                        <div>
                          <p className="font-semibold">{grade.student_name}</p>
                          <p className="text-sm text-muted-foreground">{grade.student_id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3">{grade.subject}</td>
                      <td className="px-6 py-3 text-center">
                        {editingId === grade.id ? (
                          <input
                            type="number"
                            value={editValues.grade}
                            onChange={(e) =>
                              setEditValues({ ...editValues, grade: parseFloat(e.target.value) })
                            }
                            min="0"
                            max="100"
                            className="border border-border rounded px-2 py-1 w-20 mx-auto"
                          />
                        ) : (
                          <span className="font-semibold">{grade.grade}</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {editingId === grade.id ? (
                          <select
                            value={editValues.semester}
                            onChange={(e) =>
                              setEditValues({ ...editValues, semester: parseInt(e.target.value) })
                            }
                            className="border border-border rounded px-2 py-1"
                          >
                            <option value={1}>1er</option>
                            <option value={2}>2do</option>
                            <option value={3}>3er</option>
                          </select>
                        ) : (
                          <span>{grade.semester}°</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {editingId === grade.id ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleUpdateGrade(grade.id)}
                              className="p-1 hover:bg-primary/20 rounded transition-colors"
                              title="Guardar"
                            >
                              <Check size={20} className="text-green-600" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 hover:bg-primary/20 rounded transition-colors"
                              title="Cancelar"
                            >
                              <X size={20} className="text-red-600" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => {
                                setEditingId(grade.id);
                                setEditValues({
                                  subject: grade.subject,
                                  grade: grade.grade,
                                  semester: grade.semester,
                                });
                              }}
                              className="p-1 hover:bg-primary/20 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={20} className="text-primary" />
                            </button>
                            <button
                              onClick={() => handleDeleteGrade(grade.id)}
                              className="p-1 hover:bg-primary/20 rounded transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={20} className="text-red-600" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

