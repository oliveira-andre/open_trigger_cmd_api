import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as yup from 'yup';
import 'dotenv/config';

export default async (req, res, next) => {
  const token = await fetchAndValidateToken(req, res);

  try {
    const idObject = await promisify(jwt.verify)(token, process.env.secret_jwt);
    await validatePayload(res, idObject);
    req.userId = idObject.id;

    return next();
  } catch(e) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}

const validatePayload = async (res, idObject) => {
  const schema = yup.object().shape({
    id: yup.number().positive().integer().required(),
  });


    if (!(await schema.isValid(idObject))) {
      return res.status(422).json({ error: 'Token invalid' });
    }
}

const fetchAndValidateToken = async (req, res) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(422).json({ error: 'Token not provided' });
  }

  return (await fetchToken(bearerToken));
}

const fetchToken = async(bearerToken) => {
  const  [, token] = bearerToken.split(' ');

  return token;
}
