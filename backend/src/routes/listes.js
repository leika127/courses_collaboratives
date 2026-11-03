import { Router } from 'express';
import { listeController } from '../controllers/listeController.js';
// import { authenticate } from '../middlewares/auth.js'; // si tu as un middleware d'authentification

export const listesRouter = Router();

// Une URL -> un controller (avec middleware optionnel)
listesRouter.get('/:id/articles', listeController.getArticles);
listesRouter.patch('/:id/articles/:articleId', listeController.updateArticle);
listesRouter.delete('/:id/articles/:articleId', listeController.deleteArticle);