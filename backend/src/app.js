import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './routes/auth.routes.js';
import { listesRouter } from './routes/listes.js';
import { itemsRouter } from './routes/items.js';
import { categoriesRouter } from './routes/categories.js';
import { userRouter } from './routes/user.routes.js';
// import swaggerUi from 'swagger-ui-express';

// app.js : CE QUE FAIT l'application (middlewares, routes)
// Il ne démarre PAS le serveur : c'est le rôle de server.js
export const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json()); // lit le corps JSON → req.body
app.use(cookieParser()); // lit les cookies → req.cookies
// app.use(swaggerUi.serve, swaggerUi.setup());

app.get('/', (req, res) => {
  return res.send('Ok, la connexion est établie !');
});

// Branchement des routeurs avec leurs préfixes
app.use('/api/auth', authRouter);
app.use('/api/listes', listesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/users', userRouter);

// Toujours en DERNIER : reçoit les erreurs de tout ce qui est au-dessus
app.use(errorHandler);
