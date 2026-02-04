import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { ejecutarConsulta, verificarConexion } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    console.log('[Login] Intento de login:', { email, role });

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

    // Verificar conexión a la base de datos
    const conexionOk = await verificarConexion();
    if (!conexionOk) {
      console.error('[Login] No se pudo conectar a la base de datos');
      return NextResponse.json(
        { message: 'Error de conexión a la base de datos. Verifica que XAMPP esté corriendo y la base de datos seguimiento_epo_316 exista.' },
        { status: 500 }
      );
    }

    let tableName = '';

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

    console.log('[Login] Buscando en tabla:', tableName);

    // Consultar usuario por correo en la tabla correspondiente
    // Usamos "contrasena" sin tilde para evitar problemas de encoding
    let usuarios: any[];
    try {
      usuarios = await ejecutarConsulta(
        `SELECT id, nombre, correo, contraseña as contrasena FROM ${tableName} WHERE correo = ? AND activo = 1`,
        [email]
      ) as any[];
    } catch (dbError: any) {
      console.error('[Login] Error en consulta SQL:', dbError);
      // Si hay error con la columna contraseña, intentar sin alias
      if (dbError.message && dbError.message.includes('contraseña')) {
        usuarios = await ejecutarConsulta(
          `SELECT id, nombre, correo, contrasena FROM ${tableName} WHERE correo = ? AND activo = 1`,
          [email]
        ) as any[];
      } else {
        throw dbError;
      }
    }

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

    // Obtener la contraseña del usuario (puede estar en diferentes campos)
    const passwordFromDB = usuario.contrasena || usuario.contraseña;

    // Verificar contraseña (en producción usar bcrypt)
    if (passwordFromDB !== password) {
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
        error: error instanceof Error ? error.message : 'Error desconocido',
        hint: 'Verifica que XAMPP esté corriendo y que la base de datos seguimiento_epo_316 exista con las tablas correctas'
      },
      { status: 500 }
    );
  }
}
