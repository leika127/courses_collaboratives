import { Router } from 'express';
import { listeController } from '../controllers/listeController.js';
import { auth } from '../middlewares/auth.js';

export const listesRouter = Router();

// Toutes les routes des listes sont réservées aux personnes connectées
listesRouter.use(auth);

listesRouter.get('/:id/articles', listeController.getArticles);
listesRouter.patch('/:id/articles/:articleId', listeController.updateArticle);
listesRouter.delete('/:id/articles/:articleId', listeController.deleteArticle);
listesRouter.post('/:id/articles', listeController.addArticle);
