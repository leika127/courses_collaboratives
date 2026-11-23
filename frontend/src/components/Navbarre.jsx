import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

// Petites icônes en SVG (elles prennent la couleur du texte)
const Icone = ({ children }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

function NavBas() {
  const classe = ({ isActive }) => (isActive ? 'actif' : '')
  const { deconnecter } = useAuth()
  const navigate = useNavigate()

  const handleDeconnexion = async () => {
    await deconnecter()
    navigate('/connexion')
  }

  return (
    <nav className="nav-bas" aria-label="Navigation principale">
      <NavLink to="/" end className={classe}>
        <Icone><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></Icone>
        <span>Accueil</span>
      </NavLink>
      <NavLink to="/liste" className={classe}>
        <Icone><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></Icone>
        <span>Ma liste</span>
      </NavLink>
      <NavLink to="/rayons" className={classe}>
        <Icone><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></Icone>
        <span>Rayons</span>
      </NavLink>
      <button type="button" className="bouton-deconnexion" onClick={handleDeconnexion}>
        <Icone><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Icone>
        <span>Sortir</span>
      </button>
    </nav>
  )
}

export default NavBas
