import {
  createUserValidator
} from '../../../validators/api/v1/users';
import User from '../../../models/User';

class UsersController {
  async create(req, res) {
    const validateUser = await createUserValidator.validate(req.body);

    if (!validateUser.valid) {
      return res.status(422).json({ error: validateUser.message });
    }

    return res.json({ ok: true });
  }
}

export default new UsersController();
