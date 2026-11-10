import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { requete } from './api/client'
import { useAuth } from './AuthContext'

const ListeContext = createContext(null)

export function ListeProvider({ children }) {
  const { utilisateur } = useAuth()
  const [listeId, setListeId] = useState(null)
  const [articles, setArticles] = useState([])
  const [erreurApi, setErreurApi] = useState(null)

  const charger = useCallback(async () => {
    try {
      // La liste de la famille connectée (plus la liste n°1 écrite en dur)
      const listes = await requete('/api/listes')
      if (listes.length === 0) return
      const id = listes[0].id
      const data = await requete(`/api/listes/${id}/articles`)
      setListeId(id)
      setArticles(data.map((item) => ({ ...item, achete: Boolean(item.achete) })))
      setErreurApi(null)
    } catch (error) {
      setErreurApi(error.message)
    }
  }, [])

  // On ne charge que si quelqu'un est connecté (sinon l'API répond 401)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (utilisateur) charger()
  }, [utilisateur, charger])

  // Modifier un article (achete, quantity) : on met à jour le state, puis l'API
  const modifierArticle = async (id, changes) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...changes } : a)))
    try {
      await requete(`/api/listes/${listeId}/articles/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
      })
    } catch (error) {
      setErreurApi(error.message)
      charger() // en cas d'échec, on resynchronise avec le serveur
    }
  }

  const supprimerArticle = async (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id))
    try {
      await requete(`/api/listes/${listeId}/articles/${id}`, { method: 'DELETE' })
    } catch (error) {
      setErreurApi(error.message)
      charger()
    }
  }
    // Ajouter un article du catalogue à la liste, puis recharger la liste
  const ajouterArticle = async (item) => {
    try {
      await requete(`/api/listes/${listeId}/articles`, {
        method: 'POST',
        body: JSON.stringify({ itemId: item.id }),
      })
      await charger()
    } catch (error) {
      setErreurApi(error.message)
    }
  }

  return (
    <ListeContext.Provider
      value={{ articles: utilisateur ? articles : [], erreurApi, modifierArticle, supprimerArticle, ajouterArticle, recharger: charger }}
    >
      {children}
    </ListeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useListe() {
  return useContext(ListeContext)
}