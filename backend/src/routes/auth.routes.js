import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';

// Toutes les routes de l'authentification
// Elles sont "montées" sur /api/auth dans app.js
export const authRouter = Router();

authRouter.post('/register', authController.register);
