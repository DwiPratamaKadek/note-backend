const db = require("../config/db");

class Note {
  static async getAll() {
    const [rows] = await db.query(`
          SELECT n.id_note, n.title, n.content, n.deadline, n.created_at,u.username,u.email,p.name,p.level
          FROM note n 
          JOIN user u ON n.id_user = u.id_user
          JOIN priority p ON n. id_priority = p.id_priority
          ORDER BY n.created_at DESC
          `);
    return rows;
  }

  static async create(title, content, deadline, id_user, id_priority) {
    const [result] = await db.query(
      "INSERT INTO note (title,content,deadline,id_user,id_priority) VALUES (?,?,?,?,?)",
      [title, content, deadline, id_user, id_priority]
    );
    return result;
  }

  static async findById(id) {
    const [result] = await db.query(
      `
         SELECT n.id_note, n.title, n.content, n.deadline, n.created_at,u.username,u.email,p.name
          FROM note n 
          JOIN user u ON n.id_user = u.id_user
          JOIN priority p ON n. id_priority = p.id_priority
          WHERE n.id_note = ?`,
      [id]
    );
    return result[0];
  }

  static async update(title, content, deadline, id_user, id_priority,id) {
    const [result] = await db.query(
      `UPDATE note 
     SET title = ?, content = ?, deadline = ?, id_user = ?, id_priority = ?
     WHERE id_note = ?`,
      [title, content, deadline, id_user, id_priority, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM note WHERE id_note=?", [id]);
    return result.affectedRows > 0;
  }
}
module.exports = Note;
