
const API_URL = "http://localhost:3000";

export const connexion = async () => {
    const response = await fetch(API_URL)
    if(!response.ok) {
        throw new Error("Il y a un problème de l'API")
    }
    return response.text()
}