# ROUTES
Associe une méthode et une URL à une
fonction de controller, et branche les
middlewares (authentification S8 & S9)

---------------------------------------

### Attention, ne pas mettre :
Validations, appliquer une règle, écrire du SQL.


---------------------------------------

### Exemple :
// une URL → un middleware → un controller

router.patch(
  '/cartes/:id/assignation',
  authenticate,
  cartesController.assigner
);
