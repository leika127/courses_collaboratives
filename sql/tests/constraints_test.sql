-- =====================================================
-- Tests des contraintes des tables (PR #19)
-- Lancer avec :
--   docker exec -i courses_collaboratives_db psql -U <DB_USER> -d courses_collaboratives < sql/tests/constraints_test.sql
-- Les lignes "ERROR" attendues sont normales : elles prouvent que les contraintes bloquent.
-- =====================================================
SELECT '--- Test 1 : nom de famille vide -> ERREUR attendue (check families_name_check)' AS test;
INSERT INTO families (name)
VALUES ('   ');
SELECT '--- Test 2 : famille valide -> INSERT 0 1 attendu' AS test;
INSERT INTO families (name)
VALUES ('Famille Test');
SELECT '--- Test 3 : utilisateur valide -> INSERT 0 1 attendu' AS test;
INSERT INTO users (first_name, password_hash, email, family_id)
VALUES (
    'Sophie',
    'x',
    'test@a.fr',
    (
      SELECT id
      FROM families
      WHERE name = 'Famille Test'
    )
  );
SELECT '--- Test 4 : meme email avec majuscules -> ERREUR attendue (idx_users_email_lower)' AS test;
INSERT INTO users (first_name, password_hash, email, family_id)
VALUES (
    'Paul',
    'x',
    'Test@A.fr',
    (
      SELECT id
      FROM families
      WHERE name = 'Famille Test'
    )
  );
SELECT '--- Test 5 : prenom vide -> ERREUR attendue (check users_first_name_check)' AS test;
INSERT INTO users (first_name, password_hash, email, family_id)
VALUES (
    '  ',
    'x',
    'vide@a.fr',
    (
      SELECT id
      FROM families
      WHERE name = 'Famille Test'
    )
  );
SELECT '--- Test 6 : role invalide -> ERREUR attendue (check users_role_check)' AS test;
INSERT INTO users (
    first_name,
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
      FROM families
      WHERE name = 'Famille Test'
    )
  );
SELECT '--- Test 7 : supprimer une famille qui a des membres -> ERREUR attendue (on delete restrict)' AS test;
DELETE FROM families
WHERE name = 'Famille Test';
SELECT '--- Test 8 : date avec fuseau horaire -> la date doit finir par +00' AS test;
SELECT name,
  date_created
FROM families
WHERE name = 'Famille Test';
SELECT '--- Nettoyage : on supprime les donnees de test (membres d abord, puis la famille)' AS test;
DELETE FROM users
WHERE family_id = (
    SELECT id
    FROM families
    WHERE name = 'Famille Test'
  );
DELETE FROM families
WHERE name = 'Famille Test';