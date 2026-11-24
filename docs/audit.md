# Audit Git — [24/11/2026]

## Ce qui a été trouvé

- [x] .env dans l'historique ? **non**
      Aucun commit ne contient de `.env`, et `.env` est bien dans le `.gitignore`. `.env.exemple` ne contient que des valeurs vides ou des exemples.
      Test effectués via la commande git log --all --full-history -- '\*.env'
- [x] node_modules tracké ? **non**
      Jamais commité, et ignoré par le `.gitignore`.
      Test effectué via la commande git ls-files | grep node_modules
- [x] Autres fichiers problématiques ?
      Dans .gitignore, ajout des dossiers .DS_Store, .vscode et \*.log non encore commités

- [x] Dépendances vulnérables ? **Oui, dans le backend**
      `body-parser` 2.3.0 (gravité haute : déni de service) et `qs` 6.16.0 (gravité moyenne).
      Vérifié avec : `npm audit` dans `backend`

## Ce qui a été corrigé

- ajout des fichiers et dossiers .DS_Store, .vscode et \*.log dans .gitignore...
- le .env est vérifié, le .gitignore complété, .DS_Store retiré et les failles graves corrigées.

## Ce qui reste à faire
