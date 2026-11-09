import * as categorieModel from '../models/categorieModel.js';

export const getCategoriesWithItems = async () => {
  const lignes = await categorieModel.findCategoriesWithItems();
  const categories = [];

  for (const ligne of lignes) {
    let categorie = categories.find((c) => c.id === ligne.category_id);
    if (!categorie) {
      categorie = { id: ligne.category_id, name: ligne.category_name, items: [] };
      categories.push(categorie);
    }
    if (ligne.id) {
      categorie.items.push({ id: ligne.id, name: ligne.name });
    }
  }

  return categories;
};