import fs from 'fs/promises';
import request from 'supertest';
import { app } from '../app';

describe('App views', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('404', async () => {
    const response = await request(app).get('/invalid');
    expect(response.statusCode).toBe(404);
    expect(response.text).toMatchSnapshot();
  });

  describe('home page', () => {
    test('view', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toMatchSnapshot();
    });
  });

  describe('users page', () => {
    test('view', async () => {
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(200);
      expect(response.text).toMatchSnapshot();
    });

    test('throws error', async () => {
      jest.spyOn(fs, 'readFile').mockImplementation(() => {
        throw new Error('Kaboom!');
      });
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(500);
      expect(response.text).toMatchSnapshot();
    });
  });
});
