import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

export const userRouter = Router();

userRouter.use(auth);

userRouter.get('/', userController.list);