import express from 'express';
import * as categorieController from '../controllers/categorieController.js';

export const categoriesRouter = express.Router();

categoriesRouter.get('/', categorieController.getCategories);