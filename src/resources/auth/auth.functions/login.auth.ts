import models from '../../../models';
import jwt from '../../../utils/jwt';
import passwordManagement from '../../../utils/passwordManagement';

export default ({ username, password }) => new Promise(async (resolve, reject) => {
  let response = {
    accessToken : null,
    refreshToken: null,
    status      : false,
  };

  try {
    const user = await models.User.findOne({ where: {
        password: passwordManagement.hash(password),
        username,
      },
    });

    if (!user) {
      return resolve(response);
    }

    response = {
      accessToken : jwt.getToken(username),
      refreshToken: jwt.getRefreshToken(username),
      status      : true,
    };

    return resolve(response);
  } catch (error) {
    return reject(error.message || error);
  }
});
