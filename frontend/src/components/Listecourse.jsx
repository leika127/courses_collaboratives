import { useState, useEffect } from 'react'
import { useNavigate, useParams  } from 'react-router-dom'


const API_URL = "http://localhost:3000/api/"

function Listecourse() {
    const [course, setcourse] = useState([]);
    //Stock l'objet
    //"all" affiche tous les objets
    const [selectStatus, setSelectStatus] = useState("all")

    useEffect(() => {
        const recupCourses = async () => {
            try {
                const reponse = await fetch (API_URL)
                const result = await reponse.json()
                setcourse(result)
            } catch (error){
                console.log("❌ Aie, Aie erreur", error.message)
            }
        }
        recupCourses()
    }, [])
    courseFiltrees = course.filtrer((item) => {
        if (selectStatus === "achete") return item.achete;
    if (selectStatus === "a_acheter") return !item.achete;
    return true; // "all"
    });
}
export default Listecourse;

