import models from '../../../models';
import slugBuilder from '../../../utils/slugBuilder';

interface IInputCreateSubCategory {
  categoryId: string;
  name: string;
  label?: string;
  description?: string;
}

export default ({ categoryId, name, label, description }: IInputCreateSubCategory) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.create({
      categoryId,
      description,
      label,
      name,
      slug: slugBuilder(name),
    });

    return resolve(subCategory);
  } catch (error) {
    return reject(error.message || error);
  }
});
