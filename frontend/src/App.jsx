import { useEffect, useState } from 'react';
import './App.css';

const URL_API = 'http://localhost:3000/api/articles';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const chargerArticles = async () => {
      try {
        const reponse = await fetch(URL_API);

        if (!reponse.ok) {
          throw new Error(`Erreur HTTP ${reponse.status}`);
        }

        const donnees = await reponse.json();
        setArticles(donnees);
      } catch (erreurAttrapee) {
        console.error(erreurAttrapee);
        setErreur('Impossible de charger les articles.');
      } finally {
        setChargement(false);
      }
    };

    chargerArticles();
  }, []);

  if (chargement) {
    return <p>Chargement des articles…</p>;
  }

  if (erreur !== '') {
    return <p role="alert">{erreur}</p>;
  }

  return (
    <main>
      <h1>Courses collaboratives</h1>

      {articles.length === 0 ? (
        <p>Aucun article pour l'instant.</p>
      ) : (
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.id}>
                {article.libelle} ({article.categorie})
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default App;
