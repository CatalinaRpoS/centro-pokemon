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
            CONCAT(u.name, ' ', u.last_name) as trainer_fullname,
            GROUP_CONCAT(CONCAT(ps.status, ':', s.image) ORDER BY ps.status SEPARATOR ', ') as pokemon_status,
            CONCAT(t1.name, ':', t1.image) as first_type,
            CONCAT(t2.name, ':', t2.image) as second_type
          FROM Pokemon p
          JOIN User u ON p.trainer_email = u.email
          LEFT JOIN Pokemon_Status ps ON p.id = ps.pokemon
          LEFT JOIN Status s ON ps.status = s.name
          LEFT JOIN Type t1 ON p.first_type = t1.name
          LEFT JOIN Type t2 ON p.second_type = t2.name
          GROUP BY
            p.id,
            p.turn,
            p.name,
            p.level,
            p.life_points,
            trainer_fullname
          ORDER BY p.turn
        `;
        const [rows] = await connection.query(query);

        const result = rows.map(row => ({
          ...row,
          pokemon_status: row.pokemon_status ? row.pokemon_status.split(', ').map(info => {
              const [name, image] = info.split(':');
              return { name, image };
          }) : [],
          first_type: row.first_type ? (() => {
            const [name, image] = row.first_type.split(':');
            return { name, image };
          })() : null,
          second_type: row.second_type ? (() => {
            const [name, image] = row.second_type.split(':');
            return { name, image };
          })() : null
      }));

        return result;
      } catch (error) {
        console.log(error);
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
            CONCAT(u.name, ' ', u.last_name) as trainer_fullname,
            GROUP_CONCAT(ps.status ORDER BY ps.status SEPARATOR ', ') as status_names,
            GROUP_CONCAT(s.image ORDER BY ps.status SEPARATOR ', ') as status_images,
            CONCAT(t1.name, ':', t1.image) as first_type,
            CONCAT(t2.name, ':', t2.image) as second_type
          FROM Pokemon p
          JOIN User u ON p.trainer_email = u.email
          LEFT JOIN Pokemon_Status ps ON p.id = ps.pokemon
          LEFT JOIN Status s ON ps.status = s.name
          LEFT JOIN Type t1 ON p.first_type = t1.name
          LEFT JOIN Type t2 ON p.second_type = t2.name
          WHERE p.id = ?
          GROUP BY
            p.id,
            p.turn,
            p.name,
            p.level,
            p.life_points,
            trainer_fullname
        `;
        const [rows] = await connection.query(query, [id]);
        
        const result = rows.map(row => ({
          ...row,
          pokemon_status: row.pokemon_status ? row.pokemon_status.split(', ').map(info => {
              const [name, image] = info.split(':');
              return { name, image };
          }) : [],
          first_type: row.first_type ? (() => {
            const [name, image] = row.first_type.split(':');
            return { name, image };
          })() : null,
          second_type: row.second_type ? (() => {
            const [name, image] = row.second_type.split(':');
            return { name, image };
          })() : null
      }));

        return result[0];
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