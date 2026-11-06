import { listeService } from '../services/listeService.js';

// Vrai si la valeur est un entier strictement positif (un id valide)
const isValidId = (value) => {
  return Number.isInteger(value) && value > 0;
};

export const listeController = {
  async getArticles(req, res) {
    try {
      const listId = Number(req.params.id);
      // Vérification du format (paramètre ID valide)
      if (!isValidId(listId)) {
        return res.status(422).json({ error: "Format d'ID invalide" });
      }

      const articles = await listeService.recupererArticlesDeLaListe(listId);
      return res.status(200).json(articles);
    } catch (erreur) {
      // Gestion des erreurs métiers renvoyées par le service
      const status = erreur.status || 500;
      return res
        .status(status)
        .json({ error: erreur.message || 'Erreur serveur' });
    }
  },

  async updateArticle(req, res) {
    try {
      const listId = Number(req.params.id);
      const articleId = Number(req.params.articleId);
      if (!isValidId(listId) || !isValidId(articleId)) {
        return res.status(422).json({ error: "Format d'ID invalide" });
      }

      const { achete, quantity } = req.body ?? {};
      const article = await listeService.modifierArticle(listId, articleId, {
        achete,
        quantity,
      });
      return res.status(200).json(article);
    } catch (erreur) {
      const status = erreur.status || 500;
      return res
        .status(status)
        .json({ error: erreur.message || 'Erreur serveur' });
    }
  },

  async deleteArticle(req, res) {
    try {
      const listId = Number(req.params.id);
      const articleId = Number(req.params.articleId);
      if (!isValidId(listId) || !isValidId(articleId)) {
        return res.status(422).json({ error: "Format d'ID invalide" });
      }

      await listeService.supprimerArticle(listId, articleId);
      return res.status(204).send();
    } catch (erreur) {
      const status = erreur.status || 500;
      return res
        .status(status)
        .json({ error: erreur.message || 'Erreur serveur' });
    }
  },

  async addArticle(req, res) {
    try {
      const listId = Number(req.params.id);
      if (!isValidId(listId)) {
        return res.status(422).json({ error: "Format d'ID invalide" });
      }

      const { itemId, quantity } = req.body ?? {};
      const article = await listeService.ajouterArticle(listId, { itemId, quantity });
      return res.status(201).json(article);
    } catch (erreur) {
      const status = erreur.status || 500;
      return res.status(status).json({ error: erreur.message || 'Erreur serveur' });
    }
  }
};
