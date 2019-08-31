const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const user = await models.User.findOne({ where: { id } });

    if (!user) {
      return reject(error.user.notExists);
    }

    await user.destroy();

    return resolve(user);
  } catch (error) {
    return reject(error);
  }
});