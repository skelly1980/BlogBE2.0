import fs from 'fs/promises';
import request from 'supertest';
import { app } from '../app';

describe('App API tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('404 - not found', async () => {
    const response = await request(app).get('/api/invalid');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Not found' });
  });

  describe('/users', () => {
    it('get all users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([
        { email: 'bob@example.com', id: '1', name: 'Bob Example' },
        { email: 'd.duck@wb.com', id: '2', name: 'Daffy Duck' },
        { email: 'dirk@rush.com', id: '3', name: 'Geddy Lee' },
        { email: 'p.mccartney@beatles.com', id: '4', name: 'Paul McCartney' },
      ]);
    });

    it('get user', async () => {
      const response = await request(app).get('/api/users/3');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        email: 'dirk@rush.com',
        id: '3',
        name: 'Geddy Lee',
      });
    });

    it('get user - not found', async () => {
      const response = await request(app).get('/api/users/5');
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: 'No user found for id 5' });
    });

    it('get users - throws error', async () => {
      jest.spyOn(fs, 'readFile').mockImplementation(() => {
        throw new Error('Kaboom!');
      });
      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ message: 'Kaboom!' });
    });
  });
});
