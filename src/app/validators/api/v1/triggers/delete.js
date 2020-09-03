import Trigger from '../../../../models/Trigger';

class deleteTriggerValidator {
  async validate(userId, triggerId) {
    const triggerExist = await this.triggerExist(userId, triggerId);
    if(!triggerExist) {
      return { valid: false, message: 'Trigger not found' };
    }

    return { valid: true };
  }

  async triggerExist(userId, triggerId) {
    const trigger =  await Trigger.findOne({ where: {
      id: triggerId,
      userId: userId
    }});

    return trigger;
  }
}

export default new deleteTriggerValidator();
