import { pool } from '../db.js';

// Crée une famille et la renvoie
// db : la connexion à utiliser (pool par défaut, ou le client d'une transaction)
const create = async (name, db = pool) => {
  const { rows } = await db.query(
    `INSERT INTO Family (name)
     VALUES ($1)
     RETURNING id, name, date_created AS "dateCreated"`,
    [name],
  );
  return rows[0];
};

export const familyModel = { create };
