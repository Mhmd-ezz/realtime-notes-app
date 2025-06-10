import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/realtime-notes-test');
});

afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  await mongoose.disconnect();
});

describe('Auth Routes', () => {
  it('should signup a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      name: 'Test User',
      email: 'signup@example.com',
      password: 'test1234',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe('signup@example.com');
  });

  it('should login the user and return a token cookie', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'signup@example.com',
      password: 'test1234',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.headers['set-cookie']).toBeDefined();
  });
});
