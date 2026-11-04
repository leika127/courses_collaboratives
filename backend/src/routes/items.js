import express from 'express';
import * as itemController from '../controllers/itemController.js';

export const itemsRouter = express.Router();

itemsRouter.get('/', itemController.getItems);