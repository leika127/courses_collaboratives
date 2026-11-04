import { pool } from '../db.js';

const COLONNES_PUBLIQUES = 'id, name, email, role, date_created';

export async function trouverParEmail(email) {
  const { rows } = await pool.query(
    `SELECT ${COLONNES_PUBLIQUES}, password_hash FROM user_app WHERE email = $1`,
    [email]
  );
  return rows[0] ?? null;
}

export async function trouverParId(id) {
  const { rows } = await pool.query(
    `SELECT ${COLONNES_PUBLIQUES} FROM user_app WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function creer({ name, email, password_hash }) {
  const { rows } = await pool.query(
    `INSERT INTO user_app (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING ${COLONNES_PUBLIQUES}`,
    [name, email, password_hash]
  );
  return rows[0];
}