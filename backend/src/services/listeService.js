import { listeModel } from '../models/listeModel.js';

// Petite fonction utilitaire pour gérer les erreurs métiers proprement
function erreurMetier(status, message) {
  return Object.assign(new Error(message), { status });
}

// Règle métier : la liste doit exister ET appartenir à la famille de la personne connectée
const trouverListeDeLaFamille = async (listId, familyId) => {
  const liste = await listeModel.trouverParId(listId);
  if (!liste) {
    throw erreurMetier(404, 'Liste de courses introuvable');
  }
  if (liste.familyId !== familyId) {
    throw erreurMetier(403, "Cette liste n'appartient pas à votre famille");
  }
  return liste;
};

export const listeService = {
  async recupererListesDeLaFamille(familyId) {
    return await listeModel.trouverParFamille(familyId);
  },

  async recupererArticlesDeLaListe(listId, familyId) {
    // Règle métier : la liste existe et appartient à la famille
    await trouverListeDeLaFamille(listId, familyId);

    const articles = await listeModel.trouverArticlesParListeId(listId);
    return articles;
  },

  async modifierArticle(listId, familyId, articleId, { achete, quantity }) {
    if (achete === undefined && quantity === undefined) {
      throw erreurMetier(422, 'Aucun champ à modifier');
    }
    if (achete !== undefined && typeof achete !== 'boolean') {
      throw erreurMetier(422, '"achete" doit être un booléen');
    }
    if (
      quantity !== undefined &&
      (!Number.isInteger(quantity) || quantity < 1)
    ) {
      throw erreurMetier(
        422,
        '"quantity" doit être un entier supérieur ou égal à 1',
      );
    }

    await trouverListeDeLaFamille(listId, familyId);

    const article = await listeModel.modifierArticle(listId, articleId, {
      achete,
      quantity,
    });
    if (!article) throw erreurMetier(404, 'Article introuvable');
    return article;
  },

  async supprimerArticle(listId, familyId, articleId) {
    await trouverListeDeLaFamille(listId, familyId);

    const supprime = await listeModel.supprimerArticle(listId, articleId);
    if (!supprime) throw erreurMetier(404, 'Article introuvable');
  },

  async ajouterArticle(listId, familyId, { itemId, quantity = 1 }) {
    if (!Number.isInteger(itemId)) {
      throw erreurMetier(422, '"itemId" doit être un entier');
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw erreurMetier(
        422,
        '"quantity" doit être un entier supérieur ou égal à 1',
      );
    }

    await trouverListeDeLaFamille(listId, familyId);

    const item = await listeModel.trouverItemParId(itemId);
    if (!item) throw erreurMetier(404, 'Article du catalogue introuvable');

    return await listeModel.ajouterArticle(listId, itemId, quantity);
  },
};
