import jwt from 'jsonwebtoken';
import { ErreurHttp } from '../errors.js';

export function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    throw new ErreurHttp(401, 'Connexion requise');
  }
  try {
    const contenu = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = { id: contenu.sub, role: contenu.role };
    next();
  } catch {
    throw new ErreurHttp(401, 'Session expirée ou invalide');
  }
}
