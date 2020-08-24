import {
  createTriggerValidator,
} from '../../../validators/api/v1/triggers';
import Trigger from '../../../models/Trigger';

class TriggersController {
  async index(req, res) {
    res.json({ ok: true });
  }

  async create(req, res) {
    const validateTrigger = await createTriggerValidator.validate(
      req.body, req.userId
    );

    if (!validateTrigger.valid) {
      return res.status(422).json({ error: validateTrigger.message });
    }

    const { name, voice, command } = req.body;
    const params = { name, voice, command, userId: req.userId };
    const { id } = await Trigger.create(params);

    res.status(201).json({ id, name, voice, command });
  }
}

export default new TriggersController();
