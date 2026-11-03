import { pool } from '../db.js';

// Cherche un utilisateur par son email (sans tenir compte des majuscules)
const findByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT id,
            first_name    AS "firstName",
            email,
            password_hash AS "passwordHash",
            role,
            family_id AS "familyId"
     FROM users
     WHERE lower(email) = lower($1)`,
    [email],
  );
  return rows[0] ?? null;
};

// Crée un utilisateur et le renvoie (SANS le hash du mot de passe)
// db : la connexion à utiliser (pool par défaut, ou le client d'une transaction)
const create = async (
  { firstName, email, passwordHash, role, familyId },
  db = pool,
) => {
  const { rows } = await db.query(
    `INSERT INTO users (first_name, email, password_hash, role, family_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id,
               first_name AS "firstName",
               email,
               role,
               family_id  AS "familyId"`,
    [firstName, email, passwordHash, role, familyId],
  );
  return rows[0];
};

export const userModel = { findByEmail, create };
