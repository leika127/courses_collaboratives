// Bandeau d'accueil affiché au-dessus des pages Connexion et Inscription
function EnteteAuth() {
  return (
    <header className="auth-hero">
      <span className="auth-logo" aria-hidden="true">🛒</span>
      <p className="auth-marque">Courses collaboratives</p>
      <p className="auth-accroche">Une seule liste pour toute la famille.</p>
    </header>
  )
}

export default EnteteAuth
