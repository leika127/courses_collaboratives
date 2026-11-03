-- Active: 1792404991495@@127.0.0.1@5432@courses_collaboratives
-- =====================================================================
-- migration_up.sql (Version FUSIONNÉE & COMPATIBLE)
-- =====================================================================

-- ---------- Catégories ----------
CREATE TABLE IF NOT EXISTS Category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE CHECK (length(trim(name)) > 0)
);

-- ---------- Familles ----------
CREATE TABLE IF NOT EXISTS Family (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK (length(trim(name)) > 0),
  budget DECIMAL(10, 2),
  date_created TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------- Utilisateurs (On garde User_app et name pour le code existant !) ----------
CREATE TABLE IF NOT EXISTS User_app (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK (length(trim(name)) > 0),
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'member' CHECK (role IN ('organizer', 'member')),
  family_id INT REFERENCES Family(id) ON DELETE RESTRICT,
  date_created TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sécurité Email unique (insensible à la casse)
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_app_email_lower ON User_app (LOWER(email));

-- ---------- Articles ----------
CREATE TABLE IF NOT EXISTS Item (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK (length(trim(name)) > 0),
  price DECIMAL(10, 2),
  category_id INT REFERENCES Category(id) ON DELETE SET NULL
);

-- ---------- Listes ----------
CREATE TABLE IF NOT EXISTS List (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK (length(trim(name)) > 0),
  date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  family_id INT REFERENCES Family(id) ON DELETE CASCADE
);

-- ---------- Articles d'une liste ----------
CREATE TABLE IF NOT EXISTS List_item (
  id SERIAL PRIMARY KEY,
  list_id INT NOT NULL REFERENCES List(id) ON DELETE CASCADE,
  item_id INT NOT NULL REFERENCES Item(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  is_checked BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (list_id, item_id)
);

-- ---------- Alertes, choix, invitations ----------
CREATE TABLE IF NOT EXISTS Alert (
  id SERIAL PRIMARY KEY,
  message TEXT,
  user_app_id INT REFERENCES User_app(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Choice (
  id SERIAL PRIMARY KEY,
  purchase_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_app_id INT REFERENCES User_app(id) ON DELETE CASCADE,
  item_id INT REFERENCES Item(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Invite (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  family_id INT REFERENCES Family(id) ON DELETE CASCADE,
  user_app_id INT REFERENCES User_app(id) ON DELETE CASCADE
);
