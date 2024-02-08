// Middleware pour vérifier le rôle d'administrateur
const isAdmin = (req, res, next) => {
    console.log('isAdmin middleware called');
    console.log('req.user:', req.user);
    console.log('res.user:', res.user);
    // Assurez-vous que l'utilisateur est connecté et a un rôle
    if (req.user && req.user.role === 'admin') {
        // L'utilisateur a un rôle d'administrateur, passez à la prochaine étape
        next();
    } else {
        // L'utilisateur n'est pas autorisé, renvoyez une réponse interdite (403)
        return res.status(403).json({ message: 'Accès interdit. Vous n\'avez pas les autorisations nécessaires.' });
    }
};

module.exports = isAdmin;