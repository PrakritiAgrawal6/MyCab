import request from 'supertest';
import { User } from '../../models/usermodels';
import app from '../../services/user.service';
import connectDB from '../../config/mongoose';

describe('Express App', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await User.deleteMany({ email: 'prakriti.agrawal@hcltech.com' });
  });

  describe('POST /register', () => {
    it('should save the user data', async () => {
      const userPayload = {
        email: 'prakriti.agrawal@hcltech.com',
        password: 'prakriti123',
        name: 'Prakriti Agrawal',
        phno: '9453618045',
        role: 'employee',
        rmsapid: '51422999',
        empsapid: '52297842'
      };

      const response = await request(app)
        .post('/register')
        .send(userPayload);

      expect(response.status).toBe(200);
      expect(response.text).toBe('User data saved!');
    });

    it('should return error if saving user data fails', async () => {
      jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
        throw new Error('Save failed');
      });

      const userPayload = {
        email: 'prakriti.agrawal@hcltech.com',
        password: 'prakriti123',
        name: 'Prakriti Agrawal',
        phno: '9453618045',
        role: 'employee',
        rmsapid: '51422999',
        empsapid: '52297842'
      };

      const response = await request(app)
        .post('/register')
        .send(userPayload);

      expect(response.status).toBe(500);
      expect(response.text).toBe('Something went wrong, try again!');
    });
  });

  describe('POST /login', () => {
    it('should login the user and return a token', async () => {
      const userPayload = {
        email: 'prakriti.agrawal@hcltech.com',
        password: 'prakriti123'
      };

      // Mock User.findOne to return a user
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(userPayload);

      const response = await request(app)
        .post('/login')
        .send(userPayload);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful!');
      expect(response.body.data).toHaveProperty('email', userPayload.email);
    });

    it('should return error if user is not found', async () => {
      const userPayload = {
        email: 'nonexistent@example.com',
        password: 'prakriti123'
      };

      // Mock User.findOne to return null
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

      const response = await request(app)
        .post('/login')
        .send(userPayload);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found.');
    });

    it('should return error if password is invalid', async () => {
      const userPayload = {
        email: 'prakriti.agrawal@hcltech.com',
        password: 'wrongpassword'
      };

      // Mock User.findOne to return a user with a different password
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        email: 'prakriti.agrawal@hcltech.com',
        password: 'prakriti123'
      });

      const response = await request(app)
        .post('/login')
        .send(userPayload);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials.');
    });

    it('should return error if there is a server error', async () => {
      const userPayload = {
        email: 'prakriti.agrawal@hcltech.com',
        password: 'prakriti123'
      };

      // Mock User.findOne to throw an error
      jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
        throw new Error('Server error');
      });

      const response = await request(app)
        .post('/login')
        .send(userPayload);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('GET /users', () => {
    it('should get user data', async () => {
      const userPayload = {
        email: 'prakriti.agrawal@hcltech.com',
        password: 'prakriti123',
        name: 'Prakriti Agrawal',
        phno: '9453618045',
        role: 'employee',
        rmsapid: '51422999',
        empsapid: '52297842'
      };

      // Mock User.find to return user data
      jest.spyOn(User, 'find').mockResolvedValueOnce([userPayload]);

      const response = await request(app)
        .get('/users')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual([userPayload]);
    });

    it('should return error if there is a server error', async () => {
      // Mock User.find to throw an error
      jest.spyOn(User, 'find').mockImplementationOnce(() => {
        throw new Error('Server error');
      });

      const response = await request(app)
        .get('/users')
        .send();

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });
});