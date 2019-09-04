const jwt = require('../../../utils/jwt');

module.exports = (token) => new Promise(async (resolve, reject) => {
  try {
    jwt.verifyToken(token);

    return resolve(true);
  } catch (error) {
    return reject(error);
  }
});