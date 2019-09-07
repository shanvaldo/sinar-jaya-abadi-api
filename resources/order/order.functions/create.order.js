const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = ({ customerId, totalPrice, orderDetails }) => new Promise(async (resolve, reject) => {
  try {
    if (!orderDetails.length) {
      return reject(error.orderDetail.notExists);
    }

    const order = await models.Order.create({
      customerId,
      totalPrice,
    });

    try {
      await Promise.all(orderDetails.map((detail) => models.OrderDetail.create({
        orderId: order.id,
        productId: detail.productId,
        quantity: detail.quantity,
        totalPrice: detail.totalPrice,
        note: detail.note,
      })));
    } catch (error) {
      await Promise([
        models.OrderDetail.destroy({ where: { orderId: order.id } }),
        models.Order.destroy({ where: { id: order.id } }),
      ]);

      return reject(error.message || error);
    }

    return resolve(order);
  } catch (error) {
    return reject(error.message || error);
  }
});