import jwt from '../../../utils/jwt';

export default ({ username, refreshToken }) => new Promise(async (resolve, reject) => {
  try {
    const { data: payload } = jwt.verifyRefreshToken(refreshToken);

    if (username !== payload) {
      return reject(new Error('Invalid request'));
    }

    const response = {
      accessToken : jwt.getToken(username),
      refreshToken: jwt.getRefreshToken(username),
      status      : true,
    };

    return resolve(response);
  } catch (error) {
    return reject(error);
  }
});
