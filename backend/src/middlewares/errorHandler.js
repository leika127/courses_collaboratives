// Transforme TOUTES les erreurs en réponses HTTP, à un seul endroit
// Express le reconnaît à ses 4 paramètres : il doit être déclaré en DERNIER dans app.js
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // 1. JSON mal formé envoyé par le client
  if (err.type === 'entity.parse.failed') {
    return res
      .status(400)
      .json({ error: 'Le corps de la requête doit être du JSON valide' });
  }

  // 2. Erreur prévue, créée avec httpError(status, message)
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  // 3. Erreur imprévue : détail pour nous, message générique pour le client
  console.error(err);
  return res.status(500).json({ error: 'Erreur interne du serveur' });
};
