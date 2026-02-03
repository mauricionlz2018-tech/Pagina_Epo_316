import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { ejecutarConsulta } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: 'El correo, contraseña y rol son requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el rol tiene acceso al panel administrativo
    const rolesPermitidos = ['director', 'subdirectora', 'secretaria', 'orientador', 'docente'];
    if (!rolesPermitidos.includes(role)) {
      return NextResponse.json(
        { message: 'Acceso denegado. Rol no válido' },
        { status: 403 }
      );
    }

    let tableName = '';
    let userData: any = null;

    // Determinar la tabla según el rol
    switch (role) {
      case 'director':
        tableName = 'director';
        break;
      case 'subdirectora':
        tableName = 'subdirectora';
        break;
      case 'secretaria':
        tableName = 'secretaria';
        break;
      case 'orientador':
        tableName = 'orientador';
        break;
      case 'docente':
        tableName = 'profesores';
        break;
    }

    // Consultar usuario por correo en la tabla correspondiente
    const usuarios = await ejecutarConsulta(
      `SELECT id, nombre, correo, contraseña FROM ${tableName} WHERE correo = ? AND activo = 1`,
      [email]
    ) as any[];

    console.log('[Login] Búsqueda de usuario:', { email, role, table: tableName, encontrado: usuarios?.length > 0 });

    if (!usuarios || usuarios.length === 0) {
      console.log('[Login] Usuario no encontrado:', email);
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const usuario = usuarios[0];
    console.log('[Login] Usuario encontrado:', { correo: usuario.correo, rol: role });

    // Verificar contraseña (en producción usar bcrypt)
    if (usuario.contraseña !== password) {
      console.log('[Login] Contraseña incorrecta para:', email);
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token
    const token = crypto.randomBytes(32).toString('hex');

    return NextResponse.json({
      token,
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        rol: role,
        nombre: usuario.nombre,
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
