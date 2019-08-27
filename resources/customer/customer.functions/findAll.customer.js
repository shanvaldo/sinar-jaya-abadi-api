const models = require('../../../models');

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const customers = await models.Customer.findAll();

    return resolve(customers);
  } catch (error) {
    return reject(error);
  }
});