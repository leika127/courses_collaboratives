import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

// Connexion : vérifie email + mot de passe, renvoie un token et l'utilisateur
const login = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await userModel.findByEmail(normalizedEmail);

  // Même message dans les 2 cas : on ne révèle pas si l'email existe
  if (!user) {
    throw httpError(401, 'Email ou mot de passe incorrect');
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw httpError(401, 'Email ou mot de passe incorrect');
  }

  // Le "badge" : ce qu'on met dedans sera lisible par le middleware auth
  const token = jwt.sign(
    { userId: user.id, role: user.role, familyId: user.familyId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  // On renvoie l'utilisateur SANS le hash
  const publicUser = {
    id: user.id,
    firstName: user.firstName,
    email: user.email,
    role: user.role,
    familyId: user.familyId,
  };
  return { token: token, user: publicUser };
};

// Profil de la personne connectée (à partir de l'id lu dans le badge)
const getProfile = async (userId) => {
  const user = await userModel.findById(userId);

  // Le badge est valide, mais le compte a pu être supprimé depuis
  if (!user) {
    throw httpError(401, 'Session invalide');
  }
  return user;
};

export const authService = { register, login, getProfile };
