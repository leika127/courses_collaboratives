import { useState, useEffect } from 'react'

const API_URL_LISTE = 'http://localhost:3000/api/listes/1/articles'

// Le prénom viendra de la connexion plus tard : pour l'instant, "Camille" par défaut
function Accueil({ prenom = 'Camille' }) {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const chargerListe = async () => {
      try {
        const reponse = await fetch(API_URL_LISTE)
        if (!reponse.ok) throw new Error('Erreur chargement liste')
        const data = await reponse.json()
        setArticles(data.map((item) => ({ ...item, achete: Boolean(item.achete) })))
      } catch (error) {
        console.log('❌ Erreur :', error.message)
      }
    }
    chargerListe()
  }, [])

  const total = articles.length
  const pris = articles.filter((item) => item.achete).length
  const pourcentage = total === 0 ? 0 : Math.round((pris / total) * 100)

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
          {pris} article{pris > 1 ? 's' : ''} sur {total} pris
        </p>
        <div className="barre" aria-hidden="true">
          <div className="barre-remplie" style={{ width: `${pourcentage}%` }} />
        </div>

        <div>
          {articles.slice(0, 3).map((item) => (
            <div key={item.id} className={`ligne-article ${item.achete ? 'pris' : ''}`}>
              <span>{item.achete ? '✓' : '○'}</span>
              <span className="nom-article">{item.nom}</span>
            </div>
          ))}
        </div>

        <a href="#" className="bouton">Voir toute la liste</a>
      </section>

      <a href="#" className="bouton bouton-secondaire">Choisir dans les rayons</a>
    </>
  )
}

export default Accueil