// 1. Les imports
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { categorieRouter } from './routes/categories.js';
import { registerRouter } from './routes/register.js';

// 2. Créer l'application
const app = express();

// 3. Choisir le port
const PORT = process.env.PORT || 3000;

// 4. Les middlewares
app.use(cors());
app.use(express.json());

// 5. Brancher les routes
app.use('/api/categories', categorieRouter);
app.use('/api/register', registerRouter);

// 6. Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
