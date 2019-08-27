const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const customer = await models.Customer.findOne({ where: { id } });

    if (!customer) {
      return reject(error.customer.notExists);
    }

    await customer.destroy();

    return resolve(customer);
  } catch (error) {
    return reject(error);
  }
});