import { Request, Response, NextFunction } from 'express';

const isAuthorizedPost = (req: Request, res: Response, next: NextFunction): void => {
  const role = req.role;

  console.log('req.role:', role);

  if (role && (role === 'admin' || role === 'artist' || role === 'organizer')) {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden. You do not have the necessary permissions' });
  }
};

export default isAuthorizedPost;
