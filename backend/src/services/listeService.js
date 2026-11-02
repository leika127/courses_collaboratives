import { listeModel } from '../models/listeModel.js';

// Petite fonction utilitaire pour gérer les erreurs métiers proprement (comme dans ton exemple)
function erreurMetier(status, message) {
  return Object.assign(new Error(message), { status });
}

export const listeService = {
  async recupererArticlesDeLaListe(listId) {
    // Règle métier : Est-ce que la liste existe ?
    const liste = await listeModel.trouverParId(listId);
    if (!liste) {
      throw erreurMetier(404, 'Liste de courses introuvable');
    }

    const articles = await listeModel.trouverArticlesParListeId(listId);
    return articles;
  }
};