# SERVICES
Applique les règles métier, enchaîne les
appels aux models, lève une erreur si une
règle est violée.

---------------------------------------

### Attention, ne pas mettre :
Toucher à req ou res, écrire du SQL.


---------------------------------------

### Exemple :
nction erreurMetier(status, message) {
  return Object.assign(new Error(message), { status });
}
async function assigner(carteId, apprenanteId) {
  const carte = await Carte.trouver(carteId);
  if (!carte) throw erreurMetier(404, 'Carte introuvable');
  const apprenante = await Apprenante.trouver(apprenanteId);
  if (!apprenante) throw erreurMetier(404, 'Apprenante introuvable');
  if (carte.promoId !== apprenante.promoId) {
    throw erreurMetier(422, 'Hors promo');
  }
  return Carte.assigner(carteId, apprenanteId);
}
