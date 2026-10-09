CREATE TABLE categorie (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE "sous-categories" (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(255) NOT NULL,
  prix DECIMAL(10, 2) NOT NULL,
  categorie_id INT NOT NULL REFERENCES categorie(id)
);