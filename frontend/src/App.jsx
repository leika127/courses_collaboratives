import { Routes, Route } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Accueil from './components/Accueil'
import ListeCourses from './components/Listecourse'
import Navbarre from "./components/Navbarre";
import Rayons from './components/Rayons'
import RayonDetail from './components/RayonDetail'
import RegisterForm from './components/RegisterForm'
import RouteProtegee from './components/RouteProtegee'
import Connexion from './pages/Connexion'

function App() {
  const { utilisateur } = useAuth()

  return (
    <div className="app">
      <main className="page">
        <Routes>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<RegisterForm />} />
          <Route path="/" element={<RouteProtegee><Accueil /></RouteProtegee>} />
          <Route path="/liste" element={<RouteProtegee><ListeCourses /></RouteProtegee>} />
          <Route path="/rayons" element={<RouteProtegee><Rayons /></RouteProtegee>} />
          <Route path="/rayons/:id" element={<RouteProtegee><RayonDetail /></RouteProtegee>} />
        </Routes>
      </main>
      {utilisateur && <Navbarre />}
    </div>
  )
}

export default App
