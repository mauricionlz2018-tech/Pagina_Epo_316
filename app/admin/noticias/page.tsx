'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, Edit2, Plus, X } from 'lucide-react';

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    categoria: 'General',
    publicado: true,
  });

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    try {
      const res = await fetch('/api/admin/noticias');
      const data = await res.json();
      setNoticias(data.noticias || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar noticias');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId
        ? { ...formData, id: editingId }
        : formData;

      const res = await fetch('/api/admin/noticias', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Error en la operación');
        return;
      }

      alert(editingId ? 'Noticia actualizada' : 'Noticia creada');
      setFormData({
        titulo: '',
        contenido: '',
        categoria: 'General',
        publicado: true,
      });
      setEditingId(null);
      setShowForm(false);
      cargarNoticias();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar');
    }
  };

  const handleEdit = (noticia: any) => {
    setFormData({
      titulo: noticia.titulo,
      contenido: noticia.contenido,
      categoria: noticia.categoria,
      publicado: Boolean(noticia.publicado),
    });
    setEditingId(noticia.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta noticia?')) return;

    try {
      const res = await fetch(`/api/admin/noticias?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      alert('Noticia eliminada');
      cargarNoticias();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Gestión de Noticias</h1>
            <p className="text-gray-600 mt-2">Total: {noticias.length} noticias</p>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                titulo: '',
                contenido: '',
                categoria: 'General',
                publicado: true,
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Plus size={20} />
            Nueva Noticia
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8 p-6 border-blue-200 bg-blue-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingId ? 'Editar' : 'Nueva'} Noticia
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título *</label>
                <Input
                  required
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  placeholder="Título de la noticia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contenido *</label>
                <textarea
                  required
                  value={formData.contenido}
                  onChange={(e) =>
                    setFormData({ ...formData, contenido: e.target.value })
                  }
                  placeholder="Escribe el contenido aquí..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="General">General</option>
                    <option value="Académico">Académico</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Actividades">Actividades</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.publicado}
                      onChange={(e) =>
                        setFormData({ ...formData, publicado: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Publicar ahora</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 flex-1"
                >
                  {editingId ? 'Actualizar' : 'Publicar'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Grid de Noticias */}
        {noticias.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            No hay noticias registradas
          </Card>
        ) : (
          <div className="grid gap-4">
            {noticias.map((noticia) => (
              <Card key={noticia.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {noticia.titulo}
                      </h2>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          noticia.publicado
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {noticia.publicado ? 'Publicado' : 'Borrador'}
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                        {noticia.categoria}
                      </span>
                    </div>

                    <p className="text-gray-600 line-clamp-2">{noticia.contenido}</p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(noticia.fecha_creacion).toLocaleDateString('es-MX')}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(noticia)}
                      className="text-blue-600 hover:text-blue-800 p-2"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(noticia.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

