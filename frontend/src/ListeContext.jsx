import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API_URL_LISTE = 'http://localhost:3000/api/listes/1/articles'

const ListeContext = createContext(null)

export function ListeProvider({ children }) {
  const [articles, setArticles] = useState([])
  const [erreurApi, setErreurApi] = useState(null)

  const charger = useCallback(async () => {
    try {
      const reponse = await fetch(API_URL_LISTE)
      if (!reponse.ok) throw new Error('Erreur chargement liste')
      const data = await reponse.json()
      setArticles(data.map((item) => ({ ...item, achete: Boolean(item.achete) })))
      setErreurApi(null)
    } catch (error) {
      setErreurApi(error.message)
    }
  }, [])

  useEffect(() => {
    charger()
  }, [charger])

  // Modifier un article (achete, quantity) : on met à jour le state, puis l'API
  const modifierArticle = async (id, changes) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...changes } : a)))
    try {
      const reponse = await fetch(`${API_URL_LISTE}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })
      if (!reponse.ok) throw new Error('Erreur modification')
    } catch (error) {
      setErreurApi(error.message)
      charger() // en cas d'échec, on resynchronise avec le serveur
    }
  }

  const supprimerArticle = async (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id))
    try {
      const reponse = await fetch(`${API_URL_LISTE}/${id}`, { method: 'DELETE' })
      if (!reponse.ok) throw new Error('Erreur suppression')
    } catch (error) {
      setErreurApi(error.message)
      charger()
    }
  }
    // Ajouter un article du catalogue à la liste, puis recharger la liste
  const ajouterArticle = async (item) => {
    try {
      const reponse = await fetch(API_URL_LISTE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id }),
      })
      if (!reponse.ok) throw new Error("Erreur lors de l'ajout")
      await charger()
    } catch (error) {
      setErreurApi(error.message)
    }
  }

  return (
    <ListeContext.Provider
      value={{ articles, erreurApi, modifierArticle, supprimerArticle, ajouterArticle, recharger: charger }}
    >
      {children}
    </ListeContext.Provider>
  )
}

export function useListe() {
  return useContext(ListeContext)
}