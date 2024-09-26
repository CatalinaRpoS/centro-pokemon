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
          ORDER BY p.turn DESC
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
            GROUP_CONCAT(CONCAT(ps.status, ':', s.image) ORDER BY ps.status SEPARATOR ', ') as pokemon_status,
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
        // Calcular la prioridad
        const lifePoints = data.life_points / 255;
        const levelPoints = 1 - (data.level / 100);

        let status = 0;
        for (const s of data.pokemon_status) {
          status += s.priority;
        }
        const turn = (((1 - lifePoints) * 65) + (status * 30) + (levelPoints * 5));
    
        // Verificar si second_type es null
        data.second_type = data.second_type || null;
    
        // Insertar en la tabla Pokemon
        const query = 'INSERT INTO Pokemon (trainer_email, name, level, turn, life_points, first_type, second_type) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const { name, level, trainer_email, life_points, first_type, second_type } = data;
        const [result] = await connection.query(query, [trainer_email, name, level, turn, life_points, first_type, second_type]);
    
        // Obtener pokemonId después de la inserción
        const pokemonId = result.insertId;
        console.log('Pokemon ID:', pokemonId);
    
        // Insertar en Pokemon_Status si hay estados
        if (data.pokemon_status.length) {
          const statusQuery = 'INSERT INTO Pokemon_Status (status, pokemon) VALUES ?';
          const statusValues = data.pokemon_status.map(s => [s.name, pokemonId]);
          await connection.query(statusQuery, [statusValues]);
        }
    
        return result;
    
      } catch (error) {
        console.log(error);
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