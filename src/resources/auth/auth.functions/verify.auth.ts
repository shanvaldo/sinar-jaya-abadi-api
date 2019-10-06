import jwt from '../../../utils/jwt';

export default (token: string) => new Promise(async (resolve, reject) => {
  try {
    jwt.verifyToken(token);

    return resolve(true);
  } catch (error) {
    return reject(error);
  }
});
