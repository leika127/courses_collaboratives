import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.js';
import { listesRouter } from './routes/listes.js';
import { itemsRouter } from './routes/items.js';
import { gestionErreurs } from './middlewares/errors.js';

export const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Ok, la connexion est établie !');
});

// Branchement des différents routeurs avec leurs préfixes respectifs
app.use('/api/auth', authRouter);
app.use('/api/listes', listesRouter);
app.use('/api/items', itemsRouter);

app.use(gestionErreurs);
