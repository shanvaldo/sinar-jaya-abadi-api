const models = require('../../../models');
const passwordManagement = require('../../../utils/passwordManagement');

module.exports = ({ username, password }) => new Promise(async (resolve, reject) => {
  try {
    const user = await models.User.create({
      username,
      password: passwordManagement.hash(password),
    });

    return resolve(user);
  } catch (error) {
    return reject(error.message || error);
  }
});