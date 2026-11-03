import bcrypt from 'bcryptjs';
import { pool } from '../db.js';
import { familyModel } from '../models/family.model.js';
import { userModel } from '../models/user.model.js';
import { httpError } from '../utils/httpError.js';

// Inscription : crée une famille et son organisateur, en une seule transaction
const register = async ({ familyName, firstName, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Règle métier : un email = un seul compte (vérification rapide AVANT le hachage)
  const existingUser = await userModel.findByEmail(normalizedEmail);
  if (existingUser) {
    throw httpError(409, 'Cet email est déjà utilisé');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const family = await familyModel.create(familyName, client);
    const user = await userModel.create(
      {
        firstName: firstName,
        email: normalizedEmail,
        passwordHash: passwordHash,
        role: 'organizer',
        familyId: family.id,
      },
      client,
    );

    await client.query('COMMIT');
    return { family: family, user: user };
  } catch (error) {
    await client.query('ROLLBACK');
    // 23505 = violation d'unicité : deux inscriptions au même instant avec le même email
    if (error.code === '23505') {
      throw httpError(409, 'Cet email est déjà utilisé');
    }
    throw error;
  } finally {
    client.release();
  }
};

export const authService = { register };
