const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('./path-to-your-middleware'); // Adjust the path as needed
const httpMocks = require('node-mocks-http');

describe('authenticateJWT Middleware', () => {
    let req: Request, res: Response, next: NextFunction;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    it('should call next() if token is valid', () => {
        const user = { id: 1, name: 'Test User' };
        const token = jwt.sign(user, process.env.JWT_SECRET);
        req.headers.authorization = `Bearer ${token}`;

        jwt.verify = jest.fn((token, secret, callback) => {
            callback(null, user);
        });

        authenticateJWT(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET, expect.any(Function));
        expect(req.user).toEqual(user);
        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if token is invalid', () => {
        req.headers.authorization = 'Bearer invalidtoken';

        jwt.verify = jest.fn((token, secret, callback) => {
            callback(new Error('Invalid token'), null);
        });

        authenticateJWT(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('invalidtoken', process.env.JWT_SECRET, expect.any(Function));
        expect(res.statusCode).toBe(403);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if no token is provided', () => {
        authenticateJWT(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(next).not.toHaveBeenCalled();
    });
});