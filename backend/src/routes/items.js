import express from 'express';
import * as itemController from '../controllers/itemController.js';

const router = express.Router();

router.get('/items', itemController.getItems);

export default router;