const db = require("../config/db");

class User {
  static async getAll() {
    const [rows] = await db.query(`SELECT * FROM user `);
    return rows;
  }

  static async create(username, email, password) {
    const [result] = await db.query(
      "INSERT INTO user (username, email, password) VALUES (?,?,?)",
      [username, email, password]
    );
    return result;
  }

  static async findById(id) {
    const [rows] = await db.query(
        `
            SELECT * FROM user WHERE id_user= ?
        `, [id]
    );
    return rows[0];
  }

  static async update(username, email, password, id) {
    const [result] = await db.query(
      `
        UPDATE user 
        SET username = ?, email = ?, password = ? 
        WHERE id_user = ?
     `,
      [username, email, password, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM user WHERE id_user=?", [id]);
    return result.affectedRows > 0;
  }
}
module.exports = User;
