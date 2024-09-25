import { getConnection } from './db.js';

export class RegisterModel {
    static async getAllStatus () {
        const connection = await getConnection();
        try {
            const query = 'SELECT * FROM Status';
            const [rows] = await connection.query(query);
            return rows;
        } catch (error) {
            throw new Error('Failed to fetch status');
        } finally {
            connection.release();
        }
    }

    static async getAllTypes () {
        const connection = await getConnection();
        try {
            const query = 'SELECT * FROM Type';
            const [rows] = await connection.query(query);
            return rows;
        } catch (error) {
            throw new Error('Failed to fetch types');
        } finally {
            connection.release();
        }
    }
}
