import models from '../../../models';

export default () => new Promise(async (resolve, reject) => {
  try {
    const subCategories = await models.SubCategory.findAll();

    return resolve(subCategories);
  } catch (error) {
    return reject(error);
  }
});
