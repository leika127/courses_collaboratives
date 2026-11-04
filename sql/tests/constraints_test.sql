-- =====================================================
-- Tests des contraintes des tables (family, user_app, category)
-- Lancer avec :
--   docker exec -i courses_collaboratives_db psql -U <DB_USER> -d courses_collaboratives < sql/tests/constraints_test.sql
-- Les lignes "ERROR" attendues sont normales : elles prouvent que les contraintes bloquent.
-- =====================================================
SELECT '--- Nettoyage initial : supprime une eventuelle Famille Test Contraintes restee d un essai precedent' AS test;
DELETE FROM user_app
WHERE family_id = (
    SELECT id
    FROM family
    WHERE name = 'Famille Test Contraintes'
  );
DELETE FROM family
WHERE name = 'Famille Test Contraintes';
SELECT '--- Test 1 : nom de famille vide -> ERREUR attendue (check family_name_check)' AS test;
INSERT INTO family (name)
VALUES ('   ');
SELECT '--- Test 2 : famille valide -> INSERT 0 1 attendu' AS test;
INSERT INTO family (name)
VALUES ('Famille Test Contraintes');
SELECT '--- Test 3 : utilisateur valide -> INSERT 0 1 attendu' AS test;
INSERT INTO user_app (name, password_hash, email, family_id)
VALUES (
    'Sophie',
    'x',
    'test@a.fr',
    (
      SELECT id
      FROM family
      WHERE name = 'Famille Test Contraintes'
    )
  );
SELECT '--- Test 3b : role par defaut -> member attendu' AS test;
SELECT name,
  role
FROM user_app
WHERE email = 'test@a.fr';
SELECT '--- Test 4 : meme email avec majuscules -> ERREUR attendue (idx_user_app_email_lower)' AS test;
INSERT INTO user_app (name, password_hash, email, family_id)
VALUES (
    'Paul',
    'x',
    'Test@A.fr',
    (
      SELECT id
      FROM family
      WHERE name = 'Famille Test Contraintes'
    )
  );
SELECT '--- Test 5 : prenom vide -> ERREUR attendue (check user_app_name_check)' AS test;
INSERT INTO user_app (name, password_hash, email, family_id)
VALUES (
    '  ',
    'x',
    'vide@a.fr',
    (
      SELECT id
      FROM family
      WHERE name = 'Famille Test Contraintes'
    )
  );
SELECT '--- Test 6 : role invalide -> ERREUR attendue (check user_app_role_check)' AS test;
INSERT INTO user_app (
    name,
    password_hash,
    email,
    role,
    family_id
  )
VALUES (
    'Léa',
    'x',
    'lea@a.fr',
    'admin',
    (
      SELECT id
      FROM family
      WHERE name = 'Famille Test Contraintes'
    )
  );
SELECT '--- Test 6b : utilisateur sans famille -> ERREUR attendue (family_id not null)' AS test;
INSERT INTO user_app (name, password_hash, email)
VALUES ('Hugo', 'x', 'sansfamille@a.fr');
SELECT '--- Test 6c : famille inexistante -> ERREUR attendue (cle etrangere user_app_family_id_fkey)' AS test;
INSERT INTO user_app (name, password_hash, email, family_id)
VALUES ('Zoe', 'x', 'zoe@a.fr', 9999999);
SELECT '--- Test 7 : supprimer une famille qui a des membres -> ERREUR attendue (on delete restrict)' AS test;
DELETE FROM family
WHERE name = 'Famille Test Contraintes';
SELECT '--- Test 8 : date avec fuseau horaire -> la date doit finir par +00' AS test;
SELECT name,
  date_created
FROM family
WHERE name = 'Famille Test Contraintes';
SELECT '--- Test 9 : les 20 category du seed -> 20 attendu' AS test;
SELECT count(*)
FROM category;
SELECT '--- Test 10 : categorie en double -> ERREUR attendue (category_name_key)' AS test;
INSERT INTO category (name)
VALUES ('Autre');
SELECT '--- Nettoyage final : membres d abord, puis la famille -> DELETE 1 attendu (restrict autorise une famille vide)' AS test;
DELETE FROM user_app
WHERE family_id = (
    SELECT id
    FROM family
    WHERE name = 'Famille Test Contraintes'
  );
DELETE FROM family
WHERE name = 'Famille Test Contraintes';