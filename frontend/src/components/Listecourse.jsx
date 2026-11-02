import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3000/api/listes/1/articles'

function ListeCourses() {
  const [course, setCourse] = useState([])
  const [selectStatus, setSelectStatus] = useState('all')
  const [erreurApi, setErreurApi] = useState(null)

  useEffect(() => {
    const recupCourses = async () => {
      try {
        const reponse = await fetch(API_URL)
        
        if (!reponse.ok) {
          throw new Error(`Erreur HTTP: ${reponse.status}`)
        }

        const result = await reponse.json()
        // Sécurisation de l'état achete pour éviter le warning React
        const articlesFormates = result.map(item => ({
          ...item,
          achete: Boolean(item.achete)
        }))
        setCourse(articlesFormates)
      } catch (error) {
        console.log('❌ Aie, Aie erreur', error.message)
        setErreurApi(error.message)
      }
    }
    recupCourses()
  }, [])

  const toggleArticle = (id) => {
    setCourse((prevCourses) =>
      prevCourses.map((item) =>
        item.id === id ? { ...item, achete: !item.achete } : item
      )
    )
  }

  const modifierQuantite = (id, delta) => {
    setCourse((prevCourses) =>
      prevCourses.map((item) => {
        if (item.id === id) {
          const nouvelleQuantite = Math.max(1, (item.quantity || 1) + delta)
          return { ...item, quantity: nouvelleQuantite }
        }
        return item
      })
    )
  }

  const courseFiltrees = Array.isArray(course) ? course.filter((item) => {
    if (selectStatus === 'achete') return item.achete
    if (selectStatus === 'a_acheter') return !item.achete
    return true
  }) : []

  return (
    <div className="app">
      <main className="page">
        <h1>Ma liste de courses</h1>

        {erreurApi && (
          <div className="alerte">
            <span>⚠️ Erreur de chargement de l'API : {erreurApi}</span>
          </div>
        )}

        <div className="carte champ">
          <label htmlFor="filtre">Afficher</label>
          <select
            id="filtre"
            value={selectStatus}
            onChange={(event) => setSelectStatus(event.target.value)}
          >
            <option value="all">Tous les articles</option>
            <option value="a_acheter">À acheter</option>
            <option value="achete">Déjà pris</option>
          </select>
        </div>

        <div className="carte">
          {courseFiltrees.length === 0 ? (
            <p className="texte-gris">Aucun article à afficher.</p>
          ) : (
            courseFiltrees.map((item) => (
              <div
                key={item.id}
                className={`ligne-article ${item.achete ? 'pris' : ''}`}
              >
                <input 
                  type="checkbox" 
                  checked={item.achete} 
                  onChange={() => toggleArticle(item.id)} 
                />
                <label>{item.nom}</label>
                
                {/* Sélecteur de quantité fluide et arrondi */}
                <div className="quantite-selecteur">
                  <button 
                    type="button"
                    onClick={() => modifierQuantite(item.id, -1)}
                    className="btn-quantite"
                    aria-label="Diminuer la quantité"
                  >
                    −
                  </button>
                  <span className="badge">x{item.quantity || 1}</span>
                  <button 
                    type="button"
                    onClick={() => modifierQuantite(item.id, 1)}
                    className="btn-quantite"
                    aria-label="Augmenter la quantité"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default ListeCourses