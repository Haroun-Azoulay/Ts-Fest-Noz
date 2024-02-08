"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// rajouter interface payload user mail mail etc 
//export interface UserRequest extends Request {
//    user?: UserAttributes
// }
//export interface UserRequest extends Request {
//  user?: UserAttributes
// }
function verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: "L'authentification est requise." });
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "L'authentification est requise." });
    }
    // Vérifiez le jeton ici en utilisant la bibliothèque jwt.verify
    jsonwebtoken_1.default.verify(token, "RANDOM_SECRET_KEY", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide." });
        }
        req.userId = decoded.userId;
        next();
    });
}
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map