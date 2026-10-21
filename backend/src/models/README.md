# MODELS
Parle à la base (SELECT, INSERT, UPDATE,
DELETE) et renvoie des objets JavaScript.

---------------------------------------

### Attention, ne pas mettre :
Savoir qui l’appelle, ou décider si une action
est permise.


---------------------------------------

### Exemple :
async function trouver(id) {
  const { rows } = await db.query(
    'SELECT id, promo_id AS "promoId" FROM cartes WHERE id = $1',
    [id]);
  return rows[0] ?? null;
}
async function assigner(id, apprenanteId) {
  const { rows } = await db.query(
    'UPDATE cartes SET apprenante_id = $1 WHERE id = $2 RETURNING *',
    [apprenanteId, id]);
  return rows[0];
}