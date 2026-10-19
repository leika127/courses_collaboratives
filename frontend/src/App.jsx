import { useEffect, useState } from 'react'
import './App.css'
import { connexion } from './api/client'


function App() {
const[message, setMessage] = useState("")

useEffect(() => {
  const testConnexion = async() =>{
    try {
      const resultat = await connexion()
      setMessage(resultat)
    } catch (error) {
      console.error(error)
      setMessage("Aîe, erreur de connexion server")
    }
  }
  testConnexion()
}, [])

return(
  <main>
    <h1>{message}</h1>
  </main>
)
}

export default App;
