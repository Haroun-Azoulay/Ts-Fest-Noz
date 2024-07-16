import { Request, Response, NextFunction } from 'express';


const isAdmin = (req: Request, res: Response, next: NextFunction) : void => {
  const role : string | undefined = req.role;

  console.log('req.role:', role);

  if (role && (role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden. You do not have the necessary permissions. You must be Admin' });
  }
};

export default isAdmin;
