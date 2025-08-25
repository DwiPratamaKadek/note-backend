const db = require("../config/db");

class Priority {
  static async getAll() {
    const [rows] = await db.query(`SELECT * FROM priority `);
    return rows;
  }

  static async create(name, level, color) {
    const [result] = await db.query(
      "INSERT INTO priority  (name, level, color) VALUES (?,?,?)",
      [name, level, color]
    );
    return result;
  }

  static async findById(id) {
    const [rows] = await db.query(
        `
            SELECT * FROM priority WHERE id_priority = ?
        `, [id]
    );
    return rows[0];
  }

  static async update(name, level, color, id) {
    const [result] = await db.query(
      `
        UPDATE priority 
        SET name = ?, level = ?, color = ? 
        WHERE id_priority = ?
     `,
      [name, level, color, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM priority WHERE id_priority=?", [id]);
    return result.affectedRows > 0;
  }
}
module.exports = Priority;
