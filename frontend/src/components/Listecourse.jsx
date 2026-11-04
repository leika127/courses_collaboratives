import { useState, useEffect } from 'react'
import { useListe } from '../ListeContext'

function ListeCourses() {
  const { articles: course, erreurApi, modifierArticle, supprimerArticle, ajouterArticle } = useListe()
  const [recherche, setRecherche] = useState('')
  const [catalogue, setCatalogue] = useState([])

  // Charger le catalogue d'articles pour la recherche
  useEffect(() => {
    fetch('http://localhost:3000/api/items')
      .then((res) => res.json())
      .then((data) => setCatalogue(data))
      .catch((err) => console.log('Erreur chargement catalogue', err))
  }, [])

  // Filtrer le catalogue selon ce que l'on tape (et exclure ce qui est déjà dans la liste)
  const catalogueFiltre = recherche.trim() === '' ? [] : catalogue.filter((item) => {
    const nomArticle = item.nom || item.name || ''
    const dejaDansLaListe = course.some((c) => {
      const nomCourse = c.nom || c.name || ''
      return nomCourse.toLowerCase() === nomArticle.toLowerCase()
    })
    return nomArticle.toLowerCase().includes(recherche.toLowerCase()) && !dejaDansLaListe
  })

  return (
    <>
      <h1>Ma liste de courses</h1>

      {erreurApi && (
        <div className="alerte">
          <span>⚠️ Erreur API : {erreurApi}</span>
        </div>
      )}

      {/* Barre de recherche et suggestions du catalogue */}
      <section className="carte champ champ-recherche">
        <label htmlFor="recherche">Ajouter un article</label>
        <input
          id="recherche"
          type="text"
          placeholder="Rechercher dans les rayons..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        {catalogueFiltre.length > 0 && (
          <ul className="suggestions-liste">
            {catalogueFiltre.map((item) => (
              <li
                key={item.id}
                className="suggestion-item"
                onClick={() => {
                  if (ajouterArticle) {
                    ajouterArticle(item)
                  }
                  setRecherche('')
                }}
              >
                <span>{item.nom || item.name}</span>
                <span className="suggestion-ajout">+ Ajouter</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Liste complète des courses : un cadre par article */}
      <section className="liste-articles">
        {course.length === 0 ? (
          <p className="texte-gris">Aucun article dans la liste.</p>
        ) : (
          course.map((item) => (
            <div key={item.id} className={`ligne-article ${item.achete ? 'pris' : ''}`}>
              <input
                id={`article-${item.id}`}
                type="checkbox"
                checked={item.achete}
                onChange={() => modifierArticle(item.id, { achete: !item.achete })}
              />
              <label htmlFor={`article-${item.id}`}>{item.nom || item.name}</label>

              <div className="quantite-selecteur">
                <button
                  type="button"
                  onClick={() => modifierArticle(item.id, { quantity: Math.max(1, (item.quantity || 1) - 1) })}
                  className="btn-quantite"
                >
                  −
                </button>
                <span className="badge">x{item.quantity || 1}</span>
                <button
                  type="button"
                  onClick={() => modifierArticle(item.id, { quantity: (item.quantity || 1) + 1 })}
                  className="btn-quantite"
                >
                  +
                </button>
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