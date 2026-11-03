import { pool } from '../db.js';

// Cherche un utilisateur par son email (sans tenir compte des majuscules)
const findByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT id,
            first_name    AS "firstName",
            email,
            password_hash AS "passwordHash",
            role,
            family_id     AS "familyId"
     FROM users
     WHERE lower(email) = lower($1)`,
    [email],
  );
  return rows[0] ?? null;
};

export const userModel = { findByEmail };
