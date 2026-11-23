import { Link } from 'react-router-dom'
import { useListe } from '../ListeContext'
import { useAuth } from '../AuthContext'
import { useCategories } from '../useCategories'
import { iconeRayon } from '../iconesRayons'

function Accueil() {
  const { articles } = useListe()
  const { utilisateur } = useAuth()
  const { categories } = useCategories()
  const prenom = utilisateur?.firstName ?? ''

  const total = articles.length
  const pris = articles.filter((item) => item.achete).length
  const restants = total - pris
  const pourcentage = total === 0 ? 0 : Math.round((pris / total) * 100)
  const prochains = articles.filter((item) => !item.achete).slice(0, 3)

  return (
    <>
      <header className="barre-haut">
        <span className="avatar" aria-hidden="true">{prenom.charAt(0).toUpperCase()}</span>
        <div>
          <span className="texte-gris">Bonjour</span>
          <h1>{prenom}</h1>
        </div>
      </header>

      <section className="hero" aria-labelledby="titre-liste">
        <h2 id="titre-liste" className="hero-etiquette">Ma liste de courses</h2>

        {total === 0 ? (
          <>
            <p className="hero-chiffre">
              <strong>0</strong>
              <span>Ta liste est vide pour l’instant</span>
            </p>
            <Link to="/rayons" className="bouton bouton-hero">Ajouter des articles</Link>
          </>
        ) : (
          <>
            <p className="hero-chiffre">
              <strong>{restants}</strong>
              <span>{restants === 0 ? 'Tout est pris, bravo !' : `article${restants > 1 ? 's' : ''} à acheter`}</span>
            </p>

            <div className="barre" aria-hidden="true">
              <div className="barre-remplie" style={{ width: `${pourcentage}%` }} />
            </div>
            <p className="hero-detail">{pris} pris sur {total}</p>

            {prochains.length > 0 && (
              <ul className="hero-puces">
                {prochains.map((item) => (
                  <li key={item.id}>{item.nom || item.name}</li>
                ))}
              </ul>
            )}

            <Link to="/liste" className="bouton bouton-hero">Voir toute la liste</Link>
          </>
        )}
      </section>

      <div className="titre-ligne">
        <h2>Rayons</h2>
        <Link to="/rayons" className="lien-discret">Tout voir</Link>
      </div>

      <div className="rayons-defilants">
        {categories.map((categorie, index) => (
          <Link
            key={categorie.id}
            to={`/rayons/${categorie.id}`}
            className={`tuile tuile-${(index % 4) + 1}`}
          >
            <span className="tuile-icone" aria-hidden="true">{iconeRayon(categorie.name)}</span>
            <span className="tuile-nom">{categorie.name}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Accueil
