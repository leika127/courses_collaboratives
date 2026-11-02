import { pool } from '../db.js';

export const listeModel = {
  async trouverParId(id) {
    const { rows } = await pool.query(
      'SELECT id, name FROM List WHERE id = $1',
      [id]
    );
    return rows[0] ?? null;
  },

  async trouverArticlesParListeId(listId) {
    const { rows } = await pool.query(
      `SELECT li.id, i.name AS nom, li.is_checked AS achete, li.quantity
       FROM List_item li
       JOIN Item i ON i.id = li.item_id
       WHERE li.list_id = $1
       ORDER BY li.id`,
      [listId]
    );
    return rows;
  }
};