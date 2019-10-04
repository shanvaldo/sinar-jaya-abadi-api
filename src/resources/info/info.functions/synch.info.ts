import { IInfoAttributes } from '../../../interfaces/IInfo';
import models from '../../../models';

export default (inputInfo: IInfoAttributes) => {
  return new Promise(async (resolve, reject) => {
    const transaction = await models.sequelize.transaction();

    try {
      await models.Info.destroy({
        transaction,
        where: {},
      });

      await models.Info.create(inputInfo, { transaction });

      await transaction.commit();

      return resolve(true);
    } catch (error) {
      await transaction.rollback();

      return reject(error);
    }
  });
};
