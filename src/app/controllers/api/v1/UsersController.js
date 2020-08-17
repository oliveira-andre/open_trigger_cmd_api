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

    const { id, email } = await User.create(req.body);

    return res.status(201).json({ id, email });
  }
}

export default new UsersController();
