import * as Yup from 'yup';

import User from '../models/User';

class SessionsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(422).json({ error: 'Email ou/e Senha estão inválidos ou em branco' });
    };

    const { email, password } = req.body;
    const user = User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(422).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword())) {
      return res.status(422).json({ error: "Password doesn't match" });
    }

    return res.json({
      user: { email }
    });
  }
}

export default new SessionsController();
