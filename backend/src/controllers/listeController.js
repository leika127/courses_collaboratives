import { listeService } from '../services/listeService.js';

// Vrai si la valeur est un entier strictement positif (un id valide)
const isValidId = (value) => {
  return Number.isInteger(value) && value > 0;
};

// Répond à une erreur : message métier si elle est prévue (status),
// sinon on garde le détail technique pour la console et on renvoie un message générique
const sendError = (res, erreur) => {
  if (erreur.status) {
    return res.status(erreur.status).json({ error: erreur.message });
  }
  console.error(erreur);
  return res.status(500).json({ error: 'Erreur serveur' });
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
      return sendError(res, erreur);
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
      return sendError(res, erreur);
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
      return sendError(res, erreur);
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
      return sendError(res, erreur);
    }
  }
};
