const models = require('../../../models');

module.exports = ({ email, phone, address }) => new Promise(async (resolve, reject) => {
  try {
    const customer = await models.Customer.create({
      email,
      phone,
      address,
    });

    return resolve(customer);
  } catch (error) {
    return reject(error.message || error);
  }
});