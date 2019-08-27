const models = require('../../../models');

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const customer = await models.Customer.findOne({ where: { id } });

    return resolve(customer);
  } catch (error) {
    return reject(error);
  }
});