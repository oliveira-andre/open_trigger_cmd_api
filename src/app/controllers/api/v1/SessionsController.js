import env from 'dotenv/config';
import jwt from 'jsonwebtoken';

import User from '../../../models/User';

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(422).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword())) {
      return res.status(422).json({ error: "Password doesn't match" });
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
