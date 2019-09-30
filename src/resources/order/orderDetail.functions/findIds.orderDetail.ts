import models from '../../../models';

interface IFilterOrderDetail {
  orderId?: string;
}

export default (limit?: number, filterBy?: IFilterOrderDetail): Promise<Array<string>> => new Promise(async (resolve, reject) => {
  try {
    const condition = Object.keys(filterBy).length ? { where: filterBy } : {};

    const orderDetails = await models.OrderDetail.findAll({
      ...condition,
      attributes: ['id', 'createdAt'],
      limit,
      order: [['createdAt', 'DESC']],
    });

    return resolve(orderDetails.map((orderDetail) => orderDetail.id));
  } catch (error) {
    return reject(error);
  }
});
