import { Routes, Route } from 'react-router-dom'
import Accueil from './components/Accueil'
import ListeCourses from './components/Listecourse'
import Navbarre from "./components/Navbarre";
import Rayons from './components/Rayons'
import RayonDetail from './components/RayonDetail'

function App() {
  return (
    <div className="app">
      <main className="page">
        <Routes>
          <Route path="/" element={<Accueil prenom="Camille" />} />
          <Route path="/liste" element={<ListeCourses />} />
          <Route path="/rayons" element={<Rayons />} />
          <Route path="/rayons/:id" element={<RayonDetail />} />
        </Routes>
      </main>
      <Navbarre />
    </div>
  )
}

export default App
