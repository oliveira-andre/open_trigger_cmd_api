export default async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(422).json({ error: 'Token not provided' });
  }

  return next();
}
