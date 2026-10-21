import { useEffect, useState } from 'react';
import './App.css';
import { connexion } from './api/client';
import RegisterForm from './components/RegisterForm.jsx';

const App = () => {
  const [message, setMessage] = useState('');

  // Au démarrage : on vérifie que le frontend arrive à joindre le serveur
  useEffect(() => {
    const testConnexion = async () => {
      try {
        const resultat = await connexion();
        setMessage(resultat);
      } catch (error) {
        console.error(error);
        setMessage('Aïe, erreur de connexion server');
      }
      return;
    };
    testConnexion();
    return;
  }, []);

  return (
    <main>
      <h1>{message}</h1>
      <RegisterForm />
    </main>
  );
};

export default App;
