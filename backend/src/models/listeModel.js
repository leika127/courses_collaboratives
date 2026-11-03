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
  },

  async modifierArticle(listId, articleId, { achete, quantity }) {
    const { rows } = await pool.query(
      `UPDATE List_item
       SET is_checked = COALESCE($1, is_checked),
           quantity   = COALESCE($2, quantity)
       WHERE id = $3 AND list_id = $4
       RETURNING id, is_checked AS achete, quantity`,
      [achete ?? null, quantity ?? null, articleId, listId]
    );
    return rows[0] ?? null;
  },

  async supprimerArticle(listId, articleId) {
    const { rowCount } = await pool.query(
      'DELETE FROM List_item WHERE id = $1 AND list_id = $2',
      [articleId, listId]
    );
    return rowCount > 0;
  }
};