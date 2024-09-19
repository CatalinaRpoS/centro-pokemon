import mysql from 'mysql2/promise';
import 'dotenv/config';

const config = {
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  port: process.env.MYSQL_ADDON_PORT ? parseInt(process.env.MYSQL_ADDON_PORT, 10) : 3306,
  password: process.env.MYSQL_ADDON_PASSWORD,
}

async function initDBConnection() {
  try {
    const connection = await mysql.createConnection(config);
    return connection;
  } catch (error) {
    throw new Error('Error conectando a la base de datos: ' + error.message);
  }
}

export default initDBConnection;
