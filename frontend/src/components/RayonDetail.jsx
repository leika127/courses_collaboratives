import { Link, useParams } from 'react-router-dom'
import { useCategories } from '../useCategories'
import { useListe } from '../ListeContext'

function RayonDetail() {
  const { id } = useParams()
  const { categories, erreur } = useCategories()
  const { articles, ajouterArticle } = useListe()

  const rayon = categories.find((c) => String(c.id) === id)
  const dansLaListe = (nom) =>
    articles.some((a) => (a.nom || a.name || '').toLowerCase() === nom.toLowerCase())

  return (
    <>
      <Link to="/rayons" className="lien-retour">← Tous les rayons</Link>

      {erreur && (
        <div className="alerte">
          <span>⚠️ {erreur}</span>
        </div>
      )}

      {rayon && (
        <>
          <header className="entete-liste">
            <h1>{rayon.name}</h1>
            <p className="sous-titre">
              {rayon.items.length} article{rayon.items.length > 1 ? 's' : ''}
            </p>
          </header>

          <section className="liste-articles">
            {rayon.items.map((item, index) => (
              <div key={item.id} className="ligne-article">
                <span className="numero-article">{String(index + 1).padStart(2, '0')}</span>
                <span className="nom-article">{item.name}</span>

                {dansLaListe(item.name) ? (
                  <span className="texte-gris">Dans la liste ✓</span>
                ) : (
                  <button
                    type="button"
                    className="bouton-ajout"
                    onClick={() => ajouterArticle(item)}
                  >
                    + Ajouter
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