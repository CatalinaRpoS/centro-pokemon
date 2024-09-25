import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  port: process.env.MYSQL_ADDON_PORT ? parseInt(process.env.MYSQL_ADDON_PORT, 10) : 3306,
  password: process.env.MYSQL_ADDON_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
