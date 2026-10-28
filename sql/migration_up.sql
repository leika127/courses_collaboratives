-- Active: 1792404991495@@127.0.0.1@5432@courses_collaboratives
CREATE TYPE categorie_types as ENUM (
  'Fruits et legumes',
  'Boucherie et volaille',
  'Charcuterie traiteur',
  'Poissonnerie',
  'Cremerie et oeufs',
  'Fromagerie',
  'Boulangerie - patisserie',
  'Produits surgeles',
  'Epicerie',
  'Petit déjeuner',
  'Boissons',
  'Produits bio',
  'Confiserie',
  'Produits pour les enfants et bebes',
  'Produits de beaute',
  'Produits hygiene et de soins',
  'Produits entretien',
  'Produits pour animaux',
  'Maison et divers',
  'Autre' 
);

CREATE TYPE role_types as ENUM (
    'Membres',
    'Organisateur'
);  

CREATE TABLE IF NOT EXISTS Family (
id SERIAL PRIMARY KEY,
name varchar(100) NOT NULL check (length(trim(name)) > 0),
date_created TIMESTAMP NOT NULL,
budget DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS User_app (
id SERIAL PRIMARY KEY,
name varchar(100) NOT NULL check (length(trim(name)) > 0),
email varchar(100) NOT NULL,
password_hash varchar(255) NOT NULL,
role varchar(100),
date_created TIMESTAMP NOT NULL,
family_id INT,
FOREIGN KEY (family_id) REFERENCES Family(id)
);

CREATE TABLE IF NOT EXISTS Alert (
id SERIAL PRIMARY KEY,
message TEXT,
user_app_id INT,
FOREIGN KEY (user_app_id) REFERENCES User_app(id)
);

CREATE TABLE IF NOT EXISTS Category (
id SERIAL PRIMARY KEY,
categorie_types categorie_types,
name varchar(100) NOT NULL check (length(trim(name)) > 0),
type varchar(100)
);

CREATE TABLE IF NOT EXISTS Item (
id SERIAL PRIMARY KEY,
name varchar(100) NOT NULL check (length(trim(name)) > 0),
price DECIMAL(10,2),
category_id INT,
FOREIGN KEY (category_id) REFERENCES Category(id)
);

CREATE TABLE IF NOT EXISTS List (
id SERIAL PRIMARY KEY,
name varchar(100) NOT NULL check (length(trim(name)) > 0),
date_created TIMESTAMP NOT NULL,
quantity int NOT NULL,
family_id INT,
FOREIGN KEY (family_id) REFERENCES Family(id)
);

CREATE TABLE IF NOT EXISTS Choice (
purchase_date TIMESTAMP NOT NULL,
user_app_id INT,
item_id INT,
FOREIGN KEY (user_app_id) REFERENCES User_app(id),
FOREIGN KEY (item_id) REFERENCES Item(id)
);

CREATE TABLE IF NOT EXISTS Invite (
id SERIAL PRIMARY KEY,
date_created TIMESTAMP NOT NULL,
family_id INT,
user_app_id INT,
FOREIGN KEY (family_id) REFERENCES Family(id),
FOREIGN KEY (user_app_id) REFERENCES User_app(id)
);
