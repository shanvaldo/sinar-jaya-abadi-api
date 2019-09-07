const models = require('../../../models');

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const orders = await models.Order.findAll({
      include: [
        {
          as      : 'customer',
          model   : models.Customer,
        },
        {
          as      : 'orderDetails',
          model   : models.OrderDetail,
          include : [
            {
              as    : 'product',
              model : models.Product,
            }
          ],
        }
      ],
    });

    return resolve(orders);
  } catch (error) {
    return reject(error);
  }
});