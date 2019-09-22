import models from '../../../models';

export default (slug: string) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.findOne({
      where: { slug },
    });

    return resolve(subCategory);
  } catch (error) {
    return reject(error);
  }
});
