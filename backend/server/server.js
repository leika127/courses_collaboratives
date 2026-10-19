import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { readFileSync } from 'fs';
// import { categorieRouter } from './routes/categories.js';


const app = express();
app.use(cors());

app.get("/", async(req, res) => {
    res.send("Connexion etablie !")
});

app.listen(3000, () => {
    console.log("Fonctionne sur le port 3000");
});