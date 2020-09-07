import request from 'supertest';

import app from '../../../../src/app.js';
import User from '../../../../src/app/models/User';

describe('POST /sessions', () => {
  describe('valid email and password', () => {
    it('should return jwt valid token', async () => {
      const { email } = await User.create({
        email: 'root@root.com', password: 'root123'
      });

      const response = await request(app)
        .post('/api/v1/sessions')
        .send({ email, password: 'root123' });

      expect(response.status).toBe(200);
    });
  });
});
