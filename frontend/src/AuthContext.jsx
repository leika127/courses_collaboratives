import { createContext, useContext, useEffect, useState } from 'react';
import { requete } from './api/client';

const AuthContext = createContext(null);

// Fournit à toute l'application : la personne connectée, et les actions connexion / déconnexion
export const AuthProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Au démarrage : le cookie est-il encore valable ? On demande à l'API qui on est.
  useEffect(() => {
    const verifierSession = async () => {
      try {
        const donnees = await requete('/api/auth/me');
        setUtilisateur(donnees.user);
      } catch {
        setUtilisateur(null);
      } finally {
        setChargement(false);
      }
      return;
    };
    verifierSession();
    return;
  }, []);

  const connecter = async (email, motDePasse) => {
    const donnees = await requete('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: motDePasse }),
    });
    setUtilisateur(donnees.user);
    return donnees.user;
  };

  const deconnecter = async () => {
    await requete('/api/auth/logout', { method: 'POST' });
    setUtilisateur(null);
    return;
  };

  return (
    <AuthContext.Provider value={{ utilisateur, chargement, connecter, deconnecter }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
