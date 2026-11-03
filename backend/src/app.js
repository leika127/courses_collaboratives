import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './routes/auth.routes.js';
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

app.use('/api/auth', authRouter);
// Et en tout dernier : app.use(errorHandler);
app.use(errorHandler); // Transforme TOUTES les erreurs en réponses HTTP, à un seul endroit
