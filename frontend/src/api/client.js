// Adresse de l'API (le back Express)
export const API_URL = 'http://localhost:3000';

// Appelle l'API en envoyant le cookie de session, et renvoie le JSON reçu.
// En cas d'erreur, lance une Error qui contient le message de l'API et le code HTTP (status).
export const requete = async (chemin, options = {}) => {
  const reponse = await fetch(`${API_URL}${chemin}`, {
    ...options,
    credentials: 'include', // envoie et reçoit le cookie httpOnly "token"
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  // 204 No Content : rien à lire (ex. déconnexion)
  if (reponse.status === 204) {
    return null;
  }

  const donnees = await reponse.json().catch(() => {
    return null;
  });

  if (!reponse.ok) {
    const erreur = new Error(donnees?.error ?? 'Erreur serveur');
    erreur.status = reponse.status;
    throw erreur;
  }
  return donnees;
};
