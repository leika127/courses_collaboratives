# CONTROLLERS
Lit req, vérifie le format, appelle le service,
choisit le code HTTP et répond avec res.

---------------------------------------

### Attention, ne pas mettre :
Contenir une règle métier ou du SQL.


---------------------------------------

### Exemple :
async function assigner(req, res) {
  const { apprenanteId } = req.body;
  if (!apprenanteId) {
    return res.status(422).json({ error: 'apprenanteId requis' });
  }
  try {
    const id = Number(req.params.id);
    const carte = await cartesService.assigner(id, apprenanteId);
    res.status(200).json(carte);
  } catch (erreur) {
    res.
  }}