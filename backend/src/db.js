import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Si PostgreSQL coupe une connexion inactive (redémarrage de Docker…),
// on l'affiche au lieu de laisser le serveur Node s'arrêter
pool.on('error', (error) => {
  console.error(`Connexion PostgreSQL perdue : ${error.message}`);
  return;
});
