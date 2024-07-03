import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/types';  

declare module 'express' {
  export interface Request {
    userId?: string;
    role?: string;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "L'authentification est requise." });
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "L'authentification est requise." });
  }

  jwt.verify(token, "RANDOM_SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide." });
    }
    
    const decodedToken = decoded as JwtPayload;
    req.userId = decodedToken.userId;
    req.role = decodedToken.role;
    
    next();
  });
};

export default verifyToken;
