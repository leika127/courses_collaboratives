-- 1. Les catégories
INSERT INTO Category (name)
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
INSERT INTO Family (name)
VALUES ('Famille Test');

-- 3. L'utilisateur rattaché à la famille
INSERT INTO User_app (name, email, password_hash, role, family_id)
VALUES ('Camille', 'camille@test.fr', 'hash', 'organizer', 1);

-- 4. Le catalogue : des articles par catégorie
INSERT INTO Item (name, category_id) VALUES
  -- 1. Fruits et légumes
  ('Pommes', 1), ('Bananes', 1), ('Tomates', 1), ('Salade', 1),
  ('Carottes', 1), ('Courgettes', 1), ('Oignons', 1), ('Avocats', 1),
  -- 2. Boucherie et volaille
  ('Steak haché', 2), ('Blancs de poulet', 2), ('Côtes de porc', 2),
  ('Steaks de bœuf', 2), ('Escalopes de dinde', 2),
  -- 3. Charcuterie traiteur
  ('Jambon blanc', 3), ('Jambon cru', 3), ('Saucisson sec', 3),
  ('Lardons', 3), ('Pâté de campagne', 3),
  -- 4. Poissonnerie
  ('Filet de saumon', 4), ('Pavés de cabillaud', 4), ('Crevettes', 4), ('Thon en boîte', 4),
  -- 5. Crèmerie et oeufs
  ('Lait demi-écrémé', 5), ('Œufs x12', 5), ('Beurre doux', 5),
  ('Crème fraîche', 5), ('Yaourt nature', 5),
  -- 6. Fromagerie
  ('Comté', 6), ('Emmental râpé', 6), ('Camembert', 6), ('Mozzarella', 6), ('Chèvre frais', 6),
  -- 7. Boulangerie - pâtisserie
  ('Baguette de tradition', 7), ('Pain de mie', 7), ('Croissants', 7), ('Pain aux céréales', 7),
  -- 8. Produits surgelés
  ('Steaks végétaux surgelés', 8), ('Frites surgelées', 8),
  ('Haricots verts surgelés', 8), ('Pizza 4 fromages surgelée', 8),
  -- 9. Épicerie
  ('Pâtes penne', 9), ('Riz basmati', 9), ('Purée de tomates', 9),
  ('Huile d''olive', 9), ('Sel et poivre', 9), ('Farine de blé', 9),
  -- 10. Petit déjeuner
  ('Café moulu', 10), ('Thé vert', 10), ('Céréales chocos', 10),
  ('Confiture de fraise', 10), ('Pâte à tartiner', 10),
  -- 11. Boissons
  ('Jus d''orange', 11), ('Eau plate 1.5L', 11), ('Coca-Cola', 11),
  ('Soda citron', 11), ('Vin rouge', 11),
  -- 12. Produits bio
  ('Quinoa bio', 12), ('Lentilles corail bio', 12),
  ('Galettes de riz bio', 12), ('Sirop d''agave bio', 12),
  -- 13. Confiserie
  ('Chocolat noir', 13), ('Bonbons gélifiés', 13),
  ('Biscuits sablés', 13), ('Barres de céréales', 13),
  -- 14. Produits pour les enfants et bébés
  ('Petits pots carotte', 14), ('Couches taille 4', 14),
  ('Lingettes bébé', 14), ('Lait 2ème âge', 14),
  -- 15. Produits de beauté
  ('Crème hydratante', 15), ('Shampooing doux', 15),
  ('Gel douche', 15), ('Savon mains', 15),
  -- 16. Produits d'hygiène et de soins
  ('Dentifrice', 16), ('Papier toilette', 16),
  ('Cotons-tiges', 16), ('Déodorant', 16),
  -- 17. Produits d'entretien
  ('Liquide vaisselle', 17), ('Lessive liquide', 17), ('Éponges', 17),
  ('Nettoyant sols', 17), ('Papier essuie-tout', 17),
  -- 18. Produits pour animaux
  ('Croquettes chat', 18), ('Pâtée pour chien', 18), ('Litière chat', 18),
  -- 19. Maison et divers
  ('Ampoule LED', 19), ('Sacs poubelle 30L', 19),
  ('Film étirable', 19), ('Piles AA', 19),
  -- 20. Autre
  ('Bougie parfumée', 20), ('Allumettes', 20), ('Scotch', 20);

-- 5. La liste de courses principale
INSERT INTO List (name, family_id)
VALUES ('Courses de la semaine', 1);

-- 6. Les articles de la liste (reliés par leur NOM, pas par leur numéro)
INSERT INTO List_item (list_id, item_id, quantity, is_checked)
SELECT 1, i.id, v.quantity, v.is_checked
FROM (VALUES
  ('Pommes', 6, false),
  ('Bananes', 5, false),
  ('Tomates', 4, false),
  ('Salade', 1, false),
  ('Steak haché', 2, false),
  ('Blancs de poulet', 2, false),
  ('Jambon blanc', 1, false),
  ('Filet de saumon', 2, false),
  ('Lait demi-écrémé', 2, false),
  ('Œufs x12', 1, false),
  ('Beurre doux', 1, false),
  ('Comté', 1, true),
  ('Baguette de tradition', 2, false),
  ('Frites surgelées', 1, false),
  ('Pâtes penne', 3, false),
  ('Riz basmati', 2, false),
  ('Huile d''olive', 1, false),
  ('Café moulu', 1, false),
  ('Jus d''orange', 2, false),
  ('Eau plate 1.5L', 4, false),
  ('Chocolat noir', 1, true),
  ('Shampooing doux', 1, false),
  ('Dentifrice', 2, false),
  ('Papier toilette', 1, false),
  ('Liquide vaisselle', 1, true),
  ('Lessive liquide', 1, false),
  ('Nettoyant sols', 1, false),
  ('Croquettes chat', 1, false),
  ('Sacs poubelle 30L', 1, false),
  ('Piles AA', 1, false)
) AS v(name, quantity, is_checked)
JOIN Item i ON i.name = v.name;