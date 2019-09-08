const models = require('../../../models');

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const promotions = await models.Promotion.findAll({
      include: [
        {
          as    : 'product',
          model : models.Product,
        },
      ],
      order: ['order'],
    });

    const response = promotions.map(({ product }) => product);

    return resolve(response);
  } catch (error) {
    return reject(error);
  }
});