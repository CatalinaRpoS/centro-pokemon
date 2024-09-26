import { getConnection } from "./db.js";

export class TrainerModel {
  static async getAllStatus() {
    const connection = await getConnection();
    try {
      const query = "SELECT * FROM Status";
      const [rows] = await connection.query(query);
      return rows;
    } catch (error) {
      throw new Error("Failed to fetch status");
    } finally {
      connection.release();
    }
  }

  static async getAllTypes() {
    const connection = await getConnection();
    try {
      const query = "SELECT * FROM Type";
      const [rows] = await connection.query(query);
      return rows;
    } catch (error) {
      throw new Error("Failed to fetch types");
    } finally {
      connection.release();
    }
  }

  static async getPokemonsById({ id }) {
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
            WHERE u.email = ?
            GROUP BY
              p.id,
              p.turn,
              p.name,
              p.level,
              p.life_points,
              trainer_fullname
            ORDER BY p.turn DESC
          `;
      const [rows] = await connection.query(query, [id]);

      const result = rows.map((row) => ({
        ...row,
        pokemon_status: row.pokemon_status
          ? row.pokemon_status.split(", ").map((info) => {
              const [name, image] = info.split(":");
              return { name, image };
            })
          : [],
        first_type: row.first_type
          ? (() => {
              const [name, image] = row.first_type.split(":");
              return { name, image };
            })()
          : null,
        second_type: row.second_type
          ? (() => {
              const [name, image] = row.second_type.split(":");
              return { name, image };
            })()
          : null,
      }));

      return result;
    } catch (error) {
      throw new Error("Failed to fetch pokemon by user ID");
    } finally {
      connection.release();
    }
  }
}
