import { useState, useEffect } from 'react'
import { useListe } from '../ListeContext'
import { requete } from '../api/client'

function ListeCourses() {
  const { articles: course, erreurApi, modifierArticle, supprimerArticle, ajouterArticle } = useListe()
  const [recherche, setRecherche] = useState('')
  const [catalogue, setCatalogue] = useState([])

  // Charger le catalogue d'articles pour la recherche
  useEffect(() => {
    requete('/api/items')
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
      <section className="carte champ" style={{ position: 'relative' }}>
        <label htmlFor="recherche">Ajouter un article</label>
        <input
          id="recherche"
          type="text"
          placeholder="Rechercher dans les rayons..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        {catalogueFiltre.length > 0 && (
          <ul className="suggestions-liste" style={{ 
            listStyle: 'none', 
            padding: '0', 
            marginTop: '8px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '180px',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {catalogueFiltre.map((item) => (
              <li 
                key={item.id} 
                onClick={() => {
                  if (ajouterArticle) {
                    ajouterArticle(item)
                  }
                  setRecherche('')
                }}
                style={{ 
                  padding: '10px 12px', 
                  cursor: 'pointer', 
                  borderBottom: '1px solid #eee', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{item.nom || item.name}</span>
                <span style={{ color: 'green', fontWeight: 'bold' }}>+ Ajouter</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Liste complète des courses */}
      <section className="carte">
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