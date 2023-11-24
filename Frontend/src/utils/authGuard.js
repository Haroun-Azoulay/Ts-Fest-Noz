export function requireAuth(to, from, next) {
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if (!authToken) {
      // L'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      next({ path: '/' }); // Utilisez router.push pour effectuer la redirection
    } else {
      // L'utilisateur est authentifié, autorisez l'accès à la route
      next();
    }
  }