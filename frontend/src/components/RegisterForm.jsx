import { useState } from 'react';

const RegisterForm = () => {
  // 1. Les states : une valeur par champ
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // 2. Les fonctions : AVANT le return
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        familyName: familyName,
        firstName: firstName,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.status === 201) {
      setMessage(
        `Compte créé ! Bienvenue dans la famille ${data.family.name}.`,
      );
      setFamilyName('');
      setFirstName('');
      setEmail('');
      setPassword('');
    } else {
      setMessage(data.error || 'Erreur serveur');
    }
    return;
  };

  // 3. Le JSX : toujours en dernier
  return (
    <form onSubmit={handleSubmit}>
      <h1>Créer le compte de ma famille</h1>
      {message !== '' && <p role="status">{message}</p>}
      <label>
        Nom de la famille
        <input
          type="text"
          value={familyName}
          autoComplete="family-name"
          onChange={(event) => {
            return setFamilyName(event.target.value);
          }}
          required
        />
      </label>

      <label>
        Prénom
        <input
          type="text"
          value={firstName}
          autoComplete="given-name"
          onChange={(event) => {
            return setFirstName(event.target.value);
          }}
          required
        />
      </label>

      <label>
        Adresse email
        <input
          type="email"
          value={email}
          autoComplete="email"
          onChange={(event) => {
            return setEmail(event.target.value);
          }}
          required
        />
      </label>

      <label>
        Mot de passe
        <input
          type="password"
          value={password}
          autoComplete="new-password"
          onChange={(event) => {
            return setPassword(event.target.value);
          }}
          required
        />
      </label>

      <button type="submit">Créer le compte</button>
    </form>
  );
};

export default RegisterForm;
