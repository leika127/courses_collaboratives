import express from 'express';
// import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
// import { readFileSync } from 'fs';
// import { categorieRouter } from './routes/categories.js';


const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Ok, la connexion est établie !")
});

app.listen(3000, () => {
    console.log("Fonctionne sur le port 3000");
});