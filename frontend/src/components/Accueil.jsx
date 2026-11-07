import { Link } from 'react-router-dom'
import { useListe } from '../ListeContext'

// Le prénom viendra de la connexion plus tard : pour l'instant, "Camille" par défaut
function Accueil({ prenom = 'Camille' }) {
  const { articles } = useListe()

  const total = articles.length
  const pris = articles.filter((item) => item.achete).length
  const restants = total - pris
  const pourcentage = total === 0 ? 0 : Math.round((pris / total) * 100)
  const prochains = articles.filter((item) => !item.achete).slice(0, 3)

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

      <Link to="/rayons" className="bouton bouton-secondaire" style={{ marginTop: 12 }}>
          Voir tous les rayons
        </Link>
    </>
  )
}

export default Accueil