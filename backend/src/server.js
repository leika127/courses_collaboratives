import express from 'express';
// import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
// import { readFileSync } from 'fs';
// import { categorieRouter } from './routes/categories.js';
import { listesRouter } from './routes/listes.js';


const app = express();
app.use(cors());
app.use('/api/listes', listesRouter);

app.get("/", (req, res) => {
    res.send("Ok, la connexion est établie !")
});

app.listen(3000, () => {
    console.log("Fonctionne sur le port 3000");
});
