import models from '../../../models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      const info = await models.Info.findOne();

      return resolve(info);
    } catch (error) {
      return reject(error);
    }
  });
};
