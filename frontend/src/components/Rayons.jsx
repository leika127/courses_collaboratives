import { Link } from 'react-router-dom'
import { useCategories } from '../useCategories'

function Rayons() {
  const { categories, erreur } = useCategories()

  return (
    <>
      <header className="entete-liste">
        <h1>Rayons</h1>
        <p className="sous-titre">
          {categories.length} rayons, choisis ce que tu veux ajouter
        </p>
      </header>

      {erreur && (
        <div className="alerte">
          <span>⚠️ {erreur}</span>
        </div>
      )}

      <div className="grille-rayons">
        {categories.map((categorie, index) => (
          <Link
            key={categorie.id}
            to={`/rayons/${categorie.id}`}
            className={`tuile tuile-${(index % 4) + 1}`}
          >
            <span className="tuile-numero">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{categorie.items.length}</strong>
              <span className="tuile-nom">{categorie.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Rayons