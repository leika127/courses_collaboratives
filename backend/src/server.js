import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
// app.use(swaggerUi.serve, swaggerUi.setup());

app.get('/', (req, res) => {
  return res.send('Ok, la connexion est établie !');
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Impossible de démarrer le serveur : ${error.message}`);
    return;
  }
  console.log(`Fonctionne sur le port ${PORT}`);
  return;
});
