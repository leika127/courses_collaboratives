import { listeService } from '../services/listeService.js';

export const listeController = {
  async getArticles(req, res) {
    try {
      const listId = Number(req.params.id);
      
      // Vérification du format (paramètre ID valide)
      if (isNaN(listId)) {
        return res.status(422).json({ error: "Format d'ID invalide" });
      }

      const articles = await listeService.recupererArticlesDeLaListe(listId);
      return res.status(200).json(articles);

    } catch (erreur) {
      // Gestion des erreurs métiers renvoyées par le service
      const status = erreur.status || 500;
      return res.status(status).json({ error: erreur.message || 'Erreur serveur' });
    }
  }
};