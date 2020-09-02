import * as Yup from 'yup';

import Trigger from '../../../../models/Trigger';

class updateTriggerValidator {
  async validate(bodyParams, userId, triggerId) {
    const validParams = await this.validParams(bodyParams);
    if(!validParams) {
      return { valid: validParams, message: 'Invalid Params' };
    }

    const triggerExist = await this.triggerExist(userId, triggerId);
    if(!triggerExist) {
      return { valid: false, message: 'Trigger not found' };
    }

    return { valid: true };
  }

  async validParams(bodyParams) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      command: Yup.string().required(),
      voice: Yup.string().required(),
    });

    return (await schema.isValid(bodyParams));
  }

  async triggerExist(userId, triggerId) {
    const trigger =  await Trigger.findOne({ where: {
      id: triggerId,
      userId: userId
    }});

    return trigger;
  }
}

export default new updateTriggerValidator();
