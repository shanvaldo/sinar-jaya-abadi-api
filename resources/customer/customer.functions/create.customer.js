const models = require('../../../models');

module.exports = ({ email, fullName, phone, address }) => new Promise(async (resolve, reject) => {
  try {
    const [customer] = await models.Customer.findOrCreate({
      defaults: {
        email,
        fullName,
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