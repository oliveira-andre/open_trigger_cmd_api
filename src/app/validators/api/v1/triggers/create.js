import * as Yup from 'yup';

class createTriggerValidator {
  async validate(bodyParams) {
    const validParams = await this.validParams(bodyParams);
    if(!validParams) {
      return { valid: validParams, message: 'Invalid Params' };
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
}

export default new createTriggerValidator();