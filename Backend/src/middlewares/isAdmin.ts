import { Request, Response, NextFunction } from 'express';

// Définissez un type pour l'objet de demande avec la propriété user
interface AuthenticatedRequest extends Request {
  user?: { role: string }; // Ajoutez d'autres propriétés utilisateur si nécessaire
}

// Définissez un type pour l'objet de réponse
interface CustomResponse extends Response {
  user?: { role: string }; // Ajoutez d'autres propriétés utilisateur si nécessaire
}

// Middleware pour vérifier le rôle d'administrateur
const isAdmin = (req: AuthenticatedRequest, res: CustomResponse, next: NextFunction): void => {
  const user = req.user;
  console.log('isAdmin middleware called');
  console.log('req.user:', req.user);
  console.log('res.user:', res.user);

  // Assurez-vous que l'utilisateur est connecté et a un rôle
  if (user && user.role === 'admin') {
    // L'utilisateur a un rôle d'administrateur, passez à la prochaine étape
    next();
  } else {
    // L'utilisateur n'est pas autorisé, renvoyez une réponse interdite (403)
    res.status(403).json({ message: 'Accès interdit. Vous n\'avez pas les autorisations nécessaires.' });
  }
};

export default isAdmin;
