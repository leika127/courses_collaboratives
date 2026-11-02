import * as itemService from '../services/itemService.js';

export const getItems = async (req, res, next) => {
  try {
    const items = await itemService.getAllItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
};