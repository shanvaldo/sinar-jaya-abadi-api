const jwt = require('../../../utils/jwt');

module.exports = ({ username, refreshToken }) => new Promise(async (resolve, reject) => {
  try {
    const { data: payload } = jwt.verifyRefreshToken(refreshToken);

    if (username !== payload) {
      return reject(new Error('Invalid request'));
    }

    const response = {
      status: true,
      accessToken: jwt.getToken(username),
      refreshToken: jwt.getRefreshToken(username),
    };

    return resolve(response);
  } catch (error) {
    return reject(error);
  }
});