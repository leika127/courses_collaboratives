import { useState, useEffect } from 'react'

const API_URL_CATEGORIES = 'http://localhost:3000/api/categories'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const charger = async () => {
      try {
        const reponse = await fetch(API_URL_CATEGORIES)
        if (!reponse.ok) throw new Error('Erreur chargement des rayons')
        setCategories(await reponse.json())
      } catch (error) {
        setErreur(error.message)
      }
    }
    charger()
  }, [])

  return { categories, erreur }
}