import mysql from 'mysql2/promise';

// Crear pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'epo_316_crud',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
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
    const [resultados] = await conexion.execute(sql, values);
    return resultados;
  } catch (error) {
    console.error('[BD] Error ejecutando consulta:', error);
    console.error('[BD] SQL:', sql);
    console.error('[BD] Valores:', values);
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
  } catch (error) {
    console.error('[BD] Error en consulta con conexión:', error);
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
    return conexion;
  } catch (error) {
    console.error('[BD] Error obteniendo conexión:', error);
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
    console.log('[BD] Conexión verificada correctamente');
    return true;
  } catch (error) {
    console.error('[BD] Error verificando conexión:', error);
    return false;
  }
}

export default pool;
