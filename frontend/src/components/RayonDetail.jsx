import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCategories } from '../useCategories'
import { useListe } from '../ListeContext'
import { iconeRayon, iconeArticle } from '../iconesRayons'

function RayonDetail() {
  const { id } = useParams()
  const { categories, erreur } = useCategories()
  const { articles, ajouterArticle } = useListe()
  const [filtre, setFiltre] = useState('')

  const rayon = categories.find((c) => String(c.id) === id)
  const dansLaListe = (nom) =>
    articles.some((a) => (a.nom || a.name || '').toLowerCase() === nom.toLowerCase())

  const itemsAffiches = rayon
    ? rayon.items.filter((item) => item.name.toLowerCase().includes(filtre.toLowerCase()))
    : []

  return (
    <>
      <header className="entete-collant entete-rayon">
        <Link to="/rayons" className="btn-retour" aria-label="Retour aux rayons">←</Link>
        {rayon && (
          <div>
            <h1>{iconeRayon(rayon.name)} {rayon.name}</h1>
            <span className="texte-gris">
              {rayon.items.length} article{rayon.items.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </header>

      {erreur && (
        <div className="alerte">
          <span>⚠️ {erreur}</span>
        </div>
      )}

      {rayon && (
        <>
          <input
            type="text"
            placeholder={`Chercher dans ${rayon.name}…`}
            aria-label="Chercher dans ce rayon"
            autoComplete="off"
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
          />

          {itemsAffiches.length === 0 && (
            <p className="texte-gris">Aucun article ne correspond.</p>
          )}

          <section className="liste-articles">
            {itemsAffiches.map((item) => (
              <div key={item.id} className="ligne-article">
                <span className="item-icone" aria-hidden="true">{iconeArticle(item.name, rayon.name)}</span>
                <span className="nom-article">{item.name}</span>

                {dansLaListe(item.name) ? (
                  <span className="deja-dans-liste">✓ Dans la liste</span>
                ) : (
                  <button
                    type="button"
                    className="bouton-rond"
                    onClick={() => ajouterArticle(item)}
                    aria-label={`Ajouter ${item.name} à la liste`}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </section>
        </>
      )}
    </>
  )
}

export default RayonDetail
