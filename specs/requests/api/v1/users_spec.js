import request from 'supertest';

import app from '../../../../src/app.js';
import User from '../../../../src/app/models/User';

describe('POST /users', () => {
  const routePrefix = '/api/v1';

  describe('invalid params', () => {
    let response = '';

    beforeAll(async () => {
      response = await request(app)
        .post(`${routePrefix}/users`);
    });

    it('return error message', () => {
      expect(response.body.error).toBe('Invalid Params');
    });

    it('return status code 422', () => {
      expect(response.status).toBe(422);
    });
  });
});
