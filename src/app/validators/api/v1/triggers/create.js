import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import Trigger from '../../../../models/Trigger';

class createTriggerValidator {
  async validate(bodyParams, userId) {
    const validParams = await this.validParams(bodyParams);
    if(!validParams) {
      return { valid: validParams, message: 'Invalid Params' };
    }

    const triggerExist = await this.triggerExist(bodyParams, userId);
    if(triggerExist) {
      return { valid: false, message: 'Name or Voice is already in use' }
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

  async triggerExist(bodyParams, userId) {
    const { name, voice } = bodyParams;
    const trigger = await this.fetchTrigger(name, voice, userId);

    return trigger;
  }

  async fetchTrigger(name, voice, userId) {
    return await this.fetchByName(name, userId) ||
      await this.fetchByVoice(voice, userId);
  }

  async fetchByName(name, userId) {
    const trigger = await Trigger.findOne({
      where: { name: name, userId: userId }
    });

    return trigger;
  }

  async fetchByVoice(voice, userId) {
    const trigger = await Trigger.findOne({
      where: { voice: voice, userId: userId }
    });

    return trigger;
  }
}

export default new createTriggerValidator();
