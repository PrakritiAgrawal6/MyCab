const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express'

interface ReqWithUser extends Request{
    user?: any;
}

// Middleware to authenticate JWT tokens
export const authenticateJWT = (req: ReqWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        jwt.verify(token, process.env.JWT_SECRET, (err: Error | null, user: any) => {
            if (err) {
                return res.sendStatus(403); // Forbidden if token is invalid
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized if no token
    }
};