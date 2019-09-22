import { RESPONSE } from '../../../constants';
import models from '../../../models';

interface IInputUpdateSubCategory {
  label?: string;
  description?: string;
}

export default (id: string, { label, description }: IInputUpdateSubCategory) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.findOne({ where: { id } });

    if (!subCategory) {
      return reject(RESPONSE.error.subCategory.notExists);
    }

    const updatedSubCategory = await subCategory.update({
      description,
      label,
    }, { returning: true });

    return resolve(updatedSubCategory);
  } catch (error) {
    return reject(error);
  }
});
