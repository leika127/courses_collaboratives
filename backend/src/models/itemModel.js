import { pool } from '../db.js';

export const findAllItems = async () => {
  const result = await pool.query('SELECT * FROM item ORDER BY name ASC;');
  return result.rows;
};