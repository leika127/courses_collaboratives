import express from 'express';
// import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.js';
import { gestionErreurs } from './middlewares/errors.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Ok, la connexion est établie !")
});

app.use('/api/auth', authRouter);

app.use(gestionErreurs);