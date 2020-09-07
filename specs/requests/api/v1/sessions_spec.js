import request from 'supertest';

import app from '../../../../src/app.js';
import User from '../../../../src/app/models/User';

describe('POST /sessions', () => {
  const routePrefix = '/api/v1';

  describe('user not exists', () => {
    let response = ''

    beforeAll(async () => {
      response = await request(app)
        .post(`${routePrefix}/sessions`)
        .send({ email: 'root@safe.com', password: 'safe123' });
    });

    it('return error message', async () => {
      expect(response.body.error).toBe('User not found');
    });

    it('unprocessable entity status code', async () => {
      expect(response.status).toBe(422);
    });
  });

  describe('valid email and password', () => {
    const email = 'root@root.com'
    const password = 'root123'
    let response = '';

    beforeAll(async () => {
      await User.create({
        email: email, password: password
      });

      response = await request(app)
        .post(`${routePrefix}/sessions`)
        .send({ email: email, password: password });
    });

    it('return status code 201', async () => {
      expect(response.status).toBe(201);
    });

    it('return valid jwt token', async () => {
      expect(response.body.token).not.toBeNull();
    });
  });
});
