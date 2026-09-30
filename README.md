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

cette appli ciblera les familles mais principalement la personne du foyer qui fera les courses (le parent)

### Périmètre de la V1

| Dans la V1 | Hors V1 (plus tard) |
|---|---|
|Création de liste de courses par catégories et sous-catégories | vérification de liste |
|Possibilité de fixer un budjet | l'ajout de personnes via l'utilisateur principal |
|L'ajout de courses se fait en direct par chaque personne du foyer | gestions des droits pour chaque user |
|La fonction de connexion | le suivi du budjet
|Suppression des doublons d'achat ajoutés par erreur | mettre une alerte en cas d'ajout sur la liste par les enfants |
|---| alarme pour rappeler la liste (logo de rappel) |
|---| alarme lors de l'ajout de courses |
|---| possibilité suivre 2 achats de courses pour comparer |
|---| transformer l'application web en application mobile pure |
---

## Stack technique

| Partie | Technologie |
|---|---|
| Frontend | React (Vite) + React Router |
| Backend | Node.js + Express |
| Base de données | PostgreSQL 16 (via Docker) |
| Qualité du code | ESLint |

Le choix de cette stack est justifié dans les ADR : voir le dossier `docs/adr/` *(à venir)*.

---

## Prérequis

Installer ces outils avant de commencer :

| Outil | Version | Vérifier l'installation |
|---|---|---|
| [Node.js](https://nodejs.org/) (fournit npm) | LTS | `node -v` et `npm -v` |
| [Git](https://git-scm.com/) | récente | `git --version` |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | récente | `docker --version` |

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

### 3. Configurer les variables d'environnement

Copier le fichier d'exemple, puis remplir les valeurs :

```bash
cp backend/.env.exemple backend/.env
```

| Variable | Rôle | Exemple |
|---|---|---|
| À compléter selon `.env.exemple` | | |

⚠️ Le fichier `backend/.env` contient des mots de passe : il est ignoré par Git et ne doit **jamais** être commité.

### 4. Démarrer la base de données

```bash
cd backend
docker compose up -d
cd ..
```

### 5. Créer les tables et les données de test

> À compléter une fois `docker-compose.yml` écrit : commande pour exécuter `sql/migration_up.sql` puis `sql/migration_down.sql`.

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

Ces dépendances sont installées automatiquement par `npm install` (étape 2).
Cette section explique leur rôle et la commande utilisée pour les ajouter.

### Racine

| Paquet | Type | Rôle |
|---|---|---|
| `concurrently` | développement | Lancer backend et frontend avec une seule commande dans le dossier racine |

```bash
npm install --save-dev concurrently
```

### Backend

| Paquet | Type | Rôle |
|---|---|---|
| `express` | principale | Créer le serveur et les routes de l'API |
| `pg` | principale | Communiquer avec PostgreSQL |
| `dotenv` | principale | Lire les variables du fichier `.env` |
| `cors` | principale | Autoriser le frontend à appeler l'API |
| `nodemon` | développement | Redémarrer le serveur à chaque modification |

```bash
cd backend
npm install express pg dotenv cors
npm install --save-dev nodemon
```

### Frontend

| Paquet | Type | Rôle |
|---|---|---|
| `react`, `react-dom` | principale | Construire l'interface (installés par Vite) |
| `react-router-dom` | principale | Naviguer entre les pages |
| `vite` | développement | Serveur de développement et compilation |
| `eslint` + plugins | développement | Vérifier la qualité du code |

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install react-router-dom
```

---

## Structure du projet

```
courses_collaboratives/
├── backend/
│   ├── server/
│   │   ├── routes/          # Routes de l'API
│   │   ├── db.js            # Connexion à PostgreSQL
│   │   └── server.js        # Point d'entrée du serveur
│   ├── requetes/            # Requêtes SQL
│   ├── docker-compose.yml   # Conteneur PostgreSQL
│   ├── .env.exemple         # Modèle des variables d'environnement
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/                 # Code React
│   └── package.json
├── sql/
│   ├── migration_up.sql     # Création des tables
│   ├── migration_down.sql   # Suppression des tables
│   └── seed.sql             # Données de test
├── .gitignore
├── package.json             # Scripts globaux (concurrently)
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

---

## Contribuer

Les règles complètes sont dans [`CONTRIBUTING.md`](CONTRIBUTING.md) *(à venir)*.

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
