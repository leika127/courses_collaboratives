import 'dotenv/config';
import { app } from './app.js';

// server.js : DÉMARRE l'application définie dans app.js

// Sans clé secrète, impossible de signer les tokens : on refuse de démarrer
if (!process.env.JWT_SECRET) {
  console.error(
    'JWT_SECRET manquant : copie .env.exemple en .env et remplis-le',
  );
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Impossible de démarrer le serveur : ${error.message}`);
    return;
  }
  console.log(`Fonctionne sur le port ${PORT}`);
  return;
});
