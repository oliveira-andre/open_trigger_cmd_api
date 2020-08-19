export default async (req, res) => {
  const bearerToken = req.headers.authorization;
  console.log(bearerToken);
}
