import { pool } from '../db.js';

export const findCategoriesWithItems = async () => {
  const result = await pool.query(
    `SELECT c.id AS category_id, c.name AS category_name, i.id, i.name
     FROM category c
     LEFT JOIN item i ON i.category_id = c.id
     ORDER BY c.id, i.name;`
  );
  return result.rows;
};