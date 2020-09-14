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

  describe('have valid token', () => {
    let response = '';
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.lorem.slug();
    const command = faker.lorem.sentence();
    const voice = faker.lorem.words();

    beforeAll(async () => {
      const { id } = await User.create({
        email: email, password: password
      });

      await Trigger.create({
        name: name,
        command: command,
        voice: voice,
        userId: id
      });

      const session = await request(app)
        .post(`${routePrefix}/sessions`)
        .send({ email: email, password: password });

      response = await request(app)
        .get(`${routePrefix}/triggers`)
        .set('Authorization', `bearer ${session.body.token}`);
    });

    it('return status code 200', () => {
      expect(response.status).toBe(200);
    });

    it('return array with one trigger', () => {
      expect(response.body.length).toBe(1);
    });

    it('return the same name of trigger created', () => {
      expect(response.body[0].name).toBe(name);
    });
  });
});
