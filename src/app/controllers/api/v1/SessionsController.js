import 'dotenv/config';
import jwt from 'jsonwebtoken';

import User from '../../../models/User';
import {
  createSessionValidator,
} from '../../../validators/api/v1/sessions';

class SessionsController {
  async create(req, res) {
    const validateSession = await createSessionValidator.validate(req.body);

    if (!validateSession.valid) {
      return res.status(422).json({ error: validateSession.message });
    }

    const { email } = req.body;
    const { id } = await User.findOne({ where: { email: email } });

    return res.json({
      user: { email },
      token: jwt.sign({ id }, process.env.secret_jwt, {
        expiresIn: 60 * 60
      })
    });
  }

  async delete(req, res) {
    res.json({ok: true});
  }
}

export default new SessionsController();
