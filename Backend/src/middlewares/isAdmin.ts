import { Request, Response, NextFunction } from 'express';


interface AuthenticatedRequest extends Request {
  user?: { role: string }; 
}


interface CustomResponse extends Response {
  user?: { role: string }; 
}


const isAdmin = (req: AuthenticatedRequest, res: CustomResponse, next: NextFunction): void => {
  const user = req.user;
  console.log('isAdmin middleware called');
  console.log('req.user:', req.user);
  console.log('res.user:', res.user);


  if (user && user.role === 'admin') {

    next();
  } else {

    res.status(403).json({ message: 'Accès interdit. Vous n\'avez pas les autorisations nécessaires.' });
  }
};

export default isAdmin;
