import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useListe } from '../ListeContext'
import { requete } from '../api/client'
import { iconeArticle } from '../iconesRayons'

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

  // On sépare ce qu'il reste à prendre et ce qui est déjà dans le caddie
  const aAcheter = course.filter((item) => !item.achete)
  const dejaPris = course.filter((item) => item.achete)
  const pourcentage = course.length === 0 ? 0 : Math.round((dejaPris.length / course.length) * 100)

  // Une ligne d'article (la même pour les deux groupes)
  const ligne = (item) => (
    <div key={item.id} className={`ligne-article ${item.achete ? 'pris' : ''}`}>
      <input
        id={`article-${item.id}`}
        type="checkbox"
        checked={item.achete}
        onChange={() => modifierArticle(item.id, { achete: !item.achete })}
      />
      <span className="item-icone" aria-hidden="true">{iconeArticle(item.nom || item.name)}</span>
      <label htmlFor={`article-${item.id}`}>{item.nom || item.name}</label>

      {/* Quantité : bloquée quand l'article est déjà dans le caddie */}
      <div className="quantite-selecteur">
        <button
          type="button"
          onClick={() => modifierArticle(item.id, { quantity: Math.max(1, (item.quantity || 1) - 1) })}
          className="btn-quantite"
          aria-label="Diminuer la quantité"
          disabled={item.achete}
        >
          −
        </button>
        <span className="badge">x{item.quantity || 1}</span>
        <button
          type="button"
          onClick={() => modifierArticle(item.id, { quantity: (item.quantity || 1) + 1 })}
          className="btn-quantite"
          aria-label="Augmenter la quantité"
          disabled={item.achete}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => supprimerArticle(item.id)}
        className="btn-supprimer"
        aria-label={`Supprimer ${item.nom || item.name}`}
      >
        ✕
      </button>
    </div>
  )

  return (
    <>
      {/* En-tête collé en haut : on voit toujours où on en est */}
      <header className="entete-collant">
        <div className="titre-ligne">
          <h1>Ma liste</h1>
          <span className="compteur">{dejaPris.length}/{course.length} pris</span>
        </div>
        <div className="barre" aria-hidden="true">
          <div className="barre-remplie" style={{ width: `${pourcentage}%` }} />
        </div>
      </header>

      {erreurApi && (
        <div className="alerte">
          <span>⚠️ Erreur API : {erreurApi}</span>
        </div>
      )}

      {/* Recherche : on tape, on touche, c'est ajouté */}
      <div className="champ-recherche">
        <input
          id="recherche"
          type="text"
          placeholder="Ajouter un article…"
          aria-label="Ajouter un article"
          autoComplete="off"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        {catalogueFiltre.length > 0 && (
          <ul className="suggestions-liste">
            {catalogueFiltre.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
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
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Liste vide : on explique quoi faire ensuite */}
      {course.length === 0 && (
        <section className="etat-vide">
          <span className="etat-vide-icone" aria-hidden="true">🛒</span>
          <h2>Ta liste est vide</h2>
          <p className="texte-gris">Cherche un article ci-dessus ou parcours les rayons.</p>
          <Link to="/rayons" className="bouton">Parcourir les rayons</Link>
        </section>
      )}

      {aAcheter.length > 0 && (
        <section aria-labelledby="titre-a-acheter">
          <h2 id="titre-a-acheter" className="titre-groupe">
            À acheter <span className="compteur">{aAcheter.length}</span>
          </h2>
          <div className="liste-articles">{aAcheter.map(ligne)}</div>
        </section>
      )}

      {dejaPris.length > 0 && (
        <section aria-labelledby="titre-deja-pris">
          <h2 id="titre-deja-pris" className="titre-groupe">
            Déjà pris <span className="compteur">{dejaPris.length}</span>
          </h2>
          <div className="liste-articles">{dejaPris.map(ligne)}</div>
        </section>
      )}
    </>
  )
}

export default ListeCourses