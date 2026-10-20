create table categories (
  id serial primary key,
  name varchar(255) not null unique
);
create table families (
  id serial primary key,
  name varchar(255) not null check (length(trim(name)) > 0),
  date_created timestamptz not null default now()
);
create table users (
  id serial primary key,
  first_name varchar(255) not null check (length(trim(first_name)) > 0),
  password_hash varchar(255) not null,
  email varchar(255) not null,
  role varchar(20) not null default 'member' check (role in ('organizer', 'member')),
  /*La valeur par défaut s’applique seulement quand aucun rôle n'est envoyé. Si une requête envoie explicitement "NULL", la colonne l’accepterait. Avec "not null", ce cas est bloqué.*/
  family_id int not null references families(id) on delete restrict,
  /*not null : un utilisateur appartient toujours à une famille.   on delete restrict : impossible de supprimer une famille tant qu'elle a des membres.   Il faut d'abord supprimer ses membres, volontairement. Ce choix évite d'effacer des données par accident. */
  date_created timestamptz not null default now()
  /*La date de création est automatiquement définie à la date et l’heure actuelles lors de l’insertion d’un nouvel utilisateur. Cela permet de suivre quand chaque utilisateur a été créé dans le système. */
);
create unique index idx_users_email_lower on users (lower(email));