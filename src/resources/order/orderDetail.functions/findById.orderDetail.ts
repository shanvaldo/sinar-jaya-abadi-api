import models from '../../../models';
import { TOrderDetailInstance } from '../../../models/orderDetail';

export default (ids: Array<string>): Promise<Array<TOrderDetailInstance>> => new Promise(async (resolve, reject) => {
  try {
    const orderDetails = await models.OrderDetail.findAll({
      where: { id: { [models.sequelize.Op.in]: ids } },
    });

    return resolve(orderDetails);
  } catch (error) {
    return reject(error);
  }
});
