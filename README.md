# Courses collaboratives

Application web de liste de courses partagée pour les familles.
Projet réalisé à Ada Tech School dans le cadre du projet Lovelace Factory.

---

## Sommaire

1. [Le projet](#le-projet)
2. [Stack technique](#stack-technique)
3. [Prérequis](#prérequis)
4. [Installation](#installation)
5. [Lancer le projet](#lancer-le-projet)
6. [Scripts disponibles](#scripts-disponibles)
7. [Dépendances du projet](#dépendances-du-projet)
8. [Structure du projet](#structure-du-projet)
9. [Dépannage](#dépannage)
10. [Contribuer](#contribuer)
11. [Équipe](#équipe)

---

## Le projet

### Problématique

Les familles doivent gérer les courses tout en gérant le budjet qui leur est attribué. Très souvent, les courses sont notées sur papier et sont oubliées ou perdues. Les personnes doivent donc se rappeler cedont ils ont besoin.

### Cible prioritaire

cette appli ciblera les familles mais principalement la personne du foyer qui fera les courses (les parents / colocataires)


### Périmètre de la V1

| Dans la V1 | Hors V1 (plus tard) |
|---|---|
| Création de liste de courses par catégories et sous-catégories | Ajout de personnes via l'utilisateur principal |
| Possibilité de fixer un budget et d'en suivre la consommation | Gestion des droits pour chaque utilisateur |
| Ajout de courses en direct par chaque personne du foyer | Alerte en cas d'ajout sur la liste par les utilisateurs |
| Fonction de connexion | Comparaison de courses : suivi de 2 achats (statistiques / historique) |
| Suppression des doublons et vérification de la liste (avec validation) | Alarme pour rappeler la liste (logo de rappel) |
| | Application web compatible smartphone (hors connexion), puis application mobile pure |

## Stack technique

| Partie | Technologie |
|---|---|
| Frontend | React (Vite) + React Router |
| Backend | Node.js + Express |
| Base de données | PostgreSQL 18 (via Docker) |
| Qualité du code | ESLint |

Le choix de cette stack est justifié dans les ADR : voir le dossier `docs/adr/`.

---

## Prérequis

Installer ces outils avant de commencer :

| Outil | Version minimale | Version testée | Vérifier l'installation |
|---|---|---|---|
| [Node.js](https://nodejs.org/) | 20.19, 22.13 ou 24 et plus | 26.10.0 | `node -v` |
| npm (fourni avec Node.js) | 10 | 11.19.1 | `npm -v` |
| [Git](https://git-scm.com/) | 2.40 | 2.56.1 | `git --version` |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Docker 24 + Compose v2 | Docker 29.9.3, Compose v5.7.0 | `docker --version` et `docker compose version` |
| PostgreSQL | 18 (image Docker `postgres:18`) | 18 | aucune installation : fourni par Docker |

> Le minimum de Node.js vient des dépendances du projet (ESLint 10 et Vite 8).
> Python n'est pas nécessaire.

Docker Desktop doit être **lancé** (icône active) avant de démarrer la base de données.

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/leika127/courses_collaboratives.git
cd courses_collaboratives
```

### 2. Installer les dépendances

Le projet contient **trois** `package.json` (racine, backend, frontend). Il faut installer les dépendances dans chacun :

```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

Toutes les dépendances (dont `swagger-ui-express`) sont déjà déclarées dans les `package.json` : un simple `npm install` dans chaque dossier suffit.

### 3. Configurer les variables d'environnement

Copier le fichier d'exemple, puis remplir les valeurs :

```bash
cp backend/.env.exemple backend/.env
```

| Variable | Rôle | Exemple |
|---|---|---|
| `PORT` | Port du serveur Express | `3000` |
| `DB_HOST` | Adresse de PostgreSQL | `localhost` |
| `DB_PORT` | Port de PostgreSQL | `5432` |
| `DB_USER` | Utilisateur PostgreSQL (créé par Docker au premier lancement) | `courses` |
| `DB_PASSWORD` | Mot de passe de cet utilisateur | `un_mot_de_passe_local` |
| `DB_NAME` | Nom de la base | `courses_collaboratives` |
| `JWT_SECRET` | Clé secrète qui signe les jetons de connexion (**obligatoire**, le serveur refuse de démarrer sans elle) | une longue chaîne aléatoire, voir la commande ci-dessous |
| `JWT_EXPIRES_IN` | Durée de validité d'une connexion | `7d` (7 jours) |

Pour générer `JWT_SECRET` :

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Les variables `DB_*` servent **à la fois** à l'API et à `docker-compose.yml`, qui crée l'utilisateur et la base avec ces valeurs : remplissez-les **avant** le premier `docker compose up`.

⚠️ Le fichier `backend/.env` contient des mots de passe : il est ignoré par Git et ne doit **jamais** être commité.

### 4. Démarrer la base de données

```bash
cd backend
docker compose up -d
cd ..
```

### 5. Créer les tables et les données de test

**Rien à faire : c'est automatique.** Au **premier** `docker compose up`, PostgreSQL exécute tout seul, dans cet ordre :

1. `sql/migration_up.sql` : création des tables ;
2. `sql/seed.sql` : données de test (20 rayons, le catalogue d'articles, une famille d'exemple).

⚠️ Ces scripts ne s'exécutent que si la base est **vide** (premier lancement). Si le schéma SQL a changé depuis, ou pour repartir de zéro, il faut supprimer la base et la recréer (**cela efface toutes les données**) :

```bash
cd backend
docker compose down -v
docker compose up -d
cd ..
```

> `sql/migration_down.sql` **supprime toutes les tables**. Il ne fait pas partie de l'installation : ne l'exécutez que si vous voulez volontairement tout effacer.

---

## Lancer le projet

Depuis la **racine** du projet, avec la base de données démarrée :

```bash
npm run dev
```

Cette commande lance le backend et le frontend en même temps (grâce à `concurrently`).

| Service | Adresse |
|---|---|
| Frontend | http://localhost:5173 |
| API (backend) | http://localhost:3000 |
| Documentation de l'API (Swagger) | http://localhost:3000/api-docs |

### Premier lancement : créer un compte

Il n'y a **pas de compte de démonstration utilisable** : l'utilisateur présent dans `seed.sql` (Camille) n'a pas de vrai mot de passe et **ne peut pas se connecter**.

Pour tester l'application, cliquez sur **« Créer un compte »** depuis la page de connexion. L'inscription crée votre famille, votre compte (organisateur) et une liste de courses vide.

### Arrêter le projet

- Frontend et backend : `Ctrl + C` dans le terminal.
- Base de données :

```bash
cd backend
docker compose down 
cd ..
```

---

## Scripts disponibles

### Racine

| Commande | Effet |
|---|---|
| `npm run dev` | Lance backend et frontend en même temps |
| `npm run dev:backend` | Lance uniquement le backend |
| `npm run dev:frontend` | Lance uniquement le frontend |

### Backend (`backend/`)

| Commande | Effet |
|---|---|
| `npm run start:dev` | Lance le serveur avec nodemon (redémarrage automatique) |
| `npm start` | Lance le serveur sans redémarrage automatique |

### Frontend (`frontend/`)

| Commande | Effet |
|---|---|
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Construit la version de production dans `dist/` |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run preview` | Affiche la version de production en local |

---

## Dépendances du projet

Ces dépendances sont installées automatiquement par `npm install` (étape 2). **Il n'y a aucune commande à lancer ici** : cette section explique seulement leur rôle.

### Racine

| Paquet | Type | Rôle |
|---|---|---|
| `concurrently` | développement | Lancer backend et frontend avec une seule commande |
| `eslint`, `@eslint/js`, `globals` | développement | Vérifier la qualité du code |

### Backend

| Paquet | Type | Rôle |
|---|---|---|
| `express` | principale | Créer le serveur et les routes de l'API |
| `pg` | principale | Communiquer avec PostgreSQL |
| `dotenv` | principale | Lire les variables du fichier `.env` |
| `cors` | principale | Autoriser le frontend à appeler l'API |
| `bcryptjs` | principale | Hacher les mots de passe |
| `jsonwebtoken` | principale | Créer et vérifier les jetons de connexion (JWT) |
| `cookie-parser` | principale | Lire le cookie de connexion |
| `swagger-ui-express` | principale | Afficher la documentation de l'API sur `/api-docs` |
| `nodemon` | développement | Redémarrer le serveur à chaque modification |

### Frontend

| Paquet | Type | Rôle |
|---|---|---|
| `react`, `react-dom` | principale | Construire l'interface |
| `react-router-dom` | principale | Naviguer entre les pages |
| `vite` | développement | Serveur de développement et compilation |
| `eslint` + plugins | développement | Vérifier la qualité du code |

<details>
<summary>Pour information : commandes utilisées à la création du projet (⚠️ ne pas relancer)</summary>

Ces commandes ont servi **une seule fois**, pour créer le projet. Les relancer écraserait ou dupliquerait des fichiers existants. Pour installer le projet, suivez uniquement la section [Installation](#installation).

```text
npm create vite@latest frontend -- --template react
npm install react-router-dom
npm install express pg dotenv cors bcryptjs jsonwebtoken cookie-parser swagger-ui-express
npm install --save-dev nodemon concurrently
```

</details>

---

## Structure du projet

```
courses_collaboratives/
├── backend/
│   ├── src/
│   │   ├── routes/             # Aiguillage : URL + méthode → contrôleur
│   │   ├── controllers/        # Lecture de la requête, choix du code HTTP
│   │   ├── services/           # Règles métier
│   │   ├── models/             # Requêtes SQL
│   │   ├── middlewares/        # auth (vérifie le JWT), errorHandler (erreurs)
│   │   ├── utils/              # Petites fonctions partagées (httpError)
│   │   ├── app.js              # Configure Express (CORS, JSON, cookies, routes)
│   │   ├── db.js               # Connexion à PostgreSQL
│   │   └── server.js           # Point d'entrée : démarre le serveur
│   ├── docker-compose.yml      # Conteneur PostgreSQL (lance migration + seed)
│   ├── .env.exemple            # Modèle des variables d'environnement
│   ├── swagger.json            # Documentation de l'API (Swagger)
│   └── package.json
├── docs/
│   ├── adr/                    # Décisions d'architecture (ADR 0001 à 0004)
│   └── audit.md                # Audit Git du dépôt
├── frontend/
│   ├── public/                 # Fichiers statiques (favicon, icônes)
│   ├── src/
│   │   ├── api/client.js       # Appels à l'API (avec le cookie de connexion)
│   │   ├── components/         # Composants et pages (Accueil, Liste, Rayons…)
│   │   │   └── compte/         # Pages liées au compte (membres de la famille)
│   │   ├── pages/              # Page de connexion
│   │   ├── AuthContext.jsx     # Utilisateur connecté, partagé dans l'appli
│   │   ├── ListeContext.jsx    # Liste de courses, partagée dans l'appli
│   │   ├── App.jsx             # Routes du front
│   │   ├── main.jsx            # Point d'entrée React
│   │   └── index.css           # Styles
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
├── sql/
│   ├── migration_up.sql        # Création des tables
│   ├── migration_down.sql      # Suppression des tables (⚠️ efface tout)
│   ├── seed.sql                # Données de test
│   └── tests/                  # Tests des contraintes SQL
├── .gitignore
├── eslint.config.mjs           # Configuration ESLint (racine)
├── package.json                # Scripts globaux (concurrently)
└── README.md
```

---

## Dépannage

| Problème | Solution |
|---|---|
| `docker: command not found` ou erreur de connexion à Docker | Vérifier que Docker Desktop est installé **et lancé** |
| Le port 5432 est déjà utilisé | Un autre PostgreSQL tourne déjà : l'arrêter, ou changer le port dans `.env` |
| Le backend ne se connecte pas à la base | Vérifier que `backend/.env` existe et que ses valeurs correspondent à `docker-compose.yml` |
| `Cannot find module …` | Relancer `npm install` dans le dossier concerné (racine, backend ou frontend) |
| Erreur 500 avec `relation "…" does not exist` ou `column … does not exist` | La base date d'avant un changement du schéma SQL : la recréer avec `docker compose down -v` puis `docker compose up -d` (dans `backend`, efface les données) |
| « Failed to fetch » dans le navigateur | Le backend n'est pas lancé, ou le frontend tourne sur un autre port que 5173 (bloqué par CORS) : fermer les anciens terminaux et relancer `npm run dev` |

---

## Contribuer

Les règles complètes sont dans le fichier **docs** qui se trouve à la racine du dossier

En résumé :

- `main` : version stable, protégée.
- `dev` : branche de travail commune, protégée.
- Chaque tâche se fait sur une sous-branche créée depuis `dev` (`feature/…`, `fix/…`, `docs/…`).
- Toute modification passe par une **pull request vers `dev`**, relue et approuvée par l'autre membre de l'équipe.
- Les messages de commit suivent la convention [Conventional Commits](https://www.conventionalcommits.org/fr/) (`feat:`, `fix:`, `docs:`, `chore:`…).

---

## Équipe

| Membre | GitHub |
|---|---|
| Anthony | [@leika127](https://github.com/leika127) |
| Bernardo | [@Bsnardo](https://github.com/Bsrnardo) |
| Aurelie | [@aurelieichelmann](https://github.com/aurelieichelmann) |