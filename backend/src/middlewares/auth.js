import jwt from 'jsonwebtoken';
import { ErreurHttp } from '../errors.js';

// À placer devant toute route réservée aux personnes connectées
export function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    throw new ErreurHttp(401, 'Connexion requise');
  }

  // Le try n'entoure QUE la vérification du badge
  let contenu;
  try {
    contenu = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ErreurHttp(401, 'Session expirée ou invalide');
  }

  // On note qui fait la requête : les routes suivantes pourront le lire
  req.utilisateur = {
    id: contenu.userId,
    role: contenu.role,
    familyId: contenu.familyId,
  };
  return next();
}
