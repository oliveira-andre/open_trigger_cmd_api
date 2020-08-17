import * as Yup from 'yup';
import User from '../../../../models/User';

class createUserValidator {
  async validate(bodyParams) {
    const validParams = await this.validParams(bodyParams);
    if (!validParams) {
      return { valid: validParams, message: 'Invalid Params' };
    }

    const userExist = await this.userExist(bodyParams);
    if (userExist) {
      return { valid: !userExist, message: 'Email already taken' };
    }

    return { valid: true }
  }

  async validParams(bodyParams) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      password_confirmation: Yup.string().oneOf([Yup.ref('password')]),
    });

    return (await schema.isValid(bodyParams));
  }

  async userExist(bodyParams) {
    const { email } = bodyParams;
    const user = User.findOne({ where: { email: email } });

    return user;
  }
}

export default new createUserValidator();
