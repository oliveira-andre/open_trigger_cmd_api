import  * as Yup from 'yup';

import User from '../../../models/User';

class createSessionValidator { 
  async validate(bodyParams) {
    const validParams = await this.validParams(bodyParams);
    if(!validParams) {
      return { valid: validParams, message: 'Invalid Params' };
    }

    const userExist = await this.userExist(bodyParams);
    if(!userExist) {
      return { valid: false, message: 'User not found' };
    }

    const validPassword = await this.validPassword(userExist, bodyParams);
    if(!validPassword) {
      return { valid: false, message: 'Password does not match' }
    }

    return { valid: true }
  }

  async validParams(bodyParams) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    return (await schema.isValid(bodyParams));
  }

  async userExist(validParams) {
    const { email } = validParams;
    const user = User.findOne({ where: { email: email } });

    return user;
  }

  async validPassword(user, bodyParams) {
    const { password } = bodyParams;

    return await user.checkPassword(password);
  }
}

export default new createSessionValidator();
