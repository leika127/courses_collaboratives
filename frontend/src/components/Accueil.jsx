import { Link } from 'react-router-dom'
import { useListe } from '../ListeContext'

// Les rayons affichés en tuiles (à adapter à tes vrais rayons)
const rayons = [
  { id: 'fruits-legumes', nom: 'Fruits et légumes' },
  { id: 'frais', nom: 'Produits frais' },
  { id: 'epicerie', nom: 'Épicerie' },
  { id: 'boissons', nom: 'Boissons' },
]

// Le prénom viendra de la connexion plus tard : pour l'instant, "Camille" par défaut
function Accueil({ prenom = 'Camille' }) {
  const { articles } = useListe()

  const total = articles.length
  const pris = articles.filter((item) => item.achete).length
  const restants = total - pris
  const pourcentage = total === 0 ? 0 : Math.round((pris / total) * 100)
  const prochains = articles.filter((item) => !item.achete).slice(0, 3)

  // Nombre d'articles restants dans un rayon (suppose que chaque article a un champ "rayon")
  const compterRayon = (idRayon) =>
    articles.filter((item) => item.rayon === idRayon && !item.achete).length

  return (
    <>
      <header className="entete">
        <span className="texte-gris">Bonjour</span>
        <h1>{prenom}</h1>
      </header>

      <section className="carte" aria-labelledby="titre-liste">
        <div className="titre-ligne">
          <h2 id="titre-liste">Ma liste de courses</h2>
          <span className="texte-gris">En cours</span>
        </div>

        <p className="progression-texte">
          {restants} article{restants > 1 ? 's' : ''} à acheter
        </p>
        <div className="barre" aria-hidden="true">
          <div className="barre-remplie" style={{ width: `${pourcentage}%` }} />
        </div>

        <div>
          {prochains.map((item) => (
            <div key={item.id} className="ligne-article">
              <span>○</span>
              <span className="nom-article">{item.nom}</span>
            </div>
          ))}
        </div>

        <Link to="/liste" className="bouton">Voir toute la liste</Link>
      </section>

      <section aria-labelledby="titre-rayons">
        <h2 id="titre-rayons">Choisir dans les rayons</h2>
        <div className="grille-rayons" style={{ marginTop: 12 }}>
          {rayons.map((rayon, index) => (
            <Link
              key={rayon.id}
              to={`/rayons/${rayon.id}`}
              className={`tuile tuile-${(index % 4) + 1}`}
            >
              <span className="tuile-numero">0{index + 1}</span>
              <div>
                <strong>{compterRayon(rayon.id)}</strong>
                <span className="tuile-nom">{rayon.nom}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Accueil