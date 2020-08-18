import  * as Yup from 'yup';

class createSessionValidator { 
  async validParams(bodyParams) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    return (await schema.isValid(bodyParams));
  }
}

export default new createSessionValidator();
