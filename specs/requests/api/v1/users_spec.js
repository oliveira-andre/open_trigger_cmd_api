import request from 'supertest';
import faker from 'faker';

import app from '../../../../src/app.js';
import User from '../../../../src/app/models/User';

describe('POST /users', () => {
  const routePrefix = '/api/v1';

  describe('missing params', () => {
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

  describe('user already exist', () => {
    let response = '';
    const email = faker.internet.email();
    const password = faker.internet.password();

    beforeAll(async () => {
      await User.create({ email: email, password: password });
      response = await request(app)
        .post(`${routePrefix}/users`)
        .send({ email: email, password: password });
    });

    it('return error message', () => {
      expect(response.body.error).toBe('Email already taken');
    });

    it('return status 422', () => {
      expect(response.status).toBe(422);
    });
  });

  describe('valid email and password', () => {
    let response = '';
    const email = faker.internet.email();
    const password  = faker.internet.password();

    beforeAll(async () => {
      response = await request(app)
        .post(`${routePrefix}/users`)
        .send({ email: email, password: password });
    });

    it('return user id', () => {
      expect(response.body.id).not.toBeNull();
    });

    it('return status 201', () => {
      expect(response.status).toBe(201);
    });
  });
});
