import { getConnection } from './db.js';

export class PokemonModel {
    static async getAll () {
      const connection = await getConnection();
      try {
        const query = `
          SELECT
            p.id,
            p.turn,
            p.name,
            p.level,
            p.life_points,
            p.first_type,
            p.second_type,
            CONCAT(u.name, ' ', u.last_name) as trainer_fullname
          FROM Pokemon p
          JOIN User u ON p.trainer_email = u.email
          ORDER BY p.turn
        `;
        const [rows] = await connection.query(query);
        return rows;
      } catch (error) {
        throw new Error('Failed to fetch pokemones');
      } finally {
        connection.release();
      }
    }
  
    static async getById ({ id }) {
      const connection = await getConnection();
      try {
        const query = `
          SELECT
            p.id,
            p.turn,
            p.name,
            p.level,
            p.life_points,
            p.first_type,
            p.second_type,
            CONCAT(u.name, ' ', u.last_name) as trainer_fullname
          FROM Pokemon p
          JOIN User u ON p.trainer_email = u.email
          WHERE p.id = ?
        `;
        const [rows] = await connection.query(query, [id]);
        return rows[0];
      } catch (error) {
        throw new Error('Failed to fetch pokemon by ID');
      } finally {
        connection.release();
      }
    }
  
    static async create (data) {
      const connection = await getConnection();
      try {
        const query = 'INSERT INTO Pokemon (name, level, id_entrenador, turn, lifePoints, status, type) VALUES (?, ?, ?, ?)'
        const { name, level, id_entrenador, turn, lifePoints, status, type } = data
        const [result] = await connection.query(query, [name, level, id_entrenador, turn, lifePoints, status, type])
        return { id: result.insertId, ...data };
      } catch (error) {
        throw new Error('Failed to create pokemon');
      } finally {
        connection.release();
      }
    }
  
    static async update ({ id, input }) {
      const connection = await getConnection();
      try {
        const fields = Object.keys(input).map(key => `${key} = ?`).join(', ')
        const values = Object.values(input)
        values.push(id);
  
        const query = `UPDATE Pokemon SET ${fields} WHERE id = ?`
        await connection.query(query, values);

        return { id, ...input }
      } catch (error) {
        throw new Error('Failed to update pokemon');
      } finally {
        connection.release();
      }
    }
  
    static async delete ({ id }) {
      const connection = await getConnection();
      try {
        const query = 'DELETE FROM Pokemon WHERE id = ?';
        const [result] = await connection.query(query, [id]);
        return result.affectedRows > 0;
      } catch (error) {
        throw new Error('Failed to delete pokemon');
      } finally {
        connection.release();
      }
    }
  }