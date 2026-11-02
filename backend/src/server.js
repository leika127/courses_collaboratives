// import express from 'express';
// import cors from 'cors';
import 'dotenv/config';
import { app } from './app.js'

if(!process.env.JWT_SECRET) {
    console.error("Il manque le JWT secret");
    process.exit(1);
}
app.listen(3000, () => {
    console.log("Fonctionne sur le port 3000");
});







// const app = express();
// app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Ok, la connexion est établie !")
// });
