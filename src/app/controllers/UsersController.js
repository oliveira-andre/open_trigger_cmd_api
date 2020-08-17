import * as Yup from 'yup';

import User from '../models/User';

class UsersController {
  async create(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      password_confirmation: Yup.string().oneOf([Yup.ref('password')]),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(422).json({ error: 'Validation Fails' });
    }

    res.json({ ok: true });
  }
}

export default new UsersController();
