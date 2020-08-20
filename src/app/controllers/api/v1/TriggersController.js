import {
  createTriggerValidator,
} from '../../../validators/api/v1/triggers';

class TriggersController {
  async index(req, res) {
    res.json({ ok: true });
  }

  async create(req, res) {
    const validateTrigger = await createTriggerValidator.validate(req.body);

    if (!validateTrigger.valid) {
      return res.status(422).json({ error: validateTrigger.message });
    }

    res.json({ ok: true });
  }
}

export default new TriggersController();
