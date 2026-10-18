import { useState } from 'react';

const RegisterForm = () => {
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <h1>Créer le compte de ma famille</h1>

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
