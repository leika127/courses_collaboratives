import { listeModel } from '../models/listeModel.js';

// Petite fonction utilitaire pour gérer les erreurs métiers proprement
function erreurMetier(status, message) {
  return Object.assign(new Error(message), { status });
}

export const listeService = {
  async recupererArticlesDeLaListe(listId) {
    // Règle métier : est-ce que la liste existe ?
    const liste = await listeModel.trouverParId(listId);
    if (!liste) {
      throw erreurMetier(404, 'Liste de courses introuvable');
    }

    const articles = await listeModel.trouverArticlesParListeId(listId);
    return articles;
  },

  async modifierArticle(listId, articleId, { achete, quantity }) {
    if (achete === undefined && quantity === undefined) {
      throw erreurMetier(422, 'Aucun champ à modifier');
    }
    if (achete !== undefined && typeof achete !== 'boolean') {
      throw erreurMetier(422, '"achete" doit être un booléen');
    }
    if (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 1)) {
      throw erreurMetier(422, '"quantity" doit être un entier supérieur ou égal à 1');
    }

    const liste = await listeModel.trouverParId(listId);
    if (!liste) throw erreurMetier(404, 'Liste de courses introuvable');

    const article = await listeModel.modifierArticle(listId, articleId, { achete, quantity });
    if (!article) throw erreurMetier(404, 'Article introuvable');
    return article;
  },

  async supprimerArticle(listId, articleId) {
    const liste = await listeModel.trouverParId(listId);
    if (!liste) throw erreurMetier(404, 'Liste de courses introuvable');

    const supprime = await listeModel.supprimerArticle(listId, articleId);
    if (!supprime) throw erreurMetier(404, 'Article introuvable');
  }
};