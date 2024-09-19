import { initDBConnection } from './db.js';

let connection;
(async () => {
  connection = await initDBConnection();
})();
export class PokemonModel {
    static async getAll () {
      try {
        const query = 'SELECT * FROM Pokemon';
        const [rows] = await connection.query(query);
        return rows;
      } catch (error) {
        throw new Error('Failed to fetch pokemones')
      }
    }
  
    static async getById ({ id }) {
      try {
        const query = 'SELECT * FROM pokemones WHERE id = ?'
        const [rows] = await connection.query(query, [id])
        return rows[0]
      } catch (error) {
        throw new Error('Failed to fetch pokemon by ID')
      }
    }
  
    static async create (data) {
      try {
        const query = 'INSERT INTO pokemones (name, level, id_entrenador, turn, lifePoints, status, type) VALUES (?, ?, ?, ?)'
        const { name, level, id_entrenador, turn, lifePoints, status, type } = data
        const [result] = await connection.query(query, [name, level, id_entrenador, turn, lifePoints, status, type])
        return { id: result.insertId, ...data }
      } catch (error) {
        throw new Error('Failed to create pokemon')
      }
    }
  
    static async update ({ id, input }) {
      try {
        const fields = Object.keys(input).map(key => `${key} = ?`).join(', ')
        const values = Object.values(input)
        values.push(id)
  
        const query = `UPDATE pokemones SET ${fields} WHERE id = ?`
        await connection.query(query, values)
        return { id, ...input }
      } catch (error) {
        throw new Error('Failed to update pokemon')
      }
    }
  
    static async delete ({ id }) {
      try {
        const query = 'DELETE FROM pokemones WHERE id = ?'
        const [result] = await connection.query(query, [id])
        return result.affectedRows > 0
      } catch (error) {
        throw new Error('Failed to delete pokemon')
      }
    }
  }