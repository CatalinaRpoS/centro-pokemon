import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: 'bphk9wvdfyawpnb1iiez-mysql.services.clever-cloud.com',
  database: 'bphk9wvdfyawpnb1iiez',
  user: 'uctisvp7bw5nojq9',
  port: 3306,
  password: 'FLwpFD1FSjeiUC9TpzZ0'
}

const connection = await mysql.createConnection(config);

export class PokemonModel {
    static async getAll (filter = {}) {
      try {
        const query = 'SELECT * FROM pokemones'
        const conditions = []
        const values = []
  
        if (filter.id_entrenador) {
          conditions.push('id_entrenador = ?')
          values.push(filter.id_entrenador)
        }
  
        const finalQuery = conditions.length ? `${query} WHERE ${conditions.join(' AND ')}` : query
        const [rows] = await connection.query(finalQuery, values)
        return rows
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