import mysql from 'mysql2/promise';

// IMPORTANTE: Railway usa nombres SIN GUIONES BAJOS
// MYSQLHOST en lugar de MYSQL_HOST, MYSQLUSER en lugar de MYSQL_USER, etc.

// Crear pool de conexiones a MySQL para Railway
const pool = mysql.createPool({
  // Usa las variables de Railway (SIN guiones bajos)
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.MYSQL_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'seguimiento_epo_316',
  port: parseInt(process.env.MYSQLPORT || process.env.MYSQL_PORT || '3306'),
  
  // CONFIGURACIÓN SSL OBLIGATORIA para Railway (externa)
  ssl: (process.env.MYSQLHOST && !process.env.MYSQLHOST.includes('localhost')) 
    ? { rejectUnauthorized: false } 
    : undefined,
  
  // Configuración optimizada para Railway
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  charset: 'utf8mb4',
  
  // Soporte para autenticación de Railway
  authPlugins: {
    mysql_clear_password: () => () => {
      const password = process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || '';
      return Buffer.from(password + '\0');
    }
  }
});

console.log('[BD] Configuración de conexión:', {
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQLPORT || process.env.MYSQL_PORT || '3306',
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'seguimiento_epo_316',
  sslEnabled: (process.env.MYSQLHOST && !process.env.MYSQLHOST.includes('localhost'))
});

/**
 * Ejecuta una consulta SQL en la base de datos
 * @param sql - Consulta SQL con placeholders (?)
 * @param values - Valores para los placeholders
 * @returns Resultados de la consulta
 */
export async function ejecutarConsulta(sql: string, values: any[] = []): Promise<any> {
  let conexion = null;
  try {
    conexion = await pool.getConnection();
    console.log('[BD] Ejecutando consulta:', { sql, valuesLength: values.length });
    const [resultados] = await conexion.execute(sql, values);
    return resultados;
  } catch (error: any) {
    console.error('[BD] Error ejecutando consulta:', error.message);
    console.error('[BD] SQL:', sql);
    console.error('[BD] Valores:', values);
    console.error('[BD] Código de error:', error.code);
    throw error;
  } finally {
    if (conexion) {
      await conexion.release();
    }
  }
}

/**
 * Ejecuta una consulta con una conexión proporcionada
 * @param conexion - Conexión MySQL activa
 * @param sql - Consulta SQL
 * @param values - Valores para los placeholders
 * @returns Resultados de la consulta
 */
export async function ejecutarConConexion(conexion: any, sql: string, values: any[] = []): Promise<any> {
  try {
    const [resultados] = await conexion.execute(sql, values);
    return resultados;
  } catch (error: any) {
    console.error('[BD] Error en consulta con conexión:', error.message);
    throw error;
  }
}

/**
 * Obtiene una conexión del pool para transacciones
 * @returns Conexión MySQL
 */
export async function obtenerConexion() {
  try {
    const conexion = await pool.getConnection();
    // Verificar que la conexión funciona
    await conexion.ping();
    console.log('[BD] Conexión obtenida correctamente');
    return conexion;
  } catch (error: any) {
    console.error('[BD] Error obteniendo conexión:', error.message);
    console.error('[BD] Código de error:', error.code);
    console.error('[BD] Variables disponibles:', {
      MYSQLHOST: process.env.MYSQLHOST,
      MYSQLPORT: process.env.MYSQLPORT,
      MYSQLUSER: process.env.MYSQLUSER,
      MYSQLDATABASE: process.env.MYSQLDATABASE,
      MYSQLPASSWORD: process.env.MYSQLPASSWORD ? '***' : 'No definida'
    });
    throw error;
  }
}

/**
 * Verifica la conexión a la base de datos
 * @returns true si la conexión es exitosa
 */
export async function verificarConexion(): Promise<boolean> {
  try {
    const conexion = await pool.getConnection();
    await conexion.ping();
    await conexion.release();
    console.log('[BD] ✅ Conexión verificada correctamente con Railway');
    return true;
  } catch (error: any) {
    console.error('[BD] ❌ Error verificando conexión:', error.message);
    console.error('[BD] Detalles:', {
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
      user: process.env.MYSQLUSER,
      database: process.env.MYSQLDATABASE
    });
    return false;
  }
}

// Función especial para diagnóstico
export async function diagnosticarConexion() {
  try {
    const conexion = await obtenerConexion();
    const [version] = await conexion.execute('SELECT VERSION() as version');
    const [tablas] = await conexion.execute('SHOW TABLES');
    await conexion.release();
    
    return {
      success: true,
      version,
      tablas: tablas,
      totalTablas: Array.isArray(tablas) ? tablas.length : 0,
      connectionInfo: {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        database: process.env.MYSQLDATABASE,
        user: process.env.MYSQLUSER
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      code: error.code,
      connectionInfo: {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        database: process.env.MYSQLDATABASE,
        user: process.env.MYSQLUSER
      }
    };
  }
}

export default pool;