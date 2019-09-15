const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = ({ customerId, totalPrice, orderDetails }) => new Promise(async (resolve, reject) => {
  const transaction = await models.sequelize.transaction().catch((error) => reject(error));

  try {
    if (!orderDetails.length) {
      return reject(error.orderDetail.notExists);
    }

    const order = await models.Order.create({
      customerId,
      totalPrice,
    });

    await Promise.all(orderDetails.map((detail) => models.OrderDetail.create({
      orderId: order.id,
      productId: detail.productId,
      quantity: detail.quantity,
      totalPrice: detail.totalPrice,
      note: detail.note,
    }, { transaction })));

    await Promise.all(orderDetails.map((detail) => models.Product.update({
      sold: models.Sequelize.literal(`sold + ${detail.quantity}`)
    }, {
      where: { id: detail.productId },
    })));

    await transaction.commit();

    return resolve(order);
  } catch (error) {
    return reject(error.message || error);
  }
});