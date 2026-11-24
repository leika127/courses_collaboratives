# Audit Git — [24/11/2026]

## Ce qui a été trouvé

- [x] `.env` dans l'historique ? **Non**
      Aucun commit ne contient de `.env`, et `.env` est bien dans le `.gitignore`. `.env.exemple` ne contient que des valeurs vides ou des exemples.
      Vérifié avec : `git log --all --full-history -- '*.env'`
- [x] `node_modules` tracké ? **Non**
      Jamais commité, et ignoré par le `.gitignore`.
      Vérifié avec : `git ls-files | grep node_modules`
- [x] Autres fichiers problématiques ? **Oui**
      `.DS_Store` (fichier caché créé par macOS) était commité, et le `.gitignore` ne contenait pas `.DS_Store`, `.vscode` ni `*.log`.
- [x] Dépendances vulnérables ? **Oui, dans le backend**
      `body-parser` 2.3.0 (gravité haute : déni de service) et `qs` 6.16.0 (gravité moyenne).
      Vérifié avec : `npm audit` dans `backend`

## Ce qui a été corrigé

- `.DS_Store`, `.vscode` et `*.log` ajoutés au `.gitignore` (PR #67).
- `.DS_Store` retiré du dépôt avec `git rm --cached .DS_Store` (PR #67).
- Failles des dépendances corrigées avec `npm audit fix` dans `backend` : `body-parser` 2.3.0 → 2.4.0 et `qs` 6.16.0 → 6.17.1 (PR #68).
  Résultat : `npm audit --omit=dev` affiche 0 vulnérabilité.

## Ce qui reste à faire

- [ ] 2 alertes moyennes sur `minimatch`, via `nodemon` : c'est un outil de développement uniquement, donc sans risque pour l'appli. On attend une nouvelle version de `nodemon` et on ne fait pas de `npm audit fix --force`.
- [ ] Supprimer les branches déjà mergées sur GitHub, et activer « Automatically delete head branches ».
- [ ] Mettre `main` à jour avec une PR « release » de `dev` vers `main`.
- [ ] Ajouter un modèle de PR (`.github/pull_request_template.md`).
- [ ] Rappeler à l'équipe le format des commits défini dans l'ADR 0002 : `type: description`, en minuscules.
