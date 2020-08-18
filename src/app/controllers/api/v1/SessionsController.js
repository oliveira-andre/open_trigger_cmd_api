import env from 'dotenv/config';
import jwt from 'jsonwebtoken';

import {
  createSessionValidator,
} from '../../../validators/api/v1/sessions';

class SessionsController {
  async create(req, res) {
    const validateSession = createSessionValidator.validate(req.body);

    if (!validateSession.valid) {
      return res.status(422).json({ error: validateSession.message });
    }

    return res.json({
      user: { email },
      token: jwt.sign({ id }, env.SECRET_JWT, {
        expiresIn: 60 * 60
      })
    });
  }
}

export default new SessionsController();
