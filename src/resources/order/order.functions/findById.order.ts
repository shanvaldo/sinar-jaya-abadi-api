import models from '../../../models';

export default (ids: Array<string>) => new Promise(async (resolve, reject) => {
  try {
    const order = await models.Order.findAll({
      where: { id: { [models.sequelize.Op.in]: ids } },
    });

    return resolve(order);
  } catch (error) {
    return reject(error);
  }
});
