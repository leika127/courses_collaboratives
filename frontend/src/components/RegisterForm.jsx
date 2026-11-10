import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { requete } from '../api/client';
import { useAuth } from '../AuthContext';

const MOT_DE_PASSE_MIN = 8;

const RegisterForm = () => {
  const { utilisateur, connecter } = useAuth();
  const navigate = useNavigate();

  // 1. Les states : une valeur par champ
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  // Déjà connecté : pas besoin de cette page
  if (utilisateur) {
    return <Navigate to="/" replace />;
  }

  // 2. Les fonctions : AVANT le return
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErreur('');
    setEnvoiEnCours(true);
    try {
      await requete('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          familyName: familyName,
          firstName: firstName,
          email: email,
          password: password,
        }),
      });
      // Compte créé : on connecte directement la personne
      await connecter(email, password);
      navigate('/');
    } catch (error) {
      setErreur(error.message);
    } finally {
      setEnvoiEnCours(false);
    }
    return;
  };

  // 3. Le JSX : toujours en dernier
  return (
    <form className="carte formulaire" onSubmit={handleSubmit}>
      <h1>Créer le compte de ma famille</h1>
      {erreur !== '' && <p className="alerte" role="alert">{erreur}</p>}

      <div className="champ">
        <label htmlFor="nom-famille">Nom de la famille</label>
        <input
          id="nom-famille"
          type="text"
          value={familyName}
          autoComplete="family-name"
          onChange={(event) => {
            return setFamilyName(event.target.value);
          }}
          required
        />
      </div>

      <div className="champ">
        <label htmlFor="prenom">Prénom</label>
        <input
          id="prenom"
          type="text"
          value={firstName}
          autoComplete="given-name"
          onChange={(event) => {
            return setFirstName(event.target.value);
          }}
          required
        />
      </div>

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
        <label htmlFor="mot-de-passe">Mot de passe ({MOT_DE_PASSE_MIN} caractères minimum)</label>
        <input
          id="mot-de-passe"
          type="password"
          value={password}
          autoComplete="new-password"
          minLength={MOT_DE_PASSE_MIN}
          onChange={(event) => {
            return setPassword(event.target.value);
          }}
          required
        />
      </div>

      <button type="submit" className="bouton" disabled={envoiEnCours}>
        {envoiEnCours ? 'Création…' : 'Créer le compte'}
      </button>
      <p className="texte-gris">
        Déjà un compte ? <Link to="/connexion">Se connecter</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
