import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Connexion = () => {
  const { utilisateur, connecter } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  // Déjà connecté : pas besoin de cette page
  if (utilisateur) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErreur('');
    setEnvoiEnCours(true);
    try {
      await connecter(email, motDePasse);
      navigate('/');
    } catch (error) {
      setErreur(error.message);
    } finally {
      setEnvoiEnCours(false);
    }
    return;
  };

  return (
    <form className="carte formulaire" onSubmit={handleSubmit}>
      <h1>Connexion</h1>
      {erreur !== '' && <p className="alerte" role="alert">{erreur}</p>}

      <div className="champ">
        <label htmlFor="email">Adresse email</label>
        <input
          id="email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(event) => {
            return setEmail(event.target.value);
          }}
          required
        />
      </div>

      <div className="champ">
        <label htmlFor="mot-de-passe">Mot de passe</label>
        <input
          id="mot-de-passe"
          type="password"
          value={motDePasse}
          autoComplete="current-password"
          onChange={(event) => {
            return setMotDePasse(event.target.value);
          }}
          required
        />
      </div>

      <button type="submit" className="bouton" disabled={envoiEnCours}>
        {envoiEnCours ? 'Connexion…' : 'Se connecter'}
      </button>
      <p className="texte-gris">
        Pas encore de compte ? <Link to="/inscription">Créer le compte de ma famille</Link>
      </p>
    </form>
  );
};

export default Connexion;
