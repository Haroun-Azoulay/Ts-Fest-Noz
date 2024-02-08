import { Request, Response, NextFunction } from 'express';
declare function verifyToken(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export default verifyToken;
//# sourceMappingURL=verifyToken.d.ts.map