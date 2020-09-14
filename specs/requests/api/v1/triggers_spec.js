import request from 'supertest';
import faker from 'faker';

import app from '../../../../src/app.js';
import User from '../../../../src/app/models/User';
import Trigger from '../../../../src/app/models/Trigger';

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

  describe('token invalid or expired', () => {
    let response = '';

    beforeAll(async () => {
      response = await request(app)
        .get(`${routePrefix}/triggers`)
        .set('Authorization', 'bearer anytoken');
    });

    it('return error message', () => {
      expect(response.body.error).toBe('Token invalid');
    });

    it('return status code 422', () => {
      expect(response.status).toBe(401);
    });
  });
});
