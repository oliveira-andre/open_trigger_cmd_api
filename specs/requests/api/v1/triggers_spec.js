import request from 'supertest';
import faker from 'faker';

import app from '../../../../src/app.js';
import User from '../../../../src/app/models/User';

describe('GET /triggers', () => {
  const routePrefix = '/api/v1';

  describe('without token', () => {
    let response = '';

    beforeAll(async () => {
      response = await request(app)
        .get(`${routePrefix}/triggers`);
    });

    it('return error message', () => {
      expect(response.body.error).toBe('Token not provided');
    });

    it('return status code 422', () => {
      expect(response.status).toBe(422);
    });
  });
});
