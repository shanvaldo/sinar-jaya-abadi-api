const models = require('../../../models');

module.exports = ({ email, phone, address }) => new Promise(async (resolve, reject) => {
  try {
    const [customer] = await models.Customer.findOrCreate({
      defaults: {
        email,
        phone,
        address,
      },
      where: { email },
    });

    return resolve(customer);
  } catch (error) {
    return reject(error.message || error);
  }
});