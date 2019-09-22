import models from '../../../models';

export default () => new Promise(async (resolve, reject) => {
  try {
    const promotions = await models.Promotion.findAll();

    const response = promotions.map(({ product }) => product);

    return resolve(response);
  } catch (error) {
    return reject(error);
  }
});
