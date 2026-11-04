import * as itemModel from '../models/itemModel.js';

export const getAllItems = async () => {
  return await itemModel.findAllItems();
};