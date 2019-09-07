const models = require('../../../models');

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const order = await models.Order.findOne({
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
      where: { id },
    });

    return resolve(order);
  } catch (error) {
    return reject(error);
  }
});