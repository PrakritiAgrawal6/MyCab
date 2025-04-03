import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../jwt/jwt';
const httpMocks = require('node-mocks-http');

describe('JWT Token Functions', () => {
    let req: Request, res: Response, next: NextFunction;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    describe('generateToken', () => {
        it('should generate a token for a given user', async () => {
            const user = { email: 'test@example.com', password: 'password123' };
            const token = await jwtToken.generateToken(user);
            const JWT_SECRET = "prakriti767%m"

            expect(token).toBeDefined();
            const decoded = jwt.verify(token, JWT_SECRET);
            expect(decoded).toHaveProperty('email', user.email);
        });
    });

    describe('verifyToken', () => {
        it('should call next() if token is valid', async () => {
            const user = { email: 'test@example.com', password: 'password123' };
            const JWT_SECRET = "prakriti767%m"
            const token = jwt.sign({ email: user.email }, JWT_SECRET);
            req.headers.authorization = `Bearer ${token}`;

            jwt.verify = jest.fn((token, secret, callback) => {
                callback(null, { email: user.email });
            });

            await jwtToken.verifyToken(req, res, next);

            expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET, expect.any(Function));
            expect(next).toHaveBeenCalled();
        });

        it('should return 401 if no token is provided', async () => {
            await jwtToken.verifyToken(req, res, next);

            expect(res.statusCode).toBe(401);
            expect(res._getData()).toBe('Access denied');
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 400 if token is invalid', async () => {
            req.headers.authorization = 'Bearer invalidtoken';

            jwt.verify = jest.fn((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });

            await jwtToken.verifyToken(req, res, next);

            expect(jwt.verify).toHaveBeenCalledWith('invalidtoken', process.env.JWT_SECRET, expect.any(Function));
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toBe('Invalid token.');
            expect(next).not.toHaveBeenCalled();
        });
    });
});