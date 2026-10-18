create table categories (
  id serial primary key,
  name varchar(255) not null unique
);
create table families (
  id serial primary key,
  name varchar(255) not null,
  date_created timestamp not null default now()
);
create table users (
  id serial primary key,
  first_name varchar(255) not null check (length(trim(first_name)) > 0),
  password varchar(255) not null,
  email varchar(255) not null unique,
  role varchar(20) not null default 'member' check (role in ('organizer', 'member')),
  /*La valeur par défaut s’applique seulement pas de rôle. Si une requête envoie explicitement "NULL", la colonne l’accepterait. Avec "not null", ce cas est bloqué. varchar(20)*/
  family_id int not null references families(id) on delete cascade,
  /*not null : un utilisateur appartient toujours à une famille.
   on delete cascade : si une famille est supprimée, ses membres le sont aussi. Sans cette option, la suppression d’une famille échouerait si elle a des membres. */
  date_created timestamp not null default now()
  /*La date de création est automatiquement définie à la date et l’heure actuelles lors de l’insertion d’un nouvel utilisateur. Cela permet de suivre quand chaque utilisateur a été créé dans le système. */
);