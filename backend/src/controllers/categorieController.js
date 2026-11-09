import * as categorieService from '../services/categorieService.js';

export const getCategories = async (req, res, next) => {
  try {
    res.json(await categorieService.getCategoriesWithItems());
  } catch (error) {
    next(error);
  }
};