import { NavLink } from 'react-router-dom'

function NavBas() {
  const classe = ({ isActive }) => (isActive ? 'actif' : '')

  return (
    <nav className="nav-bas" aria-label="Navigation principale">
      <NavLink to="/" end className={classe}>Accueil</NavLink>
      <NavLink to="/liste" className={classe}>Ma liste</NavLink>
      <NavLink to="/rayons" className={classe}>Rayons</NavLink>
    </nav>
  )
}

export default NavBas