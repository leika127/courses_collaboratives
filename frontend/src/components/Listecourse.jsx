import { useState, useEffect } from 'react'

const API_URL_LISTE = 'http://localhost:3000/api/listes/1/articles'

function ListeCourses() {
  const [course, setCourse] = useState([])
  const [selectStatus, setSelectStatus] = useState('all')
  const [erreurApi, setErreurApi] = useState(null)

  // Charger la liste depuis l'API
  useEffect(() => {
    const chargerListe = async () => {
      try {
        const reponse = await fetch(API_URL_LISTE)
        if (!reponse.ok) throw new Error('Erreur chargement liste')
        const data = await reponse.json()
        setCourse(data.map((item) => ({ ...item, achete: Boolean(item.achete) })))
      } catch (error) {
        console.log('❌ Erreur :', error.message)
        setErreurApi(error.message)
      }
    }
    chargerListe()
  }, [])

  const toggleArticle = (id) => {
    setCourse((prev) =>
      prev.map((item) => (item.id === id ? { ...item, achete: !item.achete } : item))
    )
  }

  const modifierQuantite = (id, delta) => {
    setCourse((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    )
  }

  // US 07 : suppression d'un article
  const supprimerArticle = (id) => {
    setCourse((prev) => prev.filter((item) => item.id !== id))
  }

  const courseFiltrees = course.filter((item) => {
    if (selectStatus === 'achete') return item.achete
    if (selectStatus === 'a_acheter') return !item.achete
    return true
  })

  return (
    <>
      <h1>Ma liste de courses</h1>

      {erreurApi && (
        <div className="alerte">
          <span>⚠️ Erreur API : {erreurApi}</span>
        </div>
      )}

      <section className="carte champ">
        <label htmlFor="filtre">Afficher</label>
        <select
          id="filtre"
          value={selectStatus}
          onChange={(e) => setSelectStatus(e.target.value)}
        >
          <option value="all">Tous les articles</option>
          <option value="a_acheter">À acheter</option>
          <option value="achete">Déjà pris</option>
        </select>
      </section>

      <section className="carte">
        {courseFiltrees.length === 0 ? (
          <p className="texte-gris">Aucun article dans la liste.</p>
        ) : (
          courseFiltrees.map((item) => (
            <div key={item.id} className={`ligne-article ${item.achete ? 'pris' : ''}`}>
              <input
                id={`article-${item.id}`}
                type="checkbox"
                checked={item.achete}
                onChange={() => toggleArticle(item.id)}
              />
              <label htmlFor={`article-${item.id}`}>{item.nom}</label>

              <div className="quantite-selecteur">
                <button type="button" onClick={() => modifierQuantite(item.id, -1)} className="btn-quantite">−</button>
                <span className="badge">x{item.quantity || 1}</span>
                <button type="button" onClick={() => modifierQuantite(item.id, 1)} className="btn-quantite">+</button>
              </div>

              <button
                type="button"
                onClick={() => supprimerArticle(item.id)}
                className="btn-supprimer"
                title="Supprimer l'article"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </section>
    </>
  )
}

export default ListeCourses