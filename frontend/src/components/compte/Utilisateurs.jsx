import { useEffect, useState } from 'react';
import { requete } from '../../api/client';

const Utilisateurs = () => {
  const [membres, setMembres] = useState([]);
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(true);

  // Au chargement de la page : on demande à l'API les membres de ma famille
  useEffect(() => {
    const charger = async () => {
      try {
        const donnees = await requete('/api/users');
        setMembres(donnees);
      } catch (error) {
        setErreur(error.message);
      } finally {
        setChargement(false);
      }
      return;
    };
    charger();
    return;
  }, []);

  return (
    <>
      <header className="entete-liste">
        <h1>Ma famille</h1>
        <p className="sous-titre">
          {membres.length} membre{membres.length > 1 ? 's' : ''}
        </p>
      </header>

      {erreur !== '' && <p className="alerte" role="alert">{erreur}</p>}
      {chargement && <p className="texte-gris">Chargement…</p>}

      <section className="liste-articles">
        {membres.map((membre) => (
          <div key={membre.id} className="ligne-article">
            <span className="avatar" aria-hidden="true">
              {membre.firstName.charAt(0).toUpperCase()}
            </span>
            <div className="nom-article">
              <strong>{membre.firstName}</strong>
              <br />
              <span className="texte-gris">{membre.email}</span>
            </div>
            <span className="badge">
              {membre.role === 'organizer' ? 'Organisateur' : 'Membre'}
            </span>
          </div>
        ))}
      </section>
    </>
  );
};

export default Utilisateurs;