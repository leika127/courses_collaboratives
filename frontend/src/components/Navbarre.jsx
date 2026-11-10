import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

function NavBas() {
  const classe = ({ isActive }) => (isActive ? 'actif' : '')
  const { deconnecter } = useAuth()
  const navigate = useNavigate()

  const handleDeconnexion = async () => {
    await deconnecter()
    navigate('/connexion')
    return
  }

  return (
    <nav className="nav-bas" aria-label="Navigation principale">
      <NavLink to="/" end className={classe}>Accueil</NavLink>
      <NavLink to="/liste" className={classe}>Ma liste</NavLink>
      <NavLink to="/rayons" className={classe}>Rayons</NavLink>
      <button type="button" className="bouton-deconnexion" onClick={handleDeconnexion}>
        Déconnexion
      </button>
    </nav>
  )
}

export default NavBas