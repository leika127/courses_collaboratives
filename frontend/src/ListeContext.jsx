import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { requete } from './api/client';
import { useAuth } from './AuthContext';

const ListeContext = createContext(null);

export function ListeProvider({ children }) {
  const { utilisateur } = useAuth();
  const [listeId, setListeId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [erreurApi, setErreurApi] = useState(null);

  // Charge la liste de la famille connectée : d'abord son id, puis ses articles
  const charger = useCallback(async () => {
    try {
      const listes = await requete('/api/listes');
      if (listes.length === 0) {
        setListeId(null);
        setArticles([]);
        return;
      }
      const id = listes[0].id;
      const data = await requete(`/api/listes/${id}/articles`);
      setListeId(id);
      setArticles(data.map((item) => {
        return { ...item, achete: Boolean(item.achete) };
      }));
      setErreurApi(null);
    } catch (error) {
      setErreurApi(error.message);
    }
    return;
  }, []);

  // On charge seulement quand quelqu'un est connecté (sinon l'API répondrait 401)
  useEffect(() => {
    if (utilisateur) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      charger();
    }
    return;
  }, [utilisateur, charger]);

  // Après une déconnexion, on n'affiche plus la liste de la personne précédente
  const articlesAffiches = utilisateur ? articles : [];

  // Modifier un article (achete, quantity) : on met à jour l'écran, puis l'API
  const modifierArticle = async (id, changes) => {
    setArticles((prev) => {
      return prev.map((a) => {
        return a.id === id ? { ...a, ...changes } : a;
      });
    });
    try {
      await requete(`/api/listes/${listeId}/articles/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
      });
    } catch (error) {
      setErreurApi(error.message);
      charger(); // en cas d'échec, on resynchronise avec le serveur
    }
    return;
  };

  const supprimerArticle = async (id) => {
    setArticles((prev) => {
      return prev.filter((a) => {
        return a.id !== id;
      });
    });
    try {
      await requete(`/api/listes/${listeId}/articles/${id}`, { method: 'DELETE' });
    } catch (error) {
      setErreurApi(error.message);
      charger();
    }
    return;
  };

  // Ajouter un article du catalogue à la liste, puis recharger la liste
  const ajouterArticle = async (item) => {
    try {
      await requete(`/api/listes/${listeId}/articles`, {
        method: 'POST',
        body: JSON.stringify({ itemId: item.id }),
      });
      await charger();
    } catch (error) {
      setErreurApi(error.message);
    }
    return;
  };

  return (
    <ListeContext.Provider
      value={{
        articles: articlesAffiches,
        erreurApi,
        modifierArticle,
        supprimerArticle,
        ajouterArticle,
        recharger: charger,
      }}
    >
      {children}
    </ListeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useListe() {
  return useContext(ListeContext);
}
