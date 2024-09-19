import { initDBConnection } from './db.js';

let connection;
(async () => {
  connection = await initDBConnection();
})();

export class TrainerModel {
    static async getAllStatus () {
        try {
            const query = 'SELECT * FROM Estado'
            const [rows] = await connection.query(query)
            return rows
        } catch (error) {
            throw new Error('Failed to fetch status')
        }
    }

    static async getAllTypes () {
        try {
            const query = 'SELECT * FROM Tipo'
            const [rows] = await connection.query(query)
            return rows
        } catch (error) {
            throw new Error('Failed to fetch types')
        }
    }
}
