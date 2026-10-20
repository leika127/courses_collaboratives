# ADR 0004 · Choix de la structure du projet
# Statut : accepté, le 20/10/2026.

## Contexte:
L'équipe est composée de 3 personnes, nous avons décidé de fixer une architecture de code côté back et front.

## Décision

Pour le **back-end**, nous avons choisi une **architecture en couches** (`routes`, `controllers`, `services`, `models`). Comme l'équipe découvre Express et que le projet comporte peu de domaines métier, cette organisation permet à chacun de savoir immédiatement où chercher la validation des requêtes, la logique métier ou les requêtes SQL.

Pour le **front-end**, nous avons opté pour une organisation par dossiers et sous-dossiers en regroupant nos différents composants React, afin de garantir une structure lisible, modulaire et facile à maintenir.

### Front : `frontend/src/`

```
frontend/src/
├── assets/          # Images
├── components/      # Composants React réutilisables
│   ├── Navbar.jsx
│   ├── ListeCourses.jsx
│   └── ArticleCard.jsx
├── App.jsx          # Composant racine
└── main.jsx         # Point d'entrée
```

- Un composant = un fichier `.jsx`, nommé en **PascalCase** (`ListeCourses.jsx`).
- Tous les composants sont rangés dans `components/`.
- Des sous-dossiers par thème (`components/liste/`, `components/compte/`) pourront être créés si le dossier devient trop chargé.

### Back : `backend/server/`

```
backend/server/
├── routes/          # Un fichier par ressource de l'API
│   ├── categories.js
│   └── listes.js
├── db.js            # Connexion à PostgreSQL
└── server.js        # Point d'entrée : crée le serveur et branche les routes
```


## Conséquences:
Chaque type de fichier a une place précise : on sait où chercher un composant ou une route.
Le code est plus lisible et les conflits Git sont moins fréquents, puisque chacun travaille sur des fichiers distincts.