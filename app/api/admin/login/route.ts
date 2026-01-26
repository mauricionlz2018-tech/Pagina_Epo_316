import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { ejecutarConsulta } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'El correo y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Consultar usuario por correo en la tabla usuarios
    const usuarios = await ejecutarConsulta(
      'SELECT id, correo, contraseña, rol FROM usuarios WHERE correo = ?',
      [email]
    ) as any[];

    console.log('[Login] Búsqueda de usuario:', { email, encontrado: usuarios?.length > 0 });

    if (!usuarios || usuarios.length === 0) {
      console.log('[Login] Usuario no encontrado:', email);
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const usuario = usuarios[0];
    console.log('[Login] Usuario encontrado:', { correo: usuario.correo, rol: usuario.rol });

    // Verificar contraseña (en producción usar bcrypt)
    if (usuario.contraseña !== password) {
      console.log('[Login] Contraseña incorrecta para:', email);
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar si el rol tiene acceso al panel administrativo
    const rolesPermitidos = ['director', 'subdirectora', 'secretaria', 'orientador', 'docente'];
    if (!rolesPermitidos.includes(usuario.rol)) {
      return NextResponse.json(
        { message: 'Acceso denegado. No tienes permisos para acceder al panel administrativo' },
        { status: 403 }
      );
    }

    // Generar token
    const token = crypto.randomBytes(32).toString('hex');

    return NextResponse.json({
      token,
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
      },
      message: 'Inicio de sesión exitoso',
    });
  } catch (error) {
    console.error('[Admin] Error en login:', error);
    return NextResponse.json(
      { 
        message: 'Error al procesar la solicitud',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
