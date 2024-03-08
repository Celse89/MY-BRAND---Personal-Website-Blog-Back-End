import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../server.js';
import { User } from '../models/userModel.js';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPassword')),
  compare: jest.fn(),
}));

jest.mock('../models/userModel.js');

const BCRYPT_SALT_ROUNDS = 10

describe('POST /signup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('signup - creates a new user', async () => {
    User.findOne.mockResolvedValue(null);
    User.prototype.save.mockResolvedValue();

    const response = await request(app)
      .post('/signup')
      .send({
        username: 'test',
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Signed up successfully');
    expect(response.body.token).toBeTruthy();
  });

  test('signup - user already exists', async () => {
    User.findOne.mockResolvedValue({});

    const response = await request(app)
      .post('/signup')
      .send({ username: 'test', email: 'test@test.com', password: 'password123', confirmPassword: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  test('signup - invalid input data', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ username: '', email: 'invalid email', password: '12' });
  
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('\"username\" is not allowed to be empty');
  });
  
  test('signup - password and confirmPassword do not match', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ username: 'test', email: 'test@test.com', password: 'password123', confirmPassword: 'password124' });
  
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("\"Confirm password\" does not match");
  });

  
  
  test('signup - password is hashed', async () => {
    User.findOne.mockResolvedValue(null);
    const mockUser = new User();
    mockUser.password = 'hashedPassword';
    User.prototype.save.mockResolvedValue(mockUser);
  
    const password = 'password123';
    await request(app)
      .post('/signup')
      .send({
        username: 'test',
        email: 'test@test.com',
        password,
        confirmPassword: password
      });
  
    expect(bcrypt.hash).toHaveBeenCalledWith(password, BCRYPT_SALT_ROUNDS);
    expect(mockUser.password).toBe('hashedPassword');
  });
});

describe('POST /login', () => {
  test('login - successful login', async () => {
    const mockUser = new User();
    mockUser.email = 'test@test.com';
    mockUser.password = 'hashedPassword';
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in successfully');
    expect(response.body.token).toBeTruthy();
  });

  test('login - user not found', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  test('login - invalid credentials', async () => {
    const mockUser = new User();
    mockUser.email = 'test@test.com';
    mockUser.password = 'hashedPassword';
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'wrongPassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});


describe('GET /api/users', () => {
  test('getAllUsers - returns all users', async () => {
    const mockUsers = [
      new User({ username: 'test1', email: 'test1@test.com', password: 'password123' }),
      new User({ username: 'test2', email: 'test2@test.com', password: 'password123' }),
    ];
    User.find.mockResolvedValue(mockUsers);

    const mockUser = new User();
    mockUser.email = 'test@test.com';
    mockUser.password = 'hashedPassword';
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].username).toBe('test1');
    expect(response.body[1].username).toBe('test2');
  });
});