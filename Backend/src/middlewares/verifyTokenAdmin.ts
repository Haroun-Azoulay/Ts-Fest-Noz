import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/types";

const verifyTokenAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> | undefined => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Authentication is required" });
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication is required" });
  }
  jwt.verify(token, "RANDOM_SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const decodedToken = decoded as JwtPayload;
    req.userId = decodedToken.userId;
    req.role = decodedToken.role;
    if (req.role !== "admin") {
      return res.status(403).json({ message: "You are not Admin." });
    }
    next();
  });
};

export default verifyTokenAdmin;
