const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
      return reject(error.product.notExists);
    }

    await Promise.all([
      // models.ProductDetail.destroy({ where: { productId: id } }),
      models.Promotion.destroy({ where: { productId: id } }),
    ]);
    await product.destroy();

    return resolve(product);
  } catch (error) {
    return reject(error);
  }
});