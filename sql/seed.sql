-- 1. Les catégories
INSERT INTO category (name)
VALUES ('Fruits et légumes'),
  ('Boucherie et volaille'),
  ('Charcuterie traiteur'),
  ('Poissonnerie'),
  ('Crèmerie et oeufs'),
  ('Fromagerie'),
  ('Boulangerie - pâtisserie'),
  ('Produits surgelés'),
  ('Épicerie'),
  ('Petit déjeuner'),
  ('Boissons'),
  ('Produits bio'),
  ('Confiserie'),
  ('Produits pour les enfants et bébés'),
  ('Produits de beauté'),
  ('Produits d''hygiène et de soins'),
  ('Produits d''entretien'),
  ('Produits pour animaux'),
  ('Maison et divers'),
  ('Autre');

-- 2. La famille
INSERT INTO Family (name, date_created) 
VALUES ('Famille Test', NOW());

-- 3. L'utilisateur rattaché à la famille
INSERT INTO User_app (name, email, password_hash, role, date_created, family_id)
VALUES ('Camille', 'camille@test.fr', 'hash', 'Organisateur', NOW(), 1);

-- 4. Un catalogue riche avec plein d'articles par catégorie
INSERT INTO Item (name, category_id) VALUES 
  -- 1. Fruits et légumes
  ('Pommes', 1), ('Bananes', 1), ('Tomates', 1), ('Salade', 1), ('Carottes', 1), ('Courgettes', 1), ('Oignons', 1), ('Avocats', 1),
  -- 2. Boucherie et volaille
  ('Steak haché', 2), ('Blancs de poulet', 2), ('Côtes de porc', 2), ('Steaks de bœuf', 2), ('Escalopes de dinde', 2),
  -- 3. Charcuterie traiteur
  ('Jambon blanc', 3), ('Jambon cru', 3), ('Saucisson sec', 3), ('Lardons', 3), ('Pâté de campagne', 3),
  -- 4. Poissonnerie
  ('Filet de saumon', 4), ('Pavés de cabillaud', 4), ('Crevettes', 4), ('Thon en boîte', 4),
  -- 5. Crèmerie et oeufs
  ('Lait demi-écrémé', 5), ('Œufs x12', 5), ('Beurre doux', 5), ('Crème fraîche', 5), ('yaourt nature', 5),
  -- 6. Fromagerie
  ('Comté', 6), ('Emmental râpé', 6), ('Camembert', 6), ('Mozzarella', 6), ('Chèvre frais', 6),
  -- 7. Boulangerie - pâtisserie
  ('Baguette de tradition', 7), ('Pain de mie', 7), ('Croissants', 7), ('Pain aux céréales', 7),
  -- 8. Produits surgelés
  ('Steaks végétaux surgelés', 8), ('Frites surgelées', 8), ('Haricots verts surgelés', 8), ('Pizza 4 fromages surgelée', 8),
  -- 9. Épicerie
  ('Pâtes penne', 9), ('Riz basmati', 9), ('Purée de tomates', 9), ('Huile d''olive', 9), ('Sel et poivre', 9), ('Farine de blé', 9),
  -- 10. Petit déjeuner
  ('Café moulu', 10), ('Thé vert', 10), ('Céréales chocos', 10), ('Confiture de fraise', 10), ('Pâte à tartiner', 10),
  -- 11. Boissons
  ('Jus d''orange', 11), ('Eau plate 1.5L', 11), ('Coca-Cola', 11), ('Soda citron', 11), ('Vin rouge', 11),
  -- 12. Produits bio
  ('Quinoa bio', 12), ('Lentilles corail bio', 12), ('Galettes de riz bio', 12), ('Sirop d''agave bio', 12),
  -- 13. Confiserie
  ('Chocolat noir', 13), ('Bonbons gélifiés', 13), ('Biscuits sablés', 13), ('Barres de céréales', 13),
  -- 14. Produits pour les enfants et bébés
  ('Petits pots carotte', 14), ('Couches taille 4', 14), ('Lingettes bébé', 14), ('Lait 2ème âge', 14),
  -- 15. Produits de beauté
  ('Crème hydratante', 15), ('Shampooing doux', 15), ('Gel douche', 15), ('Savon mains', 15),
  -- 16. Produits d''hygiène et de soins
  ('Dentifrice', 16), ('Papier toilette', 16), ('Cotons-tiges', 16), ('Déodorant', 16),
  -- 17. Produits d''entretien
  ('Liquide vaisselle', 17), ('Lessive liquide', 17), ('Éponges', 17), ('Nettoyant sols', 17), ('Papier essuie-tout', 17),
  -- 18. Produits pour animaux
  ('Croquettes chat', 18), ('Pâtée pour chien', 18), ('Litière chat', 18),
  -- 19. Maison et divers
  ('Ampoule LED', 19), ('Sacs poubelle 30L', 19), ('Film étirable', 19), ('Piles AA', 19),
  -- 20. Autre
  ('Bougie parfumée', 20), ('Allumettes', 20), ('Scotch', 20);

-- 5. La liste de courses principale
INSERT INTO List (name, date_created, family_id)
VALUES ('Courses de la semaine', NOW(), 1);

-- 6. Association d'une belle sélection d'articles à la liste de courses
INSERT INTO List_item (list_id, item_id, quantity, is_checked)
VALUES 
  (1, 1, 6, false),  -- Pommes
  (1, 2, 5, false),  -- Bananes
  (1, 3, 4, false),  -- Tomates
  (1, 4, 1, false),  -- Salade
  (1, 9, 2, false),  -- Steak haché
  (1, 10, 2, false), -- Blancs de poulet
  (1, 14, 1, false), -- Jambon blanc
  (1, 19, 2, false), -- Filet de saumon
  (1, 23, 2, false), -- Lait demi-écrémé
  (1, 24, 1, false), -- Œufs x12
  (1, 25, 1, false), -- Beurre doux
  (1, 28, 1, true),  -- Comté (déjà pris)
  (1, 33, 2, false), -- Baguette de tradition
  (1, 35, 1, false), -- Frites surgelées
  (1, 39, 3, false), -- Pâtes penne
  (1, 40, 2, false), -- Riz basmati
  (1, 43, 1, false), -- Huile d'olive
  (1, 45, 1, false), -- Café moulu
  (1, 50, 2, false), -- Jus d'orange
  (1, 51, 4, false), -- Eau plate 1.5L
  (1, 59, 1, true),  -- Chocolat noir (déjà pris)
  (1, 67, 1, false), -- Shampooing doux
  (1, 71, 2, false), -- Dentifrice
  (1, 72, 1, false), -- Papier toilette
  (1, 76, 1, true),  -- Liquide vaisselle (déjà pris)
  (1, 77, 1, false), -- Lessive liquide
  (1, 79, 1, false), -- Nettoyant sols
  (1, 82, 1, false), -- Croquettes chat
  (1, 85, 1, false), -- Sacs poubelle 30L
  (1, 87, 1, false); -- Piles AA