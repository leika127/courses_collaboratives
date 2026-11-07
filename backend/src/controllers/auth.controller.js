import { authService } from '../services/auth.service.js';
import { httpError } from '../utils/httpError.js';

const PASSWORD_MIN_LENGTH = 8;
// 7 jours en millisecondes : doit correspondre à JWT_EXPIRES_IN=7d du .env
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// Vrai si la valeur est du texte qui contient autre chose que des espaces
const isFilled = (value) => {
  return typeof value === 'string' && value.trim() !== '';
};

// POST /api/auth/register
const register = async (req, res) => {
  const { familyName, firstName, email, password } = req.body ?? {};

  if (
    !isFilled(familyName) ||
    !isFilled(firstName) ||
    !isFilled(email) ||
    !isFilled(password)
  ) {
    throw httpError(400, 'Tous les champs sont obligatoires');
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    throw httpError(
      400,
      `Le mot de passe doit faire au moins ${PASSWORD_MIN_LENGTH} caractères`,
    );
  }

  const result = await authService.register({
    familyName: familyName.trim(),
    firstName: firstName.trim(),
    email: email,
    password: password,
  });
  return res.status(201).json(result);
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!isFilled(email) || !isFilled(password)) {
    throw httpError(400, 'Email et mot de passe obligatoires');
  }

  const { token, user } = await authService.login({
    email: email,
    password: password,
  });

  // Le token voyage dans un cookie que le JavaScript du navigateur ne peut pas lire
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE_MS,
  });
  return res.status(200).json({ user: user });
};

// GET /api/auth/me (protégée par le middleware auth)
const me = async (req, res) => {
  const user = await authService.getProfile(req.utilisateur.id);
  return res.status(200).json({ user: user });
};

export const authController = { register, login, me };
