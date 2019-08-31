const models = require('../../../models');
const passwordManagement = require('../../../utils/passwordManagement');
const jwt = require('../../../utils/jwt');

module.exports = ({ username, password }) => new Promise(async (resolve, reject) => {
  let response = {
    status: false,
    accessToken: null,
    refreshToken: null,
  };

  try {
    const user = await models.User.findOne({ where: {
        username,
        password: passwordManagement.hash(password),
      },
    });

    if (!user) {
      return resolve(response);
    }

    response = {
      status: true,
      accessToken: jwt.getToken(username),
      refreshToken: jwt.getRefreshToken(username),
    };

    return resolve(response);
  } catch (error) {
    return reject(error.message || error);
  }
});