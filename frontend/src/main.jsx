import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ListeProvider } from './ListeContext';
import App from './App.jsx';
import './index.css';

// AuthProvider englobe ListeProvider : la liste a besoin de savoir qui est connecté
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListeProvider>
          <App />
        </ListeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
