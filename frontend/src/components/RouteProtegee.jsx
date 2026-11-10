import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Affiche la page seulement si quelqu'un est connecté, sinon renvoie vers la connexion
const RouteProtegee = ({ children }) => {
  const { utilisateur, chargement } = useAuth();

  // On attend la réponse de /me avant de décider (sinon on redirigerait à tort au rechargement)
  if (chargement) {
    return <p className="texte-gris">Chargement…</p>;
  }
  if (!utilisateur) {
    return <Navigate to="/connexion" replace />;
  }
  return children;
};

export default RouteProtegee;
