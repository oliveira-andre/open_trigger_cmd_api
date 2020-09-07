import request from 'supertest';

import app from '../../../../src/app.js';
import User from '../../../../src/app/models/User';

describe('POST /sessions', () => {
  const routePrefix = '/api/v1';

  describe('valid email and password', () => {
    const email = 'root@root.com'
    const password = 'root123'

    beforeAll(async () => {
      await User.create({
        email: email, password: password
      });
    });

    it('return status code 201', async () => {
      const response = await request(app)
        .post(`${routePrefix}/sessions`)
        .send({ email: email, password: password });

      expect(response.status).toBe(201);
    });

    it('return valid jwt token', async () => {
      const response = await request(app)
        .post(`${routePrefix}/sessions`)
        .send({ email: email, password: password });

      expect(response.body.token).not.toBeNull();
    });
  });
});
