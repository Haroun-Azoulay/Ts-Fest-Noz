import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// rajouter interface payload user mail mail etc 

//export interface UserRequest extends Request {
//    user?: UserAttributes
 // }

//export interface UserRequest extends Request {
//  user?: UserAttributes
// }
function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: "L'authentification est requise." });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "L'authentification est requise." });
    }

    jwt.verify(token, "RANDOM_SECRET_KEY", (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide." });
        }
        
        req.userId = decoded.userId 
        next();
    });
}

export default verifyToken;
