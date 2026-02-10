'use client';

import React from "react"

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!selectedRole) {
      setError('Por favor selecciona tu rol');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error al iniciar sesión');
        return;
      }

      // Store admin token and role
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('user_role', data.usuario.rol);

      // Map 'administrador' to 'director' for routing
      const roleForRoute = data.usuario.rol === 'administrador' ? 'director' : data.usuario.rol;
      router.push(`/admin/${roleForRoute}`);
    } catch (err) {
      setError('Error de conexión. Por favor intenta de nuevo.');
      console.error('[v0] Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 relative mx-auto mb-4">
              <Image
                src="/logo_epo.jpg"
                alt="EPO 316"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold">Panel Administrativo</h1>
            <p className="text-muted-foreground text-sm mt-2">EPO 316</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-3">
              <AlertCircle className="text-destructive shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@epo316.edu.mx"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  required
                />
              </div>
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Usuario</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                required
              >
                <option value="">Selecciona tu rol</option>
                <option value="director">Director</option>
                <option value="subdirectora">Subdirectora</option>
                <option value="secretaria">Secretaria</option>
                <option value="orientador">Orientador</option>
                <option value="docente">Docente</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-secondary/10 border border-secondary/20 rounded-lg text-sm">
            <p className="font-semibold text-secondary mb-2">Credenciales de Demo:</p>
            <p className="text-muted-foreground">
              <strong>Email:</strong> admin@epo316.edu.mx
            </p>
            <p className="text-muted-foreground">
              <strong>Contraseña:</strong> admin123
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-primary hover:underline text-sm font-medium">
              Volver a inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

