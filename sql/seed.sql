BEGIN;
 
TRUNCATE TABLE Choice, Alert, Invite, List, Item, Category, User_app, Family
RESTART IDENTITY CASCADE;
 
-- ---------------------------------------------------------------------------
-- Family (ids 1 et 2)
-- ---------------------------------------------------------------------------
INSERT INTO Family (id, name, date_created, budget) VALUES
(1, 'Famille Martin', NOW() - INTERVAL '120 days', 450.00),
(2, 'Famille Dubois', NOW() - INTERVAL '60 days',  320.50);
 
-- ---------------------------------------------------------------------------
-- User_app (ids 1 à 6) — l'utilisateur 6 n'a pas de famille
-- ---------------------------------------------------------------------------
INSERT INTO User_app (id, name, email, password_hash, role, date_created, family_id) VALUES
(1, 'Claire Martin', 'claire.martin@example.com', '$2b$10$DjVgVeEO0IJV51f1Kk60FebAI/hLvvRpTq.TCltSecIg1so5oDbB6', 'Organisateur', NOW() - INTERVAL '118 days', 1),
(2, 'Paul Martin',   'paul.martin@example.com',   '$2b$10$DjVgVeEO0IJV51f1Kk60FebAI/hLvvRpTq.TCltSecIg1so5oDbB6', 'Membres',      NOW() - INTERVAL '110 days', 1),
(3, 'Léa Martin',    'lea.martin@example.com',    '$2b$10$DjVgVeEO0IJV51f1Kk60FebAI/hLvvRpTq.TCltSecIg1so5oDbB6', 'Membres',      NOW() - INTERVAL '90 days',  1),
(4, 'Hugo Dubois',   'hugo.dubois@example.com',   '$2b$10$DjVgVeEO0IJV51f1Kk60FebAI/hLvvRpTq.TCltSecIg1so5oDbB6', 'Organisateur', NOW() - INTERVAL '58 days',  2),
(5, 'Emma Dubois',   'emma.dubois@example.com',   '$2b$10$DjVgVeEO0IJV51f1Kk60FebAI/hLvvRpTq.TCltSecIg1so5oDbB6', 'Membres',      NOW() - INTERVAL '50 days',  2),
(6, 'Lucas Bernard', 'lucas.bernard@example.com', '$2b$10$DjVgVeEO0IJV51f1Kk60FebAI/hLvvRpTq.TCltSecIg1so5oDbB6', 'Membres',      NOW() - INTERVAL '10 days',  NULL);
 
-- ---------------------------------------------------------------------------
-- Category (ids 1 à 20) — une ligne par valeur de l'ENUM categorie_types
-- ---------------------------------------------------------------------------
INSERT INTO Category (id, categorie_types, name, type) VALUES
(1,  'Fruits et legumes',                    'Fruits et légumes',        'Alimentaire'),
(2,  'Boucherie et volaille',                'Boucherie et volaille',    'Alimentaire'),
(3,  'Charcuterie traiteur',                 'Charcuterie traiteur',     'Alimentaire'),
(4,  'Poissonnerie',                         'Poissonnerie',             'Alimentaire'),
(5,  'Cremerie et oeufs',                    'Crèmerie et œufs',         'Alimentaire'),
(6,  'Fromagerie',                           'Fromagerie',               'Alimentaire'),
(7,  'Boulangerie - patisserie',             'Boulangerie - pâtisserie', 'Alimentaire'),
(8,  'Produits surgeles',                    'Produits surgelés',        'Alimentaire'),
(9,  'Epicerie',                             'Épicerie',                 'Alimentaire'),
(10, 'Petit déjeuner',                       'Petit déjeuner',           'Alimentaire'),
(11, 'Boissons',                             'Boissons',                 'Alimentaire'),
(12, 'Produits bio',                         'Produits bio',             'Alimentaire'),
(13, 'Confiserie',                           'Confiserie',               'Alimentaire'),
(14, 'Produits pour les enfants et bebes',   'Enfants et bébés',         'Enfants'),
(15, 'Produits de beaute',                   'Beauté',                   'Hygiène'),
(16, 'Produits hygiene et de soins',         'Hygiène et soins',         'Hygiène'),
(17, 'Produits entretien',                   'Entretien',                'Maison'),
(18, 'Produits pour animaux',                'Animaux',                  'Animaux'),
(19, 'Maison et divers',                     'Maison et divers',         'Maison'),
(20, 'Autre',                                'Autre',                    'Divers');
 
-- ---------------------------------------------------------------------------
-- Item (ids 1 à 43) — (id, name, price, category_id)
-- ---------------------------------------------------------------------------
INSERT INTO Item (id, name, price, category_id) VALUES
(1,  'Pommes Gala (1 kg)',              2.95, 1),
(2,  'Bananes (1 kg)',                  1.79, 1),
(3,  'Carottes (1 kg)',                 1.39, 1),
(4,  'Poulet fermier entier',           9.90, 2),
(5,  'Steak haché 5% (x4)',             6.49, 2),
(6,  'Jambon blanc (4 tranches)',       3.20, 3),
(7,  'Saucisson sec',                   3.85, 3),
(8,  'Filet de saumon (x2)',            7.50, 4),
(9,  'Crevettes cuites (250 g)',        5.99, 4),
(10, 'Lait demi-écrémé (1 L)',          1.15, 5),
(11, 'Œufs plein air (x12)',            3.45, 5),
(12, 'Beurre doux (250 g)',             2.60, 5),
(13, 'Comté (200 g)',                   4.20, 6),
(14, 'Camembert',                       2.30, 6),
(15, 'Baguette tradition',              1.10, 7),
(16, 'Croissants (x4)',                 3.60, 7),
(17, 'Pizza margherita',                3.50, 8),
(18, 'Haricots verts surgelés (1 kg)',  2.80, 8),
(19, 'Pâtes spaghetti (500 g)',         1.20, 9),
(20, 'Riz basmati (1 kg)',              2.90, 9),
(21, 'Huile d''olive (75 cl)',          6.50, 9),
(22, 'Céréales muesli (500 g)',         3.40, 10),
(23, 'Confiture de fraises',            2.35, 10),
(24, 'Eau minérale (pack 6 x 1,5 L)',   3.90, 11),
(25, 'Jus d''orange (1 L)',             2.20, 11),
(26, 'Lentilles vertes bio (500 g)',    2.75, 12),
(27, 'Lait d''avoine bio (1 L)',        2.10, 12),
(28, 'Tablette chocolat noir',          1.95, 13),
(29, 'Bonbons assortis (300 g)',        2.60, 13),
(30, 'Couches taille 4 (x44)',         11.90, 14),
(31, 'Compotes pomme (x4)',             2.50, 14),
(32, 'Crème hydratante visage',         7.90, 15),
(33, 'Déodorant',                       3.20, 15),
(34, 'Dentifrice',                      2.10, 16),
(35, 'Shampoing (250 ml)',              3.30, 16),
(36, 'Papier toilette (x12)',           5.60, 16),
(37, 'Liquide vaisselle (500 ml)',      1.90, 17),
(38, 'Lessive (1,5 L)',                 7.40, 17),
(39, 'Croquettes chat (2 kg)',          8.90, 18),
(40, 'Litière (10 L)',                  6.20, 18),
(41, 'Piles AA (x8)',                   5.50, 19),
(42, 'Sacs poubelle 30 L (x20)',        2.70, 19),
(43, 'Timbres (carnet)',               12.00, 20);
 
-- ---------------------------------------------------------------------------
-- List — (id, name, date_created, quantity, family_id)
-- ---------------------------------------------------------------------------
INSERT INTO List (id, name, date_created, quantity, family_id) VALUES
(1, 'Courses de la semaine', NOW() - INTERVAL '7 days',  12, 1),
(2, 'Barbecue du dimanche',  NOW() - INTERVAL '3 days',   8, 1),
(3, 'Courses du mois',       NOW() - INTERVAL '14 days', 25, 2),
(4, 'Soirée raclette',       NOW() - INTERVAL '2 days',  10, 2);
 
-- ---------------------------------------------------------------------------
-- Choice — (purchase_date, user_app_id, item_id) : 5 achats par utilisateur
-- ---------------------------------------------------------------------------
INSERT INTO Choice (purchase_date, user_app_id, item_id) VALUES
(NOW() - INTERVAL '1 day',  1, 1),  (NOW() - INTERVAL '3 days',  1, 10),
(NOW() - INTERVAL '5 days', 1, 15), (NOW() - INTERVAL '7 days',  1, 19),
(NOW() - INTERVAL '9 days', 1, 36),
 
(NOW() - INTERVAL '2 days', 2, 4),  (NOW() - INTERVAL '4 days',  2, 11),
(NOW() - INTERVAL '6 days', 2, 16), (NOW() - INTERVAL '8 days',  2, 24),
(NOW() - INTERVAL '10 days',2, 38),
 
(NOW() - INTERVAL '1 day',  3, 2),  (NOW() - INTERVAL '3 days',  3, 12),
(NOW() - INTERVAL '5 days', 3, 22), (NOW() - INTERVAL '7 days',  3, 28),
(NOW() - INTERVAL '9 days', 3, 31),
 
(NOW() - INTERVAL '2 days', 4, 5),  (NOW() - INTERVAL '4 days',  4, 13),
(NOW() - INTERVAL '6 days', 4, 20), (NOW() - INTERVAL '8 days',  4, 25),
(NOW() - INTERVAL '10 days',4, 37),
 
(NOW() - INTERVAL '1 day',  5, 3),  (NOW() - INTERVAL '3 days',  5, 14),
(NOW() - INTERVAL '5 days', 5, 21), (NOW() - INTERVAL '7 days',  5, 29),
(NOW() - INTERVAL '9 days', 5, 35),
 
(NOW() - INTERVAL '2 days', 6, 8),  (NOW() - INTERVAL '4 days',  6, 17),
(NOW() - INTERVAL '6 days', 6, 27), (NOW() - INTERVAL '8 days',  6, 41),
(NOW() - INTERVAL '10 days',6, 43);
 
-- ---------------------------------------------------------------------------
-- Invite — Lucas (user 6, sans famille) est invité dans les deux familles
-- ---------------------------------------------------------------------------
INSERT INTO Invite (id, date_created, family_id, user_app_id) VALUES
(1, NOW() - INTERVAL '5 days', 1, 6),
(2, NOW() - INTERVAL '5 days', 2, 6);
 
-- ---------------------------------------------------------------------------
-- Alert
-- ---------------------------------------------------------------------------
INSERT INTO Alert (id, message, user_app_id) VALUES
(1, 'Le budget du mois est presque atteint (85 %).',          1),
(2, 'Claire a ajouté 5 articles à "Courses de la semaine".',  2),
(3, 'Une nouvelle invitation a été envoyée à Lucas.',         4),
(4, 'Le prix de "Œufs plein air (x12)" a changé.',            5);
 
-- ---------------------------------------------------------------------------
-- Les ids ont été insérés à la main : on resynchronise les séquences SERIAL
-- pour que les prochains INSERT de ton app n'entrent pas en conflit.
-- ---------------------------------------------------------------------------
SELECT setval(pg_get_serial_sequence('family',   'id'), (SELECT MAX(id) FROM Family));
SELECT setval(pg_get_serial_sequence('user_app', 'id'), (SELECT MAX(id) FROM User_app));
SELECT setval(pg_get_serial_sequence('category', 'id'), (SELECT MAX(id) FROM Category));
SELECT setval(pg_get_serial_sequence('item',     'id'), (SELECT MAX(id) FROM Item));
SELECT setval(pg_get_serial_sequence('list',     'id'), (SELECT MAX(id) FROM List));
SELECT setval(pg_get_serial_sequence('invite',   'id'), (SELECT MAX(id) FROM Invite));
SELECT setval(pg_get_serial_sequence('alert',    'id'), (SELECT MAX(id) FROM Alert));
 
COMMIT;