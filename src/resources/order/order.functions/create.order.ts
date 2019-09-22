import { RESPONSE } from '../../../constants';
import { IOrderDetailAttributes } from '../../../interfaces/IOrderDetail';
import models from '../../../models';

interface IInputCreateOrder {
  customerId: string;
  totalPrice: number;
  orderDetails: Array<IOrderDetailAttributes>;
}

export default ({ customerId, totalPrice, orderDetails }: IInputCreateOrder) => new Promise(async (resolve, reject) => {
  const transaction = await models.sequelize.transaction();

  try {
    if (!orderDetails.length) {
      return reject(RESPONSE.error.orderDetail.notExists);
    }

    const order = await models.Order.create({
      customerId,
      totalPrice,
    }, { transaction });

    await Promise.all(orderDetails.map((detail) => models.OrderDetail.create({
      note      : detail.note,
      orderId   : order.id,
      productId : detail.productId,
      quantity  : detail.quantity,
      totalPrice: detail.totalPrice,
    }, { transaction })));

    // await Promise.all(orderDetails.map((detail) => models.Product.update({
    //   sold: models.Sequelize.literal(`sold + ${detail.quantity}`),
    // }, {
    //   where: { id: detail.productId },
    // })));

    await transaction.commit();

    return resolve(order);
  } catch (error) {
    return reject(error.message || error);
  }
});
