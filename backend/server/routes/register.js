import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../db.js';

export const registerRouter = express.Router();

// POST /api/register — crée une famille et son organisateur
registerRouter.post('/', async (req, res) => {
  const { familyName, firstName, email, password } = req.body;

  // 1. Vérifier que les quatre champs sont remplis
  if (!familyName || !firstName || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
  }

  // 2. Nettoyer l'email : sans espaces autour, en minuscules
  const normalizedEmail = email.trim().toLowerCase();

  // 3. Hacher le mot de passe (on ne stocke jamais le mot de passe en clair)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Créer la famille puis l'organisateur, dans une transaction
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const familyResult = await client.query(
      'INSERT INTO families (name) VALUES ($1) RETURNING id, name',
      [familyName],
    );
    const family = familyResult.rows[0];

    // La COLONNE s'appelle password_hash : on y range le hash, pas le mot de passe
    const userResult = await client.query(
      `INSERT INTO users (first_name, email, password_hash, role, family_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, email, role`,
      [firstName, normalizedEmail, hashedPassword, 'organizer', family.id],
    );
    const user = userResult.rows[0];

    await client.query('COMMIT');
    return res.status(201).json({ family: family, user: user });
  } catch (error) {
    await client.query('ROLLBACK');
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    client.release();
  }
});
