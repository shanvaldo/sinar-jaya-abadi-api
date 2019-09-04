const models = require('../../../models');

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const user = await models.User.findOne({ where: { id } });

    return resolve(user);
  } catch (error) {
    return reject(error);
  }
});