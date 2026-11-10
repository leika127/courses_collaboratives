import { pool } from '../db.js';

export const listeModel = {
  // Toutes les listes d'une famille (la plus ancienne en premier)
  async trouverParFamille(familyId) {
    const { rows } = await pool.query(
      'SELECT id, name, date_created AS "dateCreated" FROM List WHERE family_id = $1 ORDER BY id',
      [familyId],
    );
    return rows;
  },

  // Crée une liste pour une famille
  // db : la connexion à utiliser (pool par défaut, ou le client d'une transaction)
  async creer(name, familyId, db = pool) {
    const { rows } = await db.query(
      'INSERT INTO List (name, family_id) VALUES ($1, $2) RETURNING id, name, date_created AS "dateCreated"',
      [name, familyId],
    );
    return rows[0];
  },

  async trouverParId(id) {
    const { rows } = await pool.query(
      'SELECT id, name, family_id AS "familyId" FROM List WHERE id = $1',
      [id],
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
      [listId],
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
      [achete ?? null, quantity ?? null, articleId, listId],
    );
    return rows[0] ?? null;
  },

  async supprimerArticle(listId, articleId) {
    const { rowCount } = await pool.query(
      'DELETE FROM List_item WHERE id = $1 AND list_id = $2',
      [articleId, listId],
    );
    return rowCount > 0;
  },
  async trouverItemParId(id) {
    const { rows } = await pool.query('SELECT id FROM Item WHERE id = $1', [
      id,
    ]);
    return rows[0] ?? null;
  },

  // Ajoute l'article, ou augmente sa quantité s'il est déjà dans la liste
  async ajouterArticle(listId, itemId, quantity) {
    const { rows } = await pool.query(
      `WITH ajout AS (
         INSERT INTO List_item (list_id, item_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT (list_id, item_id)
         DO UPDATE SET quantity = List_item.quantity + EXCLUDED.quantity
         RETURNING id, item_id, is_checked, quantity
       )
       SELECT a.id, i.name AS nom, a.is_checked AS achete, a.quantity
       FROM ajout a
       JOIN Item i ON i.id = a.item_id`,
      [listId, itemId, quantity],
    );
    return rows[0];
  },
};
