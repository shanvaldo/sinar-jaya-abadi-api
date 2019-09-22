import { RESPONSE } from '../../../constants';
import models from '../../../models';

interface IInputUpdateCategory {
  label?: string;
  description?: string;
}

export default (id: string, { label, description }: IInputUpdateCategory) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findOne({ where: { id } });

    if (!category) {
      return reject(RESPONSE.error.category.notExists);
    }

    const updatedCategory = await category.update({
      description,
      label,
    }, { returning: true });

    return resolve(updatedCategory);
  } catch (error) {
    return reject(error);
  }
});
