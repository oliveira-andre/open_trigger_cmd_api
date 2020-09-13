import request from 'supertest';
import faker from 'faker';

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

    it('return error message', () => {
      expect(response.body.error).toBe('User not found');
    });

    it('return status code 422', () => {
      expect(response.status).toBe(422);
    });
  });

  describe('user exist', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    beforeAll(async () => {
      await User.create({
        email: email, password: password
      });
    });

    describe('invalid password', () => {
      let response = '';

      beforeAll(async () => {
        response = await request(app)
          .post(`${routePrefix}/sessions`)
          .send({ email: email, password: 'fake123' });
      });

      it('return status code 422', () => {
        expect(response.status).toBe(422);
      });

      it('return error message', () => {
        expect(response.body.error).toBe('Password does not match');
      });
    });

    describe('valid email and password', () => {
      let response = '';

      beforeAll(async () => {
        response = await request(app)
          .post(`${routePrefix}/sessions`)
          .send({ email: email, password: password });
      });

      it('return status code 201', () => {
        expect(response.status).toBe(201);
      });

      it('return valid jwt token', () => {
        expect(response.body.token).not.toBeNull();
      });
    });
  });
});
