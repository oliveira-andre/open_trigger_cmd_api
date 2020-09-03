import {
  createTriggerValidator,
  updateTriggerValidator,
  deleteTriggerValidator,
} from '../../../validators/api/v1/triggers';
import Trigger from '../../../models/Trigger';

class TriggersController {
  async index(req, res) {
    const users = await Trigger.findAll({ where: { userId: req.userId } });

    res.json(users);
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

  async update(req, res) {
    const validateTrigger = await updateTriggerValidator.validate(
      req.body, req.userId, req.params.id
    );

    if (!validateTrigger.valid) {
      return res.status(422).json({ error: validateTrigger.message });
    }

    await Trigger.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    res.status(202).json(req.body);
  }

  async delete(req, res) {
    const validateTrigger = await deleteTriggerValidator.validate(
      req.userId, req.params.id
    );

    if(!validateTrigger.valid) {
      return res.status(422).json({ error: validateTrigger.message });
    }

    return res.json({ ok: true });
  }
}

export default new TriggersController();
