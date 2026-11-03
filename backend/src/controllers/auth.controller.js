import { authService } from '../services/auth.service.js';
import { httpError } from '../utils/httpError.js';

const PASSWORD_MIN_LENGTH = 8;

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

export const authController = { register };
